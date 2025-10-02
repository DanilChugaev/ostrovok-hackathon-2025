<template>
  <div class="hotel-account">
    <h1>{{ $t('hotelManagement') }}</h1>

    <hotels-list />
  </div>
</template>

<script setup lang="ts">
import HotelsList from './Admin/hotels-list.vue';
</script>

<style scoped>
.hotel-account {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  padding: var(--spacer-d) 0;
}
</style>
