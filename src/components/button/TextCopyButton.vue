<template>
  <button type="button" @click="copyBtn()" class="btn btn-primary">Copy</button>
</template>
<script>
import { copyText } from "@/utils/common";

export default {
  props: {
    copyField: {
      type: String,
      required: true,
    },
  },

  methods: {
    copyBtn() {
      let copyString = "";
      let copyFieldElement = document.querySelector(this.copyField);
      if (copyFieldElement) {
        copyString = copyFieldElement.value;
      } else {
        copyString = this.copyField;
      }

      copyText(copyString);
    },
  },
};
</script>
