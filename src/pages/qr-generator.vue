<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.qr_qenerator") }}</h3>
          <p class="text-subtitle text-muted">Qr Code</p>
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
                  <div class="col-sm row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">Size</label>
                    <div class="col-sm-8">
                      <input type="number" id="size" class="form-control" value="0" step="128" max="1024" />
                    </div>
                  </div>
                </div>
                <textarea @input="textSize($event)" class="form-control" rows="9" id="qrText"></textarea>
                <div class="mb-3 col-sm-12">
                  <div class="float-end">
                    <div class="mb-1">Char length : {{ qrTextSize }}</div>

                    <button @click="convert()" type="button" class="btn btn-light-secondary float-end">Convert</button>
                  </div>
                </div>
              </div>

              <div class="col-sm">
                <div class="mb-3" style="padding: 15px; width: 100%; min-height: 203px; overflow: auto; border: 1px solid #dddddd">
                  <canvas id="qrImageViewer"></canvas>
                </div>
                <div class="float-end">
                  <button @click="qrImgDownload()" type="button" class="btn btn btn-primary">download</button>
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
import { loadScript } from "@/utils/utils";

export default {
  created() {},
  data() {
    return {
      qrTextSize: 0,
      scriptLoaded: false,
    };
  },
  methods: {
    textSize(event) {
      this.qrTextSize = event.target.value.length;
    },
    convert() {
      if (!this.scriptLoaded) {
        loadScript("/assets/static/js/plugins/qrcode.min.js")
          .then(() => {
            this.scriptLoaded = true;
            this.createQRCode(); // 스크립트가 로드된 후 QR 코드 생성
          })
          .catch((error) => {
            console.error("스크립트 로드 실패:", error);
          });
      } else {
        // 이미 스크립트가 로드된 경우 바로 QR 코드 생성
        this.createQRCode();
      }
    },
    createQRCode() {
      let qrText = document.getElementById("qrText").value;

      let qrOptions = { errorCorrectionLevel: "M" };

      let size = document.getElementById("size").value;

      if (size > 0) {
        qrOptions.width = document.getElementById("size").value;
      }

      QRCode.toCanvas(document.getElementById("qrImageViewer"), qrText, qrOptions, function (error) {
        if (error) {
          console.error(error);
        } else {
          console.log("QR code generated!");
        }
      });
    },
    qrImgDownload() {
      const canvas = document.getElementById("qrImageViewer");
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // PNG 형식으로 데이터 URL 생성
      link.download = "canvas-image.png"; // 다운로드할 파일 이름
      link.click(); // 링크 클릭하여 다운로드
    },
  },
};
</script>
