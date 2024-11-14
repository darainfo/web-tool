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
      let copyString = this.copyField;
      try {
        let copyFieldElement = document.querySelector(this.copyField);
        copyString = copyFieldElement.value;
      } catch (e) {
        //ignore
      }

      copyText(copyString);
    },
  },
};
</script>
