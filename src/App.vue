<script>
import SideBar from "./components/menu/SideBar.vue";
import TopBar from "./components/menu/TopBar.vue";
import { i18n } from "@/i18n";

import { useHead } from "@unhead/vue";

export default {
  components: {
    SideBar,
    TopBar,
  },
  setup() {
    //모든 페이지에 기본 메타 태그 설정
    useHead({
      title: i18n.global.t("main.title"),
      meta: [
        { name: "robots", content: "index, follow" },
        { property: "description", content: i18n.global.t("description") },
        { property: "og:title", content: i18n.global.t("title") },
        { property: "og:description", content: i18n.global.t("description") },
        { property: "og:url", content: i18n.global.t("url") },
      ],
    });

    return {
      useHead,
    };
  },
};
</script>

<style lang="scss">
@import "/style/app";
</style>
<template>
  <div id="sidebarContainer">
    <SideBar />
  </div>
  <div id="mainContainer">
    <div class="main-header"><TopBar /></div>
    <div class="main-content"><RouterView /></div>
  </div>
</template>
