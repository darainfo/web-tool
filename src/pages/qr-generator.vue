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
                  <div class="col-sm row mb-1">
                    <label class="col-sm-4 col-form-label">Qr Char Size</label>
                    <div class="col-sm-8">
                      <input type="number" v-model="qrMaxSize" class="form-control" step="100" max="2300" />
                    </div>
                  </div>
                  <div class="col-sm row">
                    <label class="col-sm-4 col-form-label">Qr Img Size</label>
                    <div class="col-sm-8">
                      <select v-model="qrImgSize" class="form-control">
                        <option v-for="qrImgSizeItem in qrImgSizeItems" :value="qrImgSizeItem">{{ qrImgSizeItem }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <textarea @input="textSize($event)" class="form-control" rows="9" id="qrText"></textarea>
                <div class="mb-3 col-sm-12 clearfix">
                  <div class="float-end">
                    <div class="mb-1">Char length : {{ qrTextSize }}</div>

                    <button @click="convert()" type="button" class="btn btn-light-secondary float-end">Convert</button>
                    <div v-if="errorMessage != ''" style="clear: both; color: #ff0707; font-weight: bold">Error : {{ errorMessage }}</div>
                  </div>
                </div>
              </div>

              <div class="col-sm">
                <nav aria-label="Page navigation" v-if="imgIdx > 1">
                  <div style="text-align: center">
                    <a href="javascript:;" @click="viewPage('p')">&lt; Prev</a>
                    <a href="javascript:;" @click="viewPage('n')" style="margin-left: 10px">Next &gt;</a>
                  </div>

                  <ul class="pagination justify-content-center" style="margin-top: 10px">
                    <li class="page-item">
                      <a class="page-link" @click="viewImg(1)">1</a>
                    </li>
                    <li v-for="n in pagingNums" class="page-item" :class="currentImgIdx == n ? 'active' : ''">
                      <a class="page-link" href="javascript:;" @click="viewImg(n)">{{ n }}</a>
                    </li>

                    <li class="page-item">
                      <a class="page-link" @click="viewImg(imgIdx)">{{ imgIdx }}</a>
                    </li>
                  </ul>
                </nav>

                <div class="mb-3" style="padding: 15px; width: 100%; min-height: 203px; overflow: auto; border: 1px solid #dddddd">
                  <canvas id="qrImageViewer"></canvas>
                </div>

                <div class="float-end">
                  <button @click="qrImgDownload()" type="button" class="btn btn btn-primary">download</button>
                </div>
                <div>View Qr Text</div>
                <textarea class="form-control" rows="9" v-model="viewQrContent"></textarea>
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

function isNumeric(val) {
  return /^-?\d+$/.test(val);
}

export default {
  mounted() {
    let vtoolQrText = localStorage.getItem("vtoolQrText");

    if (vtoolQrText) {
      document.getElementById("qrText").value = vtoolQrText;
    }
  },
  data() {
    return {
      qrTextSize: 0,
      scriptLoaded: false,
      errorMessage: "",
      currentImgIdx: 0,
      imgIdx: 0,
      qrMaxSize: 2000,
      pagingQrTextMap: {},
      pagingNums: [],
      viewQrContent: "",
      qrImgSize: 512,
      qrImgSizeItems: [128, 256, 512],
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

      const MAX_CHAR_SIZE = this.qrMaxSize;

      localStorage.setItem("vtoolQrText", qrText);

      let reqText = "";
      let imgIdx = 0;
      let beforeChar = "";
      let currChar = "";
      let charCnt = 0;

      let pagingQrTextMap = {};
      for (let i = 0; i < qrText.length; i++) {
        currChar = qrText.charAt(i);

        if (beforeChar == "\n" && currChar == "\n") {
          continue;
        }

        if (isNumeric(currChar)) {
          charCnt++;
        } else if (escape(currChar).length > 4) {
          charCnt += 4;
        } else {
          charCnt += 2;
        }

        reqText += currChar;

        if (charCnt > MAX_CHAR_SIZE) {
          ++imgIdx;
          pagingQrTextMap[imgIdx] = reqText;

          charCnt = 0;
          reqText = "";
        }

        beforeChar = currChar;
      }

      if (reqText.length > 0) {
        ++imgIdx;
        pagingQrTextMap[imgIdx] = reqText;
      }

      this.pagingQrTextMap = pagingQrTextMap;

      this.imgIdx = imgIdx;

      this.viewImg(1);
    },
    qrImgDownload() {
      const canvas = document.getElementById("qrImageViewer");
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // PNG 형식으로 데이터 URL 생성
      link.download = "canvas-image.png"; // 다운로드할 파일 이름
      link.click(); // 링크 클릭하여 다운로드
    },

    viewPage(mode) {
      let viewImgIdx = 0;
      if (mode == "n") {
        viewImgIdx = this.currentImgIdx + 1;
      } else {
        viewImgIdx = this.currentImgIdx - 1;
      }

      viewImgIdx = viewImgIdx < 1 ? 1 : this.imgIdx <= viewImgIdx ? this.imgIdx : viewImgIdx;

      this.viewImg(viewImgIdx);
    },
    // view image
    viewImg(n) {
      this.currentImgIdx = n;

      let startImgIdx = 0,
        endImgIdx = 0;

      if (n < 5) {
        startImgIdx = 1;
      } else {
        startImgIdx = n - 4;
      }

      if (startImgIdx + 9 >= this.imgIdx) {
        endImgIdx = this.imgIdx;
      } else {
        endImgIdx = startImgIdx + 9;
      }

      startImgIdx = endImgIdx - startImgIdx == 9 ? startImgIdx : endImgIdx - 9;
      startImgIdx = startImgIdx < 0 ? 1 : startImgIdx;

      let pagingNums = [];
      for (let i = startImgIdx; i <= endImgIdx; i++) {
        pagingNums.push(i);
      }
      this.pagingNums = pagingNums;

      let qrText = this.pagingQrTextMap[n];

      this.viewQrContent = qrText;

      QRCode.toCanvas(document.getElementById("qrImageViewer"), qrText, { errorCorrectionLevel: "M", width: this.qrImgSize }, (error) => {
        //alert(error);
        if (error) {
          this.errorMessage = error.message;
          console.error(error);
        } else {
          console.log("QR code generated!");
        }
      });
    },
  },
};
</script>
