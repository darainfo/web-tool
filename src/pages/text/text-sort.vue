<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.text_sort") }}</h3>
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
                        <input class="form-check-input" type="radio" @click="ascDescSort()" v-model="delimiter" value="newline" id="delimiter1" />
                        <label class="form-check-label ckk-near" for="delimiter1">New line</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" @click="ascDescSort()" v-model="delimiter" value="space" id="delimiter2" />
                        <label class="form-check-label ckk-near" for="delimiter2">Space</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" @click="ascDescSort()" v-model="delimiter" value="comma" id="delimiter3" />
                        <label class="form-check-label ckk-near" for="delimiter3">Comma</label>
                      </div>
                    </template>
                  </div>

                  <div class="col-12 mb-2">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" @click="ascDescSort($event)" v-model="asdDesc" value="asc" id="inlineRadio1" />
                      <label class="form-check-label ckk-near" for="inlineRadio1">Asc</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" @click="ascDescSort($event)" v-model="asdDesc" value="desc" id="inlineRadio2" />
                      <label class="form-check-label ckk-near" for="inlineRadio2">Desc</label>
                    </div>
                  </div>

                  <div class="col-12 mb-2">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" @click="textSort('vertical')" v-model="directionType" value="vertical" id="direction1" />
                      <label class="form-check-label ckk-near" for="direction1">Vertical</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" @click="textSort('horizontal')" v-model="directionType" value="horizontal" id="direction2" />
                      <label class="form-check-label ckk-near" for="direction2">Horizontal</label>
                    </div>
                  </div>
                </div>
                <textarea class="form-control" rows="19" v-model="orginText" ref="orginText" placeholder="Text sort"></textarea>
              </div>

              <div class="col-sm">
                <div class="mb-3" style="padding: 15px; border: 1px solid #dddddd">
                  <div>{{ directionType }} {{ asdDesc }}</div>
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
      asdDesc: "asc",
      directionType: "vertical",
      directFlag: false,
      delimiter: "newline",
      directDelimiter: "",
    };
  },
  methods: {
    ascDescSort(event) {
      if (event) {
        this.asdDesc = event.target.value;
      }

      this.textSort(this.directionType);
    },
    textSort(type) {
      let orginText = this.orginText;
      const ascOrDesc = this.asdDesc;
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

      console.log(this.directFlag, this.directDelimiter, orginText, ascOrDesc, sortDelimiter);

      let result = "";
      if (type == "horizontal") {
        result = this.sortHorizontal(orginText, ascOrDesc, sortDelimiter);
      } else if (type == "vertical") {
        result = this.sortVertical(orginText, ascOrDesc, sortDelimiter);
      }

      this.resultText = result;
    },
    sortHorizontal(str, ascOrDesc, sortDelimiter) {
      const descFlag = ascOrDesc == "desc";
      return str
        .split(sortDelimiter.regexp)
        .map((line) => {
          // 내림차순 정렬일 경우 배열을 반전
          return line
            .split(" ")
            .map((word) => {
              const wordSort = word.split("").sort((a, b) => a.localeCompare(b));

              return descFlag ? wordSort.reverse().join("") : wordSort.join("");
            })
            .join(" ");
        })
        .join(sortDelimiter.char);
    },
    sortVertical(str, ascOrDesc, sortDelimiter) {
      const items = str
        .trim()
        .split(sortDelimiter.regexp)
        .map((item) => item.trim());
      // 정렬
      items.sort((a, b) => a.localeCompare(b));

      // 내림차순 처리
      if (ascOrDesc == "desc") {
        items.reverse();
      }

      return items.join(sortDelimiter.char);
    },
  },
};
</script>
