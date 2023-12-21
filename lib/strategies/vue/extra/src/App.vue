<script setup lang="ts">
import { eventBus } from '@geektech/utils';

eventBus.on('login-expired', () => {
  location.href = `/login?redirect=${encodeURIComponent(location.href)}`;
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
