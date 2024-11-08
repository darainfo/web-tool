<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Text Size</h3>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <div class="row">
              <div class="col-sm mb-3">
                <textarea class="form-control" rows="19" v-model="orginText" @input="sizeCheck()" placeholder="Enter the characters to check size"></textarea>

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

export default {
  data() {
    return {
      orginText: "",
      resultText: "",
    };
  },
  mounted() {
    this.sizeCheck();
  },
  methods: {
    sizeCheck() {
      const orginText = this.orginText || "";

      const size = getStringSize(orginText);

      this.resultText = `Char length : ${size.length}, byte : ${size.byte}`;
    },
  },
};
</script>
