<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.case_change") }}</h3>
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
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('lower')">lower case</button>
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('upper')">UPPER CASE</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('camel')">camelCase</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('pascal')">PascalCase</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('screaming_snake')">SCREAMING_SNAKE_CASE</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('snack')">snack_case</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('kebab')">kebab-case</button>

                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('capitalize')">Capitalize Case</button>
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('sentence')">Sentence case</button>
                    <button type="button" class="btn btn-light-secondary btn-sm" @click="caseChange('title')">Title Case</button>
                  </div>
                </div>
                <textarea class="form-control" rows="9" v-model="orginText" ref="orginText" placeholder="Text Case Convert"></textarea>
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
import { toCamelCase, toCapitalizedCase, toSentenceCase, toTitleCaseWithPunctuation, toSnackCase, toPascalCase } from "@/utils/common";

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
    caseChange(type) {
      let orginText = this.orginText;

      if (orginText == "") {
        orginText = this.$refs.orginText.placeholder;
      }

      let result = "";
      if (type == "lower") {
        result = orginText.toLowerCase();
      } else if (type == "upper") {
        result = orginText.toUpperCase();
      } else if (type == "camel") {
        result = toCamelCase(orginText);
      } else if (type == "capitalize") {
        result = toCapitalizedCase(orginText);
      } else if (type == "sentence") {
        result = toSentenceCase(orginText);
      } else if (type == "title") {
        result = toTitleCaseWithPunctuation(orginText);
      } else if (type == "snack") {
        result = toSnackCase(orginText);
      } else if (type == "pascal") {
        result = toPascalCase(orginText);
      } else if (type == "screaming_snake") {
        result = toSnackCase(orginText).toUpperCase();
      } else if (type == "kebab") {
        result = toSnackCase(orginText).replaceAll(/_/g, "-");
      }

      this.resultText = result;
    },
  },
};
</script>
