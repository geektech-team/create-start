<script setup lang="ts">
import { routes, hideInMenuRoutes } from '@/router';
import { RouterName } from '@/router/enum';
import { deepClone } from '@geektech/utils';
import { computed } from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';

const router = useRouter();
const route = useRoute();

const COMPONENT = 'left-menu';

const activeRoutes = computed(() => {
  return route.matched.map(item => item.name);
});

const getVisibleRoutes = (routes: RouteRecordRaw[]) => {
  const _routes: RouteRecordRaw[] = deepClone(routes);
  return _routes.filter(item => {
    if (hideInMenuRoutes.includes(item.name as RouterName)) {
      return false;
    } else {
      if (item.children?.length) {
        item.children = getVisibleRoutes(item.children);
        if (item.children.length === 0) {
          item.children = undefined;
        }
      }
      return true;
    }
  });
};

const visibleRoutes = getVisibleRoutes(routes);

const menuChange = (name: string) => {
  router.push({ name });
};

const subMenuChange = (name: string) => {
  router.push({ name });
};
</script>

<template>
  <a-menu
    :class="COMPONENT"
    :selected-keys="activeRoutes"
    @menu-item-click="menuChange"
    @sub-menu-click="subMenuChange"
  >
    <template v-for="route in visibleRoutes" :key="route.name">
      <a-sub-menu v-if="route.children" :key="route.name as string">
        <template #title>
          <span class="title">
            <i v-if="route.meta?.icon" :class="route.meta.icon" />
            {{ route.meta?.text }}
          </span>
        </template>
        <a-menu-item
          v-for="subRoute in route.children"
          :key="subRoute.name as string"
        >
          {{ subRoute.meta?.text }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="route.name as string">
        <span class="title">
          <i v-if="route.meta?.icon" :class="route.meta?.icon" />
          {{ route.meta?.text }}
        </span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<style lang="less">
@COMPONENT: left-menu;
.@{COMPONENT} {
  //  display: flex;
  .title {
    display: flex;
    place-items: center;
    i {
      margin-right: 16px;
    }
  }
}
</style>
