<template>
  <ul class="submenu" :class="['submenu-level-' + this.depth, parentMenu.isActive ? 'active' : '', parentMenu.isOpen ? 'submenu-open' : '']">
    <li v-for="(item, index) in items" :key="index" class="submenu-item" :class="{ active: item.isActive, 'has-sub': item.isChild }">
      <RouterLink v-if="item.path" :to="item.path" class="submenu-link" @click.prevent="item.isChild ? toggleFolder(item) : null" active-class="active" exact-active-class="">
        <i v-if="item.icon" :class="item.icon" />
        <span>{{ $t(item.meta.i18n) }}</span>
      </RouterLink>

      <SideMenuChildren v-if="item.children && item.children.length" :items="item.children" :depth="this.depth + 1" :parent-menu="item" />
    </li>
  </ul>
</template>

<script>
// 재귀 컴포넌트에서 자기 자신을 임포트
export default {
  name: "SideMenuChildren",
  props: {
    items: {
      type: Array,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    parentMenu: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleFolder(menuItem) {
      menuItem.isOpen = !menuItem.isOpen;
    },
  },
};
</script>
