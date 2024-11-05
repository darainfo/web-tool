import QrGenerator from "../pages/qr-generator.vue";
import ImageBase64 from "../pages/image-base64.vue";
import TextDiff from "../pages/text-diff.vue";

import EmptyBody from "../components/layout/EmptyBody.vue";

import CaseChange from "../pages/text/case-change.vue";
import TextSize from "../pages/text/text-size.vue";
import TextSort from "../pages/text/text-sort.vue";

export const routes = [
  {
    component: TextDiff,
    path: "/textDiff",
    meta: {
      i18n: "text.diff",
    },
  },
  {
    component: QrGenerator,
    path: "/qrGenerator",
    meta: {
      i18n: "qr.qenerator",
    },
  },
  {
    component: ImageBase64,
    path: "/imageToDataUrl",
    meta: {
      i18n: "image.base64",
    },
  },

  {
    path: "/text",
    redirect: "/text/caseChange",
    meta: {
      i18n: "text",
    },
    component: EmptyBody,
    children: [
      {
        component: CaseChange,
        path: "caseChange",
        meta: {
          i18n: "case.change",
        },
      },
      {
        component: TextSize,
        path: "textSize",
        meta: {
          i18n: "text.size",
        },
      },
      {
        component: TextSort,
        path: "textSort",
        meta: {
          i18n: "text.sort",
        },
      },
    ],
  },
];
