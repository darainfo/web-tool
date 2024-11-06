<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-menu-wrapper">
      <div class="sidebar-search">
        <input type="text" @input="menuSearch()" v-model="searchText" class="form-control" placeholder="Menu search." />
      </div>
      <div class="sidebar-menu">
        <div class="wrapper">
          <SideMenu :items="items" :searchList="searchList" :depth="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from "@/routes/menuRoutes";
import SideMenu from "./SideMenu.vue";
import { watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { i18n } from "@/i18n";

const allMenuItem = {};
function deepCopyWithSlice(arr, parentItem, returnArr) {
  for (const item of arr) {
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

    allMenuItem[reItem["path"]] = reItem;
  }
  return returnArr;
}

// 활성화된 메뉴 부모 상태 처리
function setParentEnableActive(menuItem, flag) {
  menuItem.isActive = flag;

  if (menuItem.parentNode) {
    setParentEnableActive(menuItem.parentNode, flag);
  }
}

export default {
  components: {
    SideMenu,
  },
  setup() {
    const currentPagePath = useRoute();
    let beforeActiveItem = {};
    const menuList = []; //reactive([]);
    deepCopyWithSlice(routes, { path: "" }, menuList);

    watch(currentPagePath, (newRoute, oldRoute) => {
      if (allMenuItem[newRoute.path]) {
        setParentEnableActive(beforeActiveItem, false);
        setParentEnableActive(allMenuItem[newRoute.path], true);
        beforeActiveItem = allMenuItem[newRoute.path];
      }
    });

    return {
      items: menuList,
      orginList: menuList,
      searchList: reactive([]),
      searchText: "",
    };
  },
  props: {
    copy: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
  },

  methods: {
    menuSearch() {
      const keyword = this.searchText;

      if (keyword.length > 0) {
        const regExpSch = new RegExp(keyword.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i");
        this.searchList.length = 0;
        for (const [key, item] of Object.entries(allMenuItem)) {
          if (!item.isChild && i18n.global.t(item.meta.i18n).match(regExpSch) != null) {
            this.searchList.push(item);
          }
        }

        console.log("this.searchList : ", this.searchList.length);
      }
    },
  },
};
</script>
