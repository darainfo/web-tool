<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.text_size") }}</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <div class="row">
              <div class="col-sm mb-3">
                <textarea class="form-control" rows="10" v-model="orginText" placeholder="Enter the characters to check size"></textarea>

                <div class="mb-3 col-sm-12">
                  <div class="text-center">
                    <div class="mb-1 mt-2">
                      <span id="textSize" class="h5">{{ resultText }}</span>
                    </div>
                  </div>
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
import { ref, watch } from "vue";

export default {
  setup() {
    const orginText = ref("");
    const resultText = ref("");

    watch(
      orginText,
      (newValue, oldValue) => {
        const size = getStringSize(newValue);

        resultText.value = `Char length : ${size.length}, byte : ${size.byte}`;
      },
      { immediate: true },
    );

    return {
      orginText,
      resultText,
    };
  },
};
</script>
