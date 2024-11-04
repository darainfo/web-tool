<script>
import SideBar from "./components/layout/SideBar.vue";
import TopBar from "./components/layout/TopBar.vue";

export default {
  components: {
    SideBar,
    TopBar,
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
