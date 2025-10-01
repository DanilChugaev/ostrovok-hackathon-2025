<template>
  <div class="hotel-report-stages">
    <h1>{{ $t('hotelRating') }} - этапы</h1>

    <hotel-card v-if="report" :hotel="report.trip.hotel">
      <template #dates>
        <div>
          <b>{{ $t('travelDate') }}</b>
          <p class="hotel-report-stages__text">
            {{ $t('from') }} {{ report.trip.startDate }} {{ $t('to') }} {{ report.trip.endDate }}
          </p>
        </div>
      </template>
    </hotel-card>

    <info-progress
      v-if="report?.progress"
      :title="$t('overallProgress')"
      :percent="report.progress"
    />

    <info-card-list :items="stages" grid-type="grid">
      <template #default="{ item }: { item: HotelReportStageResponse }">
        {{ item }}
      </template>
    </info-card-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import { useRouter } from 'vue-router';
import type { HotelReportResponse, HotelReportStageResponse } from '../../types.ts';
import HotelCard from '../../components/HotelCard.vue';
import InfoCardList from '../../components/InfoCardList.vue';
import InfoProgress from '../../components/InfoProgress.vue';

const props = defineProps<{
  reportId: number;
}>();

const { isAuth } = useUser();
const { fetchHotelReportById, fetchHotelReportStagesByReportId } = useHotelReports();
const router = useRouter();

const report = ref<HotelReportResponse | null>(null);
const stages = ref<HotelReportStageResponse[]>([]);

onMounted(async () => {
  if (isAuth.value) {
    report.value = await fetchHotelReportById(props.reportId);
    stages.value = await fetchHotelReportStagesByReportId(props.reportId);
  } else {
    router.push(PAGES.Login);
  }
});
</script>

<style scoped>
.hotel-report-stages {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
}

.hotel-report-stages__text {
  text-align: start;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}
</style>
