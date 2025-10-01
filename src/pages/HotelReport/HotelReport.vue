<template>
  <div class="hotel-report">
    <h1>{{ $t('hotelRating') }}</h1>

    <pre>{{ report }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { HotelReportResponse } from '../../types.ts';
import { onMounted, ref } from 'vue';
import { apiRequest } from '../../api/request.ts';
import { API, PAGES } from '../../constants.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import { useUser } from '../../composables/useUser.ts';
import { useRoute, useRouter } from 'vue-router';

const { errorNotify } = useNotifications();
const { isAuth } = useUser();
const router = useRouter();
const route = useRoute();

const report = ref<HotelReportResponse | null>(null);

async function fetchHotelReportById() {
  try {
    report.value = await apiRequest<HotelReportResponse>(
      `${API.HotelReport}?id=${route.params.id}`,
      { method: 'GET' },
    ).then(data => data.data);

    if (!report.value) {
      router.push(PAGES.HotelReports);
    }
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  if (isAuth.value) {
    await fetchHotelReportById();
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
