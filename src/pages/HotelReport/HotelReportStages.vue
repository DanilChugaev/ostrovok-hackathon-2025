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
        <hotel-report-card :code="item.code" :name="item.name" :progress="item.progress">
          <template #footer>
            <Button
              :label="getButtonLabel(item.progress)"
              icon="pi pi-angle-right"
              icon-pos="right"
              @click="() => {}"
            />
          </template>
        </hotel-report-card>
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
import type {
  HotelReportResponse,
  HotelReportStageProgress,
  HotelReportStageResponse,
} from '../../types.ts';
import HotelCard from '../../components/HotelCard.vue';
import InfoCardList from '../../components/InfoCardList.vue';
import InfoProgress from '../../components/InfoProgress.vue';
import HotelReportCard from '../../components/HotelReportCard.vue';
import { useLocale } from '../../composables/useLocale.ts';

const props = defineProps<{
  reportId: number;
}>();

const { isAuth } = useUser();
const { fetchHotelReportById, fetchHotelReportStagesByReportId } = useHotelReports();
const router = useRouter();
const { t } = useLocale();

const report = ref<HotelReportResponse | null>(null);
const stages = ref<HotelReportStageResponse[]>([]);

function getButtonLabel(progress: HotelReportStageProgress) {
  if (progress.current === progress.max) {
    return t('view');
  }

  if (progress.current === 0) {
    return t('start');
  }

  return t('continue');
}

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
  margin-bottom: var(--spacer-e);
}

.hotel-report-stages__text {
  text-align: start;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}
</style>
