<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const COMPONENT = 'header-breadcrumb';

const matchedRoutes = computed(() => {
  return route.matched.filter(route => route.meta.text);
});
</script>

<template>
  <div :class="COMPONENT">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(route, index) in matchedRoutes" :key="index" style="cursor: pointer">
        <router-link :to="{ name: route.name }" style="cursor: pointer">
          {{ route.meta.text }}
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style lang="less">
@COMPONENT: header-breadcrumb;
.@{COMPONENT} {
  display: flex;
  height: 40px;
  place-items: center;
}
</style>
