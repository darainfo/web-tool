//import MainPage from "@/pages/main.vue";
//import NotFound from "@/components/common/not-found.vue";
import { reactive } from "vue";

export const routes = [
  {
    component: () => import("@/pages/main.vue"),
    path: "/",
    meta: {
      hideMenu: true,
    },
  },
  {
    path: "/text",
    redirect: "/text/caseChange",
    meta: {
      i18n: "menu.text",
    },
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
      {
        component: () => import("@/pages/text/text-remove-duplicates.vue"),
        path: "removeDuplicates",
        meta: {
          i18n: "menu.remove_duplicates",
        },
      },
    ],
  },
  {
    component: () => import("@/pages/text-diff.vue"),
    path: "/textDiff",
    meta: {
      i18n: "menu.text_diff",
    },
  },
  {
    component: () => import("@/pages/json-pretty.vue"),
    path: "/jsonPretty",
    meta: {
      i18n: "menu.json_pretty",
    },
  },

  {
    component: () => import("@/pages/date-calculation.vue"),
    path: "/dateCalculation",
    meta: {
      i18n: "menu.date_calculation",
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
    path: "/util",
    redirect: "/util/uuidGenerate",
    meta: {
      i18n: "menu.util",
    },
    children: [
      {
        component: () => import("@/pages/util/uuid-generate.vue"),
        path: "uuidGenerate",
        meta: {
          i18n: "menu.uuid_generate",
        },
      },
      {
        component: () => import("@/pages/util/unit-conversion.vue"),
        path: "unitConversion",
        meta: {
          i18n: "menu.unit_conversion",
        },
      },
    ],
  },

  {
    path: "/:catchAll(.*)",
    component: () => import("@/components/common/not-found.vue"),
    meta: {
      hideMenu: true,
    },
  },
];

export function getAllRoutePath() {
  const pathList = [];
  getRoutePath(routes, { path: "" }, pathList);
  return pathList;
}

function getRoutePath(arr, parentItem, returnArr) {
  for (const item of arr) {
    if (item.meta.hideMenu === true) continue;

    const isChild = item.children && item.children.length > 0;

    const reItem = {};

    reItem["path"] = (parentItem.path ? parentItem.path + "/" : "") + item.path;

    if (isChild) {
      getRoutePath(item.children, item, returnArr);
    } else {
      returnArr.push(reItem["path"]);
    }
  }
  return returnArr;
}

export function getAllMenuItem() {
  const menuList = [];
  const pathAndMenu = {};
  deepCopyWithSlice(routes, { path: "" }, menuList, pathAndMenu);

  return { list: menuList, pathAndMenu: pathAndMenu };
}

function deepCopyWithSlice(arr, parentItem, returnArr, pathAndMenu) {
  for (const item of arr) {
    if (item.meta.hideMenu === true) continue;

    const isChild = item.children && item.children.length > 0;

    const reItem = reactive({ isChild: isChild, isOpen: false, isActive: false, parentNode: parentItem });

    reItem["path"] = (parentItem.path ? parentItem.path + "/" : "") + item.path;
    reItem["key"] = reItem["path"];
    for (const key of ["meta", "name"]) {
      if (item[key]) reItem[key] = item[key];
    }

    if (isChild) {
      reItem["children"] = deepCopyWithSlice(item.children, reItem, [], pathAndMenu);
    }
    returnArr.push(reItem);

    pathAndMenu[reItem["path"]] = reItem;
  }
  return returnArr;
}
