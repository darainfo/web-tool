<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.unit_conversion") }}</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <div class="row">
              <div class="col-12">
                <input class="form-control mb-3" min="0" v-model="sourceValue" @change="conversion" type="number" />

                <div class="col-12">
                  <template v-for="(item, key) in unitItems">
                    <div class="form-check form-check-inline" :key="key" v-if="true">
                      <label class="form-check-label" @change="conversion">
                        <input class="form-check-input" type="radio" v-model="sourceType" :value="item.type" name="sourceType" />
                        {{ item.name }}
                      </label>
                    </div>
                  </template>
                </div>

                <h5 class="col-12" style="margin-top: 20px">
                  Conversion <span style="font-weight: bold; color: red">{{ errorMessage }}</span>
                </h5>

                <div class="col-12">
                  <table>
                    <colgroup>
                      <col style="width: 130px" />
                      <col style="width: *" />
                    </colgroup>
                    <template v-for="(item, key) in unitItems">
                      <tr :key="key" v-if="item.type != sourceType">
                        <td>
                          {{ item.name }}
                        </td>
                        <td>
                          <span class="input-group mb-3">
                            <input class="form-control" :value="item.value" readonly />
                            <span class="input-group-text" style="width: 50px">{{ item.type }}</span>
                          </span>
                        </td>
                      </tr>
                    </template>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TextCopyButton from "@/components/button/TextCopyButton.vue";

const unitItems = [
  {
    type: "in",
    name: "인치 [in]",
    value: "0",
  },
  {
    type: "px",
    name: "픽셀 [px]",
    value: "0",
  },
  {
    type: "mm",
    name: "밀리미터 [mm]",
    value: "0",
  },
  {
    type: "cm",
    name: "센티미터[cm]",
    value: "0",
  },
  {
    type: "m",
    name: "미터 [m]",
    value: "0",
  },
  {
    type: "km",
    name: "킬로미터 [km]",
    value: "0",
  },
  {
    type: "ft",
    name: "피트 [ft]",
    value: "0",
  },
  {
    type: "yd",
    name: "야드 [yd]",
    value: "0",
  },
  {
    type: "mi",
    name: "마일 [mi]",
    value: "0",
  },
];

export default {
  data() {
    return {
      sourceType: "cm",
      targetType: "px",
      sourceValue: 1,
      errorMessage: "",
      changeStr: "",
      unitItems,
    };
  },

  methods: {
    conversion() {
      try {
        const unitItems = this.unitItems;

        const sourceValue = this.sourceValue;
        const sourceType = this.sourceType;

        for (let unitItem of unitItems) {
          unitItem.value = this.convertUnit(sourceValue, sourceType, unitItem.type);
        }
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
    convertUnit(value, fromUnit, toUnit, precision = 6) {
      const inchConversions = {
        in: 1,
        cm: 2.54,
        mm: 25.4,
        m: 0.0254,
        km: 0.0000254,
        ft: 1 / 12,
        yd: 1 / 36,
        mi: 1 / 63360,
        px: 96, // 웹 기준 DPI
      };

      fromUnit = fromUnit.toLowerCase();
      toUnit = toUnit.toLowerCase();

      if (!(fromUnit in inchConversions)) {
        throw new Error(`Unsupported 'from' unit: ${fromUnit}`);
      }
      if (!(toUnit in inchConversions)) {
        throw new Error(`Unsupported 'to' unit: ${toUnit}`);
      }

      // Step 1: Convert from source unit to inches
      const valueInInches = value / inchConversions[fromUnit];

      // Step 2: Convert from inches to target unit
      const result = valueInInches * inchConversions[toUnit];

      // Step 3: Round result to desired precision
      return Number(result.toFixed(precision));
    },
  },
};
</script>
