<!-- RecursiveList.vue -->
<template>
  <ul class="menu">
    <li v-for="(item, key) in items" :key="key" class="sidebar-item" :class="menuClass(item)">
      <RouterLink :to="item.isChild ? '' : item.path" class="sidebar-link" @click="toggleFolder($event, item)" active-class="active" exact-active-class="">
        <span>{{ item.meta.i18n }}</span> {{ item.isActive }}
      </RouterLink>

      <SideMenuChildren v-if="item.children && item.children.length > 0" :items="item.children" :depth="depth + 1" :parent-menu="item" />
    </li>
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
    depth: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  methods: {
    toggleFolder(event, menuItem) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log(event);
      menuItem.isOpen = !menuItem.isOpen;
    },
    menuClass(item) {
      console.log("1111111", item.isActive, item);
      return { active: item.isActive, "has-sub": item.isChild };
    },
  },
};
</script>
