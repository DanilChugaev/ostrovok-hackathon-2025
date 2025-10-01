<template>
  <div class="hotel-report">
    <h1>{{ $t('hotelRating') }} - этапы</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.hotel-report {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}
</style>
