<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterName } from '@/router/enum';
import { AUTH_TOKEN } from '@/constants';
import { useRouter } from 'vue-router';

const router = useRouter();

const COMPONENT = 'login-view';
const props = defineProps<{ redirect?: string }>();

const onLogin = () => {
  localStorage.setItem(AUTH_TOKEN, '123456');
  if (props.redirect) {
    location.href = props.redirect;
  } else {
    router.push({ name: RouterName.Home });
  }
};

onMounted(() => {});
</script>

<template>
  <div :class="COMPONENT">
    login-view
    <a-button @click="onLogin">Login</a-button>
  </div>
</template>

<style lang="less">
@COMPONENT: login-view;
.@{COMPONENT} {
  //  display: flex;
}
</style>
