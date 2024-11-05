<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-menu-wrapper">
      <div class="sidebar-search">
        <input type="text" id="sideMenuSearch" class="form-control" placeholder="Menu search." />
      </div>
      <div class="sidebar-menu">
        <div class="wrapper">
          <SideMenu :items="items" :depth="0" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { routes } from "@/routes/menuRoutes";
import SideMenu from "../SideMenu.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";

const allMenuItem = {};
function deepCopyWithSlice(arr, parentItem) {
  return arr.map((item) => {
    let isChild = item.children && item.children.length > 0 ? true : false;

    const reItem = { isChild: isChild, isOpen: false, isActive: false, parentNode: parentItem };

    reItem["path"] = (parentItem.path ? parentItem.path + "/" : "") + item.path;
    for (const key of ["meta", "name"]) {
      if (item[key]) reItem[key] = item[key];
    }

    if (isChild) {
      reItem["children"] = deepCopyWithSlice(item.children, item);
    }

    allMenuItem[reItem["path"]] = reItem;

    return reItem; // 원시값은 그대로 반환
  });
}

// 활성화된 메뉴 부모 상태 처리
function setParentEnableActive(menuItem, flag) {
  menuItem.isActive = flag;

  if (menuItem.parentNode) {
    setParentEnableActive(menuItem.parentNode);
  }
}

export default {
  components: {
    SideMenu,
  },
  data() {
    const currentPagePath = useRoute();
    let beforeActiveItem = {};
    const menuList = deepCopyWithSlice(routes, { path: "" });
    watch(currentPagePath, (newRoute, oldRoute) => {
      console.log("라우트 변경됨:", newRoute.path);
      if (allMenuItem[newRoute.path]) {
        console.log("allMenuItem[newRoute.path] : ", beforeActiveItem, allMenuItem[newRoute.path]);
        setParentEnableActive(beforeActiveItem, false);
        setParentEnableActive(allMenuItem[newRoute.path], true);

        beforeActiveItem = allMenuItem[newRoute.path];
      }
    });

    return {
      items: menuList,
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
