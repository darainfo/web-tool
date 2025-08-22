<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ $t("menu.text_compression") }}</h3>
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
                  <div class="col-12 mb-2" style="border-radius: 3px; padding: 5px 0px">
                    <div>
                      <div class="btn-example float-end">
                        <button type="button" class="btn btn-light-secondary btn-sm" @click="compress(true)">압축</button>
                      </div>
                    </div>
                  </div>
                </div>
                <textarea class="form-control" rows="10" v-model="compressText" ref="compressText" placeholder="Text" @input="textInput()"></textarea>
                <div>{{ compressTextInfo }}</div>
                <div style="margin-top: 10px">{{ compressStatus }}</div>
              </div>
              <div class="col-sm">
                <div style="padding: 15px; border: 1px solid #dddddd">
                  <textarea class="form-control" rows="10" id="resultText" v-model="resultText"></textarea>
                </div>
                <div style="height: 30px; padding-top: 10px">
                  <div class="float-end">
                    <button type="button" class="btn btn-light-primary btn-sm" @click="compress(false)">해제</button>
                  </div>
                </div>
                <div style="padding-top: 15px">
                  <div>{{ decompressStatus }}</div>
                  <textarea class="form-control" rows="13" id="decompressText" v-model="decompressText" readonly></textarea>
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
import { loadAssets } from "@/utils/utils";

export default {
  data() {
    return {
      compressText: "",
      compressTextInfo: "",
      compressStatus: "",
      resultText: "",
      decompressText: "",
      decompressStatus: "",
      scriptLoaded: false,
    };
  },
  methods: {
    compress(flag) {
      this.isTreeViewer = flag;

      if (this.compressText == "") {
        return;
      }

      if (!this.scriptLoaded) {
        this.scriptLoaded = true;
        loadAssets({ js: ["/assets/static/js/plugins/lzma_worker-min.js"] })
          .then(() => {
            this.textCompress(flag);
          })
          .catch((error) => {
            console.error("스크립트 로드 실패:", error);
          });
      } else {
        this.textCompress(flag);
      }
    },
    textInput() {
      const compressText = this.compressText;
      const bytes = utf8ByteLength(compressText);
      this.compressTextInfo = `문자 수: ${compressText.length} | UTF-8 바이트: ${bytes}`;
    },
    textCompress(flag) {
      const compressText = this.compressText;
      if (flag) {
        LZMA.compress(compressText, 6, (result, err) => {
          if (err) {
            this.resultText = "압축 에러: " + err;
            return;
          }
          try {
            const u8 = toUint8Array(result);
            const b64 = bytesToBase64(u8);
            this.resultText = b64;

            const origBytes = utf8ByteLength(compressText);
            const compBytes = u8.length;
            const ratio = (compBytes / origBytes) * 100;
            const saved = 100 - ratio;

            this.compressStatus = `압축 바이트: ${compBytes} | 압축률: ${ratio.toFixed(2)}% (절감률 ${saved.toFixed(2)}%)`;
          } catch (e) {
            this.resultText = "결과 처리 에러: " + e.message;
          }
        });
      } else {
        const b64 = this.resultText;
        if (!b64) {
          this.decompressText = "먼저 Base64 압축 결과가 있어야 합니다.";
          return;
        }
        let bytes;
        try {
          bytes = base64ToBytes(b64);
        } catch (e) {
          this.decompressText = "Base64 디코딩 실패: " + e.message;
          return;
        }

        LZMA.decompress(bytes, (result, err) => {
          if (err) {
            this.decompressText = "해제 에러: " + err;
            return;
          }
          if (typeof result === "string") {
            this.decompressText = result;
            this.decompressStatus = `해제된 문자 수: ${result.length} | UTF-8 바이트: ${utf8ByteLength(result)}`;
          } else if (result instanceof Uint8Array) {
            // 텍스트가 아닌 바이너리였던 경우(참고용)
            this.decompressText = "[바이너리 데이터] 길이: " + result.length + " bytes";
            this.decompressStatus = "바이너리 데이터는 텍스트로 표시되지 않습니다.";
          } else {
            this.decompressText = "";
            this.decompressStatus = "알 수 없는 해제 결과 형식입니다.";
          }
        });
      }
    },
  },
};

// --- 유틸: 문자열 UTF-8 바이트 길이 ---
function utf8ByteLength(str) {
  return new TextEncoder().encode(str).length;
}

// --- 유틸: 어떤 형태든 Uint8Array로 정규화 ---
function toUint8Array(data) {
  if (data instanceof Uint8Array) return data;
  if (data instanceof Int8Array) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  if (Array.isArray(data)) {
    const u8 = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) u8[i] = data[i] & 0xff;
    return u8;
  }
  throw new Error("알 수 없는 바이트 배열 형식입니다.");
}

// --- 유틸: 바이트 배열 <-> Base64 (대용량 안전) ---
function bytesToBase64(bytes) {
  const u8 = toUint8Array(bytes);
  let bin = "";
  const CHUNK = 0x8000; // 32k
  for (let i = 0; i < u8.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

function base64ToBytes(b64) {
  const bin = atob(b64.trim());
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}
</script>
