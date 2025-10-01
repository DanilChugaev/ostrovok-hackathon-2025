<template>
  <div class="hotel-report">
    <h1>{{ $t('reportInformation') }}</h1>

    <hotel-card v-if="report" :hotel="report.trip.hotel">
      <template #dates>
        <div>
          <b>{{ $t('travelDate') }}</b>
          <p class="hotel-report__text">
            {{ $t('from') }} {{ report.trip.startDate }} {{ $t('to') }} {{ report.trip.endDate }}
          </p>
        </div>
      </template>
    </hotel-card>

    <guest-report-info
      v-if="report"
      :comment="report.comment"
      :user-id="report.userId"
      :created-date="report.createdDate"
    />

    <p>ниже выводим по пунктам все его оценки</p>
  </div>
</template>

<script setup lang="ts">
import type { HotelReportResponse } from '../../types.ts';
import { onMounted, ref } from 'vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useRouter } from 'vue-router';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import HotelCard from '../../components/HotelCard.vue';
import GuestReportInfo from '../../components/GuestReportInfo.vue';

const props = defineProps<{
  reportId: number;
}>();

const { isAuth } = useUser();
const router = useRouter();
const { fetchHotelReportById } = useHotelReports();

const report = ref<HotelReportResponse | null>(null);

onMounted(async () => {
  if (isAuth.value) {
    report.value = await fetchHotelReportById(props.reportId);
  } else {
    router.push(PAGES.Login);
  }
});
</script>

<style scoped>
.hotel-report {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
}

.hotel-report__text {
  text-align: start;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}
</style>
