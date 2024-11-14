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
import { getAllMenuItem } from "@/routes/menuRoutes";
import SideMenu from "./SideMenu.vue";
import { watch, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { i18n } from "@/i18n";

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
    const menuInfo = getAllMenuItem();

    const menuList = menuInfo.list;
    const allMenuInfo = menuInfo.pathAndMenu;

    watch(currentPagePath, (newRoute, oldRoute) => {
      let newPath = newRoute.path;
      newPath = newPath.endsWith("/") ? newPath.replace(/\/$/, "") : newPath;

      if (allMenuInfo[newPath]) {
        if (beforeActiveItem.path) {
          setParentEnableActive(beforeActiveItem, false, false);
        }
        setParentEnableActive(allMenuInfo[newPath], true, false);
        beforeActiveItem = allMenuInfo[newPath];
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
        for (const [key, item] of Object.entries(allMenuInfo)) {
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
