import QrGenerator from "../views/qr-generator.vue";
import ImageBase64 from "../views/image-base64.vue";
import TextDiff from "../views/text-diff.vue";

import NotFound from "../components/not-found.vue";
import EmptyBody from "../components/layout/EmptyBody.vue";

//import CaseChange from "../views/text/case-change.vue";
//import TextSize from "../views/text/text-size.vue";
//import TextSort from "../views/text/text-sort.vue";

export const routes = [
  {
    path: "/text",
    redirect: "/text/caseChange",
    meta: {
      i18n: "menu.text",
    },
    component: EmptyBody,
    children: [
      {
        component: () => import("../views/text/case-change.vue"),
        path: "caseChange",
        meta: {
          i18n: "menu.case_change",
        },
      },
      {
        component: () => import("../views/text/text-size.vue"),
        path: "textSize",
        meta: {
          i18n: "menu.text_size",
        },
      },
      {
        component: () => import("../views/text/text-sort.vue"),
        path: "textSort",
        meta: {
          i18n: "menu.text_sort",
        },
      },
    ],
  },
  {
    component: () => import("../views/text-diff.vue"),
    path: "/textDiff",
    meta: {
      i18n: "menu.text_diff",
    },
  },
  {
    component: () => import("../views/qr-generator.vue"),
    path: "/qrGenerator",
    meta: {
      i18n: "menu.qr_qenerator",
    },
  },
  {
    component: () => import("../views/image-base64.vue"),
    path: "/imageToDataUrl",
    meta: {
      i18n: "menu.image_base64",
    },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: {
      hideMenu: true,
    },
  },
];
