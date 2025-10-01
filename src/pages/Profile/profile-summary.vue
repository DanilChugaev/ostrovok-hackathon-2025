<template>
  <info-card-list :items="summary" class="profile-summary">
    <template #default="{ item }: { item: Summary }">
      <component
        :is="item.to ? 'router-link' : 'div'"
        :to="item.to"
        :class="[
          'profile-summary__item',
          item.className,
          {
            'profile-summary__item--link': item.to,
          },
        ]"
      >
        <i class="profile-summary__icon" :class="item.icon"></i>

        <b>{{ item.count }}</b>

        <p>{{ item.text }}</p>
      </component>
    </template>
  </info-card-list>
</template>

<script setup lang="ts">
import type { HotelReportResponse, Summary, Trip } from '../../types.ts';
import InfoCardList from '../../components/InfoCardList.vue';
import { computed } from 'vue';
import { useUser } from '../../composables/useUser.ts';
import { useLocale } from '../../composables/useLocale.ts';
import { PAGES } from '../../constants.ts';

const props = defineProps<{
  trips: Trip[];
  reports: HotelReportResponse[];
}>();

const { user } = useUser();
const { t } = useLocale();

const summary = computed<Summary[]>(() =>
  [
    {
      id: 1,
      count: props.trips.length,
      icon: 'pi pi-calendar',
      text: t('totalTrips'),
      className: 'profile-summary__item--calendar',
    },
    {
      id: 2,
      count: props.reports.filter(report => report.userId === user.value!.id && report.totalScore)
        .length,
      icon: 'pi pi-check-circle',
      text: t('completedReports'),
      className: 'profile-summary__item--check',
      to: PAGES.HotelReports,
    },
    {
      id: 3,
      count: user.value?.loyalty?.score ?? 0,
      icon: 'pi pi-trophy',
      text: t('accumulatedPoints'),
      className: 'profile-summary__item--star',
    },
  ].filter(item => {
    if (item.id === 2 && user.value?.role === 'user') return false;

    return true;
  }),
);
</script>

<style scoped>
.profile-summary {
  display: flex;
  justify-content: space-between;
  gap: var(--spacer-e);
  padding: var(--spacer-e) 0;
}

.profile-summary__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-d);
  text-decoration: none;
  color: var(--color-text);
}

.profile-summary__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-d);
  border-radius: 50%;
  font-size: 1.5rem;
}

.profile-summary__item--link {
  transition: background-color 0.2s;
  margin: -1.778rem;
  padding: var(--spacer-e);
}

.profile-summary__item--link:hover {
  background-color: var(--p-togglebutton-hover-background);
}

.profile-summary__item--calendar .pi {
  background-color: var(--p-sky-200);
  color: var(--p-sky-900);
}

.profile-summary__item--check .pi {
  background-color: var(--p-emerald-200);
  color: var(--p-emerald-900);
}

.profile-summary__item--star .pi {
  background-color: var(--p-yellow-200);
  color: var(--p-yellow-900);
}
</style>
