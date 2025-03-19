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
                <select v-model="unitType" class="form-control mb-3">
                  <option v-for="(item, key) in unitItems" :value="item.type" :key="key">{{ item.name }}</option>
                </select>

                <input class="form-control mb-3" min="0" v-model="sourceValue" type="number" />
                <div class="col-12">
                  <template v-for="(item, key) in unitItems">
                    <div class="form-check form-check-inline" :key="key" v-if="item.type != unitType">
                      <input class="form-check-input" type="radio" @click="conversion(item)" v-model="conversionType" :value="item.type" name="conversionUnit" :id="'delimiter' + key" />
                      <label class="form-check-label ckk-near" :for="'delimiter' + key">{{ item.name }}</label>
                    </div>
                  </template>
                </div>

                <input class="form-control mb-3" min="0" v-model="conversionValue" type="text" />

                <div class="float-end">
                  <TextCopyButton :copyField="conversionValue" />
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
    type: "px",
    fn: (item) => {
      return "";
    },
    name: "픽셀 [px]",
  },
  {
    type: "in",
    fn: (item) => {
      return "";
    },
    name: "인치 [in]",
  },
  {
    type: "cm",
    fn: (item) => {
      return "";
    },
    name: "센티미터[cm]",
  },
  {
    type: "mm",
    fn: (item) => {
      return "";
    },
    name: "밀리미터 [mm]",
  },
  {
    type: "m",
    fn: (item) => {
      return "";
    },
    name: "미터 [m]",
  },
  {
    type: "ft",
    fn: (item) => {
      return "";
    },
    name: "피트 [ft]",
  },
];

export default {
  components: {
    TextCopyButton,
  },
  data() {
    return {
      unitType: "cm",
      conversionType: "px",
      sourceValue: 1,
      conversionValue: "",
      changeStr: "",
      unitItems,
    };
  },

  methods: {
    conversion() {
      const unitType = this.unitType;

      const item = unitItems.find((item) => item.type === unitType);

      try {
        this.conversionValue = item.fn(this.sourceValue);
      } catch (e) {
        this.conversionValue = e.message;
      }
    },
  },
};
</script>
