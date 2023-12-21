<script setup lang="ts">
import { ref } from "vue";
import LeftMenu from "./left-menu.vue";
import HaderBreadcrumb from "./header-breadcrumb.vue";

const COMPONENT = "basic-layout";

const collapsed = ref(false);
const onCollapse = (val: boolean) => {
  collapsed.value = val;
};
</script>
<template>
  <a-layout :class="COMPONENT">
    <a-layout-sider
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="onCollapse"
    >
      <!-- <div class="logo" /> -->
      <LeftMenu />
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header> Header </a-layout-header> -->
      <a-layout style="padding: 0 24px">
        <HaderBreadcrumb />
        <a-layout-content :class="`${COMPONENT}-content`">
          <router-view />
        </a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style lang="less">
@COMPONENT: basic-layout;
.@{COMPONENT} {
  height: 100%;
  &-content {
    height: 100%;
  }
}
</style>
