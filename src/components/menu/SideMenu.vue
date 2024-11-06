<!-- RecursiveList.vue -->
<template>
  <ul class="menu">
    {{
      searchList.length
    }}
    <template v-if="searchList.length > 0">
      <li v-for="(item, key) in items" :key="key" class="sidebar-item" :class="{ active: item.isActive }">
        <RouterLink :to="item.path" class="sidebar-link" active-class="active" exact-active-class="">
          <span>{{ $t(item.meta.i18n) }}</span>
        </RouterLink>
      </li>
    </template>
    <template v-else>
      <li v-for="(item, key) in items" :key="key" class="sidebar-item" :class="{ active: item.isActive, 'has-sub': item.isChild }">
        <RouterLink :to="item.isChild ? '' : item.path" class="sidebar-link" @click="item.isChild ? toggleFolder($event, item) : null" active-class="active" exact-active-class="">
          <span>{{ $t(item.meta.i18n) }}</span>
        </RouterLink>

        <SideMenuChildren v-if="item.children && item.children.length > 0" :items="item.children" :depth="depth + 1" :parent-menu="item" />
      </li>
    </template>
  </ul>
</template>

<script>
import SideMenuChildren from "./SideMenuChildren.vue";

// 재귀 컴포넌트에서 자기 자신을 임포트
export default {
  name: "SideMenu",
  components: {
    SideMenuChildren,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    searchList: {
      type: Array,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  methods: {
    toggleFolder(event, menuItem) {
      menuItem.isOpen = !menuItem.isOpen;
    },
  },
};
</script>
