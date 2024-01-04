<script setup lang="ts">
import { onMounted } from 'vue';
import { useHomeDashboardState } from './home-dashboard-state';

const COMPONENT = 'home-dashboard';
const { newUserCount, userGrowthRate } = useHomeDashboardState();

onMounted(() => {});
</script>

<template>
  <div :class="COMPONENT">
    <a-space size="large">
      <a-statistic title="New Users" :value="newUserCount" show-group-separator>
        <template #suffix>
          <icon-arrow-rise />
        </template>
      </a-statistic>
      <a-statistic
        title="User Growth Rate"
        :value="userGrowthRate"
        :precision="2"
        :value-style="{ color: '#0fbf60' }"
      >
        <template #prefix>
          <icon-arrow-rise />
        </template>
        <template #suffix>%</template>
      </a-statistic>
    </a-space>
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
