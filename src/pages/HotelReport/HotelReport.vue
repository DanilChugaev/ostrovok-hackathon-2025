<template>
  <div class="hotel-report">
    <h1>{{ $t('hotelRating') }}</h1>

    <pre>{{ report }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { HotelReportResponse } from '../../types.ts';
import { onMounted, ref } from 'vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useRouter } from 'vue-router';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';

const { isAuth } = useUser();
const router = useRouter();
const { fetchHotelReportById } = useHotelReports();

const report = ref<HotelReportResponse | null>(null);

onMounted(async () => {
  if (isAuth.value) {
    report.value = await fetchHotelReportById(5);
  } else {
    router.push(PAGES.Login);
  }
});
</script>

<style scoped>
.hotel-report {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}
</style>
