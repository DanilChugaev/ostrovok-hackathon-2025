<template>
  <profile-greeting-section />

  <profile-info-section />
</template>

<script setup lang="ts">
import { useUser } from '../../composables/useUser.ts';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { PAGES } from '../../constants.ts';
import ProfileGreetingSection from './profile-greeting-section.vue';
import ProfileInfoSection from './profile-info-section.vue';

const { isAuth, isAdmin, isHotel } = useUser();
const router = useRouter();

onBeforeMount(() => {
  if (!isAuth.value) {
    router.push(PAGES.Login);
  }

  if (isAuth.value) {
    if (isAdmin.value) {
      router.push(PAGES.Admin);
    }

    if (isHotel.value) {
      router.push(PAGES.HotelAccount);
    }
  }
});
</script>

<style scoped></style>
