<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3" v-for="(item, key) in items" :key="key">
      <div class="card mb1">
        <div class="card-header px-4 pt-4">
          <RouterLink :to="item.path" class="sidebar-link" active-class="active" exact-active-class="">
            <h5 class="card-title mb-0">{{ $t(item.meta.i18n) }}</h5>
            <div>&nbsp;</div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllMenuItem } from "@/routes/menuRoutes";

const allPageItems = [];
function getAllPage(arr) {
  for (const item of arr) {
    if (item.meta.hideMenu === true) continue;

    if (item.isChild) {
      getAllPage(item.children);
    } else {
      allPageItems.push(item);
    }
  }

  return allPageItems;
}

export default {
  setup() {
    const menuList = getAllMenuItem();

    const allPages = getAllPage(menuList);

    return {
      items: allPages,
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
