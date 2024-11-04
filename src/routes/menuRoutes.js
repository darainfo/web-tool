import QrGenerator from "../pages/qr-generator.vue";
import ImageBase64 from "../pages/image-base64.vue";
import TextDiff from "../pages/text-diff.vue";

import CaseChange from "../pages/text/case-change.vue";
import TextSize from "../pages/text/text-size.vue";
import TextSort from "../pages/text/text-sort.vue";

export const routes = [
  {
    component: TextDiff,
    path: "/textDiff",
  },
  {
    component: QrGenerator,
    path: "/qrGenerator",
  },
  {
    component: ImageBase64,
    path: "/imageToDataUrl",
  },
  {
    component: CaseChange,
    path: "/text/caseChange",
  },
  {
    component: TextSize,
    path: "/text/textSize",
  },
  {
    component: TextSort,
    path: "/text/textSort",
  },
];
