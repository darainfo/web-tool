<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Text Sort</h3>
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
                  <div class="btn-example">
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="textSort('vertical', 'asc')">Vertical asc</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="textSort('vertical', 'desc')">Vertical desc</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="textSort('horizontal', 'asc')">Horizontal asc</button>
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="textSort('horizontal', 'desc')">Horizontal desc</button>
                  </div>
                </div>
                <textarea class="form-control" rows="19" v-model="orginText" ref="orginText" placeholder="Text sort"></textarea>
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
import { getStringSize } from "@/utils/common";

import TextCopyButton from "@/components/button/TextCopyButton.vue";

export default {
  components: {
    TextCopyButton,
  },
  data() {
    return {
      orginText: "",
      resultText: "",
    };
  },
  methods: {
    textSort(type, ascOrDesc) {
      let orginText = this.orginText;

      if (orginText == "") {
        orginText = this.$refs.orginText.placeholder;
      }

      let result = "";
      if (type == "horizontal") {
        result = this.sortHorizontal(orginText.toLowerCase(), ascOrDesc);
      } else if (type == "vertical") {
        result = this.sortVertical(orginText.toLowerCase(), ascOrDesc);
      }

      this.resultText = result;
    },
    sortHorizontal(str, ascOrDesc) {
      const descFlag = ascOrDesc == "desc";
      return str
        .split("\n")
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
        .join("\n");
    },
    sortVertical(str, ascOrDesc) {
      const items = str
        .trim()
        .split("\n")
        .map((item) => item.trim());
      // 정렬
      items.sort((a, b) => a.localeCompare(b));

      // 내림차순 처리
      if (ascOrDesc == "desc") {
        items.reverse();
      }

      return items.join("\n");
    },
  },
};
</script>
