<template>
  <div class="report-hotel">
    <h1>{{ $t('hotelRating') }}</h1>

    <rating-progress :title="$t('overallProgress')" :percent="ratingPercent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RatingProgress from '../components/RatingProgress.vue';

const ratingPercent = computed(() => 38);
</script>

<style scoped>
.report-hotel {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}
</style>
