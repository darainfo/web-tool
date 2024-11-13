<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.image_base64") }}</h3>
          <p class="text-subtitle text-muted">Image Base64 converter</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <form id="mainForm">
            <h2>gif, jpg, jpeg, png, bmp, webp, svg</h2>

            <div class="mb-1">
              <label for="formFile" class="form-label">Image select</label>
              <input class="form-control" type="file" id="formFile" @change="selectImage()" accept=".gif,.jpg,.jpeg,.png,.bmp,.webp,.svg" />
            </div>

            <div class="col-sm-12 d-flex justify-content-end">
              <button type="button" class="btn btn-light-secondary" @click="formReset()">Reset</button>
            </div>

            <div class="mb-1">
              Data URI -- data:content/type;base64
              <input id="imageBase64" class="form-control" readonly />
            </div>

            <div class="col-sm-12 d-flex justify-content-end">
              <TextCopyButton copyField="#imageBase64" />
            </div>

            <div style="width: 100%; height: 500px; overflow: auto">
              <img id="dataUriImageView" src="" />
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TextCopyButton from "@/components/button/TextCopyButton.vue";
import { isImageFile, isFileSizeValid } from "@/utils/common";

export default {
  name: "ImageBase64",
  components: {
    TextCopyButton,
  },
  data() {
    return {};
  },
  methods: {
    formReset() {
      document.getElementById("mainForm").reset();
      document.getElementById("dataUriImageView").src = "";
    },
    selectImage() {
      let file = document.querySelector("input[type=file]")["files"][0];

      if (file) {
        const isImage = isImageFile(file.name);
        const isValidSize = isFileSizeValid(file, 5); // 5MB 체크

        if (isImage && isValidSize) {
          this.convertBase64(file);
        } else {
          if (!isImage) {
            console.log("File is not Image");
          }
          if (!isValidSize) {
            if (confirm("The file size exceeds 5MB. Do you want to convert it?")) {
              this.convertBase64(file);
            }
          }
        }
      }
    },
    convertBase64(file) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let base64String;
        let dataUriValue;
        if (file && file.type === "image/svg+xml") {
          const svgContent = e.target.result;
          if (svgContent.startsWith("data:image/")) {
            dataUriValue = svgContent;
          } else {
            base64String = btoa(svgContent);
            dataUriValue = "data:image/svg+xml;base64," + base64String;
          }
        } else {
          let imgContent = reader.result;
          if (imgContent.startsWith("data:image/")) {
            dataUriValue = imgContent;
          } else {
            base64String = imgContent.replace("data:", "").replace(/^.+,/, "");
            dataUriValue = "data:" + file.type + ";base64," + base64String;
          }
        }
        document.getElementById("imageBase64").value = dataUriValue;
        document.getElementById("dataUriImageView").src = dataUriValue;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
