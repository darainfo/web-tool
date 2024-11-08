<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-menu-wrapper">
      <div class="sidebar-search">
        <input type="text" @input="menuSearch($event)" class="form-control" placeholder="Menu search." />
      </div>
      <div class="sidebar-menu">
        <div class="wrapper">
          <SideMenu :items="items" :searchList="searchList" :enableSearch="enableSearch" :depth="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from "@/routes/menuRoutes";
import SideMenu from "./SideMenu.vue";
import { watch, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { i18n } from "@/i18n";

const allMenuItem = {};
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

    allMenuItem[reItem["path"]] = reItem;
  }
  return returnArr;
}

// 활성화된 메뉴 부모 상태 처리
function setParentEnableActive(menuItem, flag, isOpen) {
  if (isOpen && flag) {
    menuItem.isOpen = true;
  }
  menuItem.isActive = flag;

  if (menuItem.parentNode) {
    setParentEnableActive(menuItem.parentNode, flag, true);
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
        setParentEnableActive(beforeActiveItem, false, false);
        setParentEnableActive(allMenuItem[newRoute.path], true, false);
        beforeActiveItem = allMenuItem[newRoute.path];
      }
    });

    const searchList = reactive([]);
    let enableSearch = ref(false);

    const menuSearch = (event) => {
      const searchText = event.target.value;

      if (searchText.length > 0) {
        enableSearch.value = true;
        const regExpSch = new RegExp(searchText.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i");
        searchList.length = 0;
        for (const [key, item] of Object.entries(allMenuItem)) {
          if (!item.isChild && i18n.global.t(item.meta.i18n).match(regExpSch) != null) {
            searchList.push(item);
          }
        }
      } else {
        enableSearch.value = false;
        searchList.length = 0;
      }
    };

    return {
      items: menuList,
      orginList: menuList,
      searchList: searchList,
      enableSearch,
      menuSearch,
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
};
</script>
