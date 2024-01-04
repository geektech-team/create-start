<script setup lang="ts">
import { eventBus } from '@geektech/utils';

eventBus.on('login-expired', () => {
  location.href = `/login?redirect=${encodeURIComponent(location.href)}`;
});

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
function switchTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
}
matchMedia.addEventListener('change', function () {
  switchTheme(this.matches ? 'dark' : 'light');
});
switchTheme(matchMedia.matches ? 'dark' : 'light');
</script>

<template>
  <router-view />
</template>

<style scoped></style>
