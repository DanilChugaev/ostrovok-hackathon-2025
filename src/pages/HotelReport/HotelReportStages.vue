<template>
  <div class="hotel-report">
    <h1>{{ $t('hotelRating') }}</h1>

    <!--    <rating-progress :title="$t('overallProgress')" :percent="ratingPercent" />-->

    <!--    список отчетов -->
    <!--    <info-card-list :items="categories">-->
    <!--      <template #default="{ item }: { item: Review }">-->
    <!--        <div class="hotel-report__item">-->
    <!--          <div class="hotel-report__title-container">-->
    <!--            <i :class="item.icon"></i>-->

    <!--            <h3>{{ item.name }}</h3>-->
    <!--          </div>-->

    <!--          <p>"{{ item.text }}"</p>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </info-card-list>-->
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
// import RatingProgress from '../../components/RatingProgress.vue';
// import type { Review } from '../../types.ts';
// import InfoCardList from '../../components/InfoCardList.vue';
//
// const ratingPercent = computed(() => 38);
</script>

<style scoped>
.hotel-report {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}
</style>
