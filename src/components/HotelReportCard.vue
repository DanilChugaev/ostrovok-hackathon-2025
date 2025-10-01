<template>
  <div class="hotel-report-card">
    <div class="hotel-report-card__header">
      <i class="hotel-report-card__icon" :class="HOTEL_REPORT_CODE_ICON_MAP[code]"></i>
      <b class="hotel-report-card__title">{{ name[localeKey] }}</b>
    </div>

    <info-progress :title="$t('progress')" :percent :custom-info="progressInfo" />

    <div class="hotel-report-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HotelReportStageProgress, LocaleString } from '../types.ts';
import { HOTEL_REPORT_CODE_ICON_MAP } from '../constants.ts';
import { useLocale } from '../composables/useLocale.ts';
import InfoProgress from './InfoProgress.vue';
import { computed } from 'vue';

const props = defineProps<{
  code: string;
  name: LocaleString;
  progress: HotelReportStageProgress;
}>();

const { localeKey } = useLocale();

const percent = computed(() => (props.progress.current / props.progress.max) * 100);
const progressInfo = computed(() => `${props.progress.current} / ${props.progress.max}`);
</script>

<style scoped>
.hotel-report-card {
  display: flex;
  flex-direction: column;
}

.hotel-report-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacer-d);
  margin-bottom: var(--spacer-d);
}

.hotel-report-card__title {
  margin-top: 4px;
}

.hotel-report-card__icon {
  font-size: 2rem;
}

.hotel-report-card__footer {
  display: flex;
  flex-direction: row-reverse;
  margin-top: var(--spacer-de);
}
</style>
