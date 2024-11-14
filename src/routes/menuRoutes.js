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
    redirect: "/text/caseChange",
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

    const isChild = item.children && item.children.length > 0 ? true : false;

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
  deepCopyWithSlice(routes, { path: "" }, menuList);

  return menuList;
}

export const G_ALL_MENU_ITEM = {};
function deepCopyWithSlice(arr, parentItem, returnArr) {
  for (const item of arr) {
    if (item.meta.hideMenu === true) continue;

    const isChild = item.children && item.children.length > 0 ? true : false;

    const reItem = reactive({ isChild: isChild, isOpen: false, isActive: false, parentNode: parentItem });

    reItem["path"] = (parentItem.path ? parentItem.path + "/" : "") + item.path;
    reItem["key"] = reItem["path"];
    for (const key of ["meta", "name"]) {
      if (item[key]) reItem[key] = item[key];
    }

    if (isChild) {
      reItem["children"] = deepCopyWithSlice(item.children, reItem, []);
    }
    returnArr.push(reItem);

    G_ALL_MENU_ITEM[reItem["path"]] = reItem;
  }
  return returnArr;
}
