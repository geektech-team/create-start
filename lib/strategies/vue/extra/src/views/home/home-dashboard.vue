<script setup lang="ts">
import { onMounted } from 'vue';

const COMPONENT = 'home-dashboard';

onMounted(() => {});
</script>

<template>
  <div :class="COMPONENT">
    首页仪表盘
  </div>
</template>

<style lang="less">
@COMPONENT: home-dashboard;
.@{COMPONENT} {
  height: 100%;
  padding: 20px;
  background-color: var(--color-fill-2);
  box-sizing: border-box;
}
</style>
