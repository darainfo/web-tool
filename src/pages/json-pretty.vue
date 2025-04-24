<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.json_pretty") }}</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <div class="row">
              <div class="col-sm mb-3">
                <div class="mb-3">
                  <div class="col-12 mb-2" style="border-radius: 3px; padding: 5px 0px">
                    <div>
                      <div class="btn-example float-end">
                        <button type="button" class="btn btn-light-secondary btn-sm" @click="view(true)" style="margin-right: 15px">Tree</button>
                        <button type="button" class="btn btn-light-primary btn-sm" @click="view(false)">Pretty</button>
                      </div>
                    </div>
                  </div>
                </div>
                <textarea class="form-control" rows="19" v-model="jsonText" ref="jsonText" placeholder="Json Text"></textarea>
              </div>

              <div class="col-sm">
                <div style="padding: 15px; border: 1px solid #dddddd">
                  <template v-if="isTreeViewer">
                    <div id="treeViewer"></div>
                  </template>
                  <template v-else>
                    <div class="mb-2">
                      <textarea class="form-control" rows="18" id="resultText" v-model="resultText" readonly></textarea>
                    </div>
                    <div style="height: 30px">
                      <div class="float-end">
                        <TextCopyButton :copyField="resultText" />
                      </div>
                    </div>
                  </template>
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
import { loadAssets } from "@/utils/utils";
import TextCopyButton from "@/components/button/TextCopyButton.vue";

export default {
  components: {
    TextCopyButton,
  },
  data() {
    return {
      jsonText: "",
      resultText: "",
      scriptLoaded: false,
      isTreeViewer: false,
    };
  },
  methods: {
    view(flag) {
      this.isTreeViewer = flag;

      if (this.jsonText == "") {
        return;
      }

      if (!this.scriptLoaded) {
        this.scriptLoaded = true;
        loadAssets({ js: ["/assets/static/js/plugins/json-viewer@3.js", "/assets/static/js/plugins/json5.min.js"] })
          .then(() => {
            this.jsonPretty(flag);
          })
          .catch((error) => {
            console.error("스크립트 로드 실패:", error);
          });
      } else {
        this.jsonPretty(flag);
      }
    },
    jsonPretty(flag) {
      this.isTreeViewer = flag;
      const jsonObj = JSON5.parse(this.jsonText);

      if (flag) {
        this.$nextTick(() => {
          new JsonViewer({
            value: jsonObj,
          }).render("#treeViewer");
        });
      } else {
        this.resultText = JSON.stringify(jsonObj, null, 2);
      }
    },
  },
};
</script>
