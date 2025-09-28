<template>Admin</template>

<script setup lang="ts">
import { useUser } from '../composables/useUser.ts';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { PAGES } from '../constants.ts';

const { isAuth, isAdmin } = useUser();
const router = useRouter();

onBeforeMount(() => {
  if (!isAuth.value || !isAdmin.value) {
    router.push(PAGES.Main);
  }
});
</script>

<style scoped></style>
