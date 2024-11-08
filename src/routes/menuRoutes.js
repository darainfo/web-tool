// import QrGenerator from "@/pages/qr-generator.vue";
// import ImageBase64 from "@/pages/image-base64.vue";
import TextDiff from "@/pages/text-diff.vue";
//import CaseChange from "@/pages/text/case-change.vue";
//import TextSize from "@/pages/text/text-size.vue";
//import TextSort from "@/pages/text/text-sort.vue";

import NotFound from "@/components/common/not-found.vue";
import EmptyBody from "@/components/layout/EmptyBody.vue";

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
        component: () => import("@/pages/text/case-change.vue"),
        path: "caseChange",
        meta: {
          i18n: "menu.case_change",
        },
      },
      {
        component: () => import("@/pages/text/text-size.vue"),
        path: "textSize",
        meta: {
          i18n: "menu.text_size",
        },
      },
      {
        component: () => import("@/pages/text/text-sort.vue"),
        path: "textSort",
        meta: {
          i18n: "menu.text_sort",
        },
      },
    ],
  },
  {
    component: TextDiff, // () => import("@/pages/text-diff.vue"),
    path: "/textDiff",
    meta: {
      i18n: "menu.text_diff",
    },
  },
  {
    component: () => import("@/pages/qr-generator.vue"),
    path: "/qrGenerator",
    meta: {
      i18n: "menu.qr_qenerator",
    },
  },
  {
    component: () => import("@/pages/image-base64.vue"),
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

export function getPagePath() {
  const menuList = [];
  deepCopyWithSlice(routes, { path: "" }, menuList);

  const resultArr = [];

  for (const menu of menuList) {
    resultArr.push(menu.path);
  }
  return resultArr;
}

function deepCopyWithSlice(arr, parentItem, returnArr) {
  for (const item of arr) {
    if (item.meta.hideMenu === true) continue;

    const isChild = item.children && item.children.length > 0 ? true : false;

    const reItem = { isChild: isChild, isOpen: false, isActive: false, parentNode: parentItem };

    reItem["path"] = (parentItem.path ? parentItem.path + "/" : "") + item.path;
    reItem["key"] = reItem["path"];
    for (const key of ["meta", "name"]) {
      if (item[key]) reItem[key] = item[key];
    }

    if (isChild) {
      deepCopyWithSlice(item.children, reItem, returnArr);
    }
    returnArr.push(reItem);
  }
  return returnArr;
}
