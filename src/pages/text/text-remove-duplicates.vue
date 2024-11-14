<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.remove_duplicates") }}</h3>
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
                  <div class="col-12 mb-2" style="border: 1px solid #e2e2e2; border-radius: 3px; padding: 5px 0px">
                    <div>
                      Delimiter
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="directFlag" />
                        <label class="form-check-label ckk-near" for="delimiter4">Direct</label>
                      </div>
                    </div>
                    <template v-if="directFlag">
                      <input class="form-control" type="text" v-model="directDelimiter" />
                    </template>
                    <template v-else>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" @click="ascDescSort()" v-model="delimiter" value="comma" id="delimiter3" />
                        <label class="form-check-label ckk-near" for="delimiter3">Comma</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" @click="ascDescSort()" v-model="delimiter" value="newline" id="delimiter1" />
                        <label class="form-check-label ckk-near" for="delimiter1">New line</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" @click="ascDescSort()" v-model="delimiter" value="space" id="delimiter2" />
                        <label class="form-check-label ckk-near" for="delimiter2">Space</label>
                      </div>
                    </template>
                  </div>

                  <div class="btn-example">
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="actionRun('reset')">Reset</button>
                    <button type="button" class="btn btn-primary btn-sm" @click="actionRun('check')">Check</button>
                  </div>
                </div>
                <textarea class="form-control" rows="10" v-model="orginText" ref="orginText" placeholder="Text sort"></textarea>
              </div>

              <div class="col-sm">
                <div class="mb-3" style="padding: 15px; border: 1px solid #dddddd">
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

const ALL_SORT_DELIMITER = {
  space: { regexp: /\s/, char: " " },
  newline: { regexp: /\n/, char: "\n" },
  comma: { regexp: /,/, char: "," },
};

export default {
  components: {
    TextCopyButton,
  },
  data() {
    return {
      orginText: "",
      resultText: "",
      directFlag: false,
      delimiter: "comma",
      directDelimiter: "",
    };
  },
  methods: {
    actionRun(type) {
      if (type == "reset") {
        this.orginText = "";
        return;
      }
      let orginText = this.orginText;
      this.directionType = type;

      if (orginText == "") {
        orginText = this.$refs.orginText.placeholder;
      }

      let sortDelimiter = "";
      if (this.directFlag) {
        if (this.directDelimiter.length < 1) {
          sortDelimiter = ALL_SORT_DELIMITER["newline"];
        } else {
          sortDelimiter = {
            regexp: new RegExp(this.directDelimiter),
            char: this.directDelimiter,
          };
        }
      } else {
        sortDelimiter = ALL_SORT_DELIMITER[this.delimiter];
      }

      this.resultText = this.duplicatesRemove(orginText, sortDelimiter);
    },
    duplicatesRemove(str, sortDelimiter) {
      const items = str
        .trim()
        .split(sortDelimiter.regexp)
        .map((item) => item.trim());

      const result = [];
      items.forEach(function (item) {
        if (result.indexOf(item) < 0) {
          result.push(item);
        }
      });
      return result.join(sortDelimiter.char);
    },
  },
};
</script>
