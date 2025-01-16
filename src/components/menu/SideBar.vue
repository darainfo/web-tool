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
      <div class="sidebar-footer">
        <a href="https://github.com/darainfo/web-tool" target="_blank" title="Github">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-github" viewBox="0 0 16 16">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
            ></path>
          </svg>
        </a>
        <a href="https://github.com/darainfo/web-tool/releases" target="_blank" title="Download" style="margin-left: 10px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"></path>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"></path>
          </svg>
        </a>
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
