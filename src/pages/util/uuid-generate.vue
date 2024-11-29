<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.uuid_generate") }}</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <div class="row">
              <div class="col-12">
                <select v-model="uuidType" class="form-control mb-3">
                  <option v-for="(item, key) in allUuidItems" :value="item.type" :key="key">{{ item.name }}</option>
                </select>

                <template v-if="uuidType == 'v5'">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" style="width: 142px">Namespace(UUID)</span>
                    </div>
                    <input type="text" class="form-control" v-model="namespace" placeholder="Namespace" />
                  </div>

                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" style="width: 142px">Change value</span>
                    </div>
                    <input type="text" class="form-control" v-model="changeStr" placeholder="Namespace" />
                  </div>
                </template>
                <template v-else>
                  <input class="form-control mb-3" min="1" v-model="count" type="number" />
                </template>

                <div class="col-12 float-end mb-3" style="text-align: center">
                  <button type="button" class="btn btn-light-secondary btn-sm" @click="uuidGen()">Generate</button>
                </div>

                <div class="mb-3">
                  <textarea class="form-control" rows="9" v-model="resultText"></textarea>
                </div>
                <div class="float-end">
                  <TextCopyButton :copyField="resultText" />
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

import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, v6 as uuidv6, v7 as uuidv7 } from "uuid";

const allUuidItems = [
  { type: "v1", fn: uuidv1, name: "Timestamp" },
  //{ type: "v3", fn: uuidv3, name: "MD5" },
  { type: "v4", fn: uuidv4, name: "Random" },
  { type: "v5", fn: uuidv5, name: "SHA-1" },
  { type: "v6", fn: uuidv6, name: "Timestamp, reordered" },
  { type: "v7", fn: uuidv7, name: "Unix Epoch time-based" },
];

export default {
  components: {
    TextCopyButton,
  },
  data() {
    return {
      uuidType: "v4",
      count: 1,
      resultText: "",
      namespace: uuidv5.DNS,
      changeStr: "",
      allUuidItems,
    };
  },

  methods: {
    uuidGen() {
      const uuidType = this.uuidType;
      const count = uuidType == "v5" ? 1 : this.count;

      const item = allUuidItems.find((item) => item.type === uuidType);

      const result = [];

      try {
        for (let i = 0; i < count; i++) {
          if (uuidType == "v5") {
            result.push(uuidv5(this.changeStr, this.namespace));
          } else {
            result.push(item.fn());
          }
        }
      } catch (e) {
        result.push(e.message);
      }

      this.resultText = result.join("\n");
    },
  },
};
</script>
