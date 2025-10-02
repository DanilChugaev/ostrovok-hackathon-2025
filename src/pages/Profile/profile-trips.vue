<template>
  <div class="profile-trips">
    <template v-if="sortedTrips.length">
      <hotel-card v-for="trip in sortedTrips" :key="trip.id" :hotel="trip.hotel">
        <template #badge>
          <div
            v-if="isSecretGuestProgramAccepted"
            :class="['profile-trips__badge', `profile-trips__badge--${getBadgeColor(trip)}`]"
          >
            {{ getBadge(trip) }}
          </div>
        </template>

        <template #dates>
          <div>
            <b>{{ $t('travelDate') }}</b>
            <p class="profile-trips__dates">
              {{ $t('from') }} {{ trip.startDate }} {{ $t('to') }} {{ trip.endDate }}
            </p>
          </div>
        </template>

        <template #actions>
          <b v-if="checkCurrentDateIsBeforeTripDate(trip.startDate)">
            {{ $t('upcomingTrip') }}
          </b>

          <Button
            v-else-if="!isSecretGuestProgramAccepted || trip.hasReport"
            :label="$t('learnMore')"
            outlined
            @click="onReadMoreButtonClick"
          />

          <Button
            v-else-if="isSecretGuestProgramAccepted && !trip.hasReport"
            :label="$t('fillOutTheReport')"
            @click="onReportButtonClick(trip.id)"
          />
        </template>
      </hotel-card>
    </template>

    <p v-else>
      {{
        isSecretGuestProgramAccepted
          ? $t('youDontHaveAnyTripsYetSelectHotel')
          : $t('youDontHaveAnyTripsYet')
      }}
    </p>
  </div>

  <Dialog
    v-model:visible="isVisibleReportDialog"
    modal
    :header="$t('reportInformation')"
    :style="{ width: '25rem' }"
  >
    {{ $t('report') }}
  </Dialog>

  <Dialog
    v-model:visible="isVisibleTripDialog"
    modal
    :header="$t('tripInformation')"
    :style="{ width: '25rem' }"
  >
    {{ $t('trip') }}
  </Dialog>
</template>

<script setup lang="ts">
import type { HotelReportResponse, Trip } from '../../types.ts';
import { computed, ref } from 'vue';
import HotelCard from '../../components/HotelCard.vue';
import { useUser } from '../../composables/useUser.ts';
import dayjs from 'dayjs';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import { useLocale } from '../../composables/useLocale.ts';

const props = defineProps<{
  trips: Trip[];
  reports: HotelReportResponse[];
}>();

const { isSecretGuestProgramAccepted, user } = useUser();
const { createHotelReport } = useHotelReports();
const { t } = useLocale();

const isVisibleReportDialog = ref(false);
const isVisibleTripDialog = ref(false);

const sortedTrips = computed(() =>
  props.trips.sort((a, b) => dayjs(b.startDate).diff(a.startDate)),
);

function checkCurrentDateIsBeforeTripDate(date: string) {
  return dayjs(new Date()).isBefore(dayjs(date));
}

function onReadMoreButtonClick() {
  if (isSecretGuestProgramAccepted.value) {
    isVisibleReportDialog.value = true;
  } else {
    isVisibleTripDialog.value = true;
  }
}

async function onReportButtonClick(tripId: number) {
  await createHotelReport(user.value!.id, tripId);
}

function getBadge(trip: Trip) {
  if (trip.hasReport) {
    const progress = props.reports?.find(report => report?.trip?.id === trip.id)?.progress ?? 0;

    if (progress && progress === 100) {
      return t('reportSent');
    }

    return t('reportPending');
  }

  return t('waitingForReport');
}

function getBadgeColor(trip: Trip) {
  if (trip.hasReport) {
    const progress = props.reports?.find(report => report?.trip?.id === trip.id)?.progress ?? 0;

    if (progress && progress === 100) {
      return 'green';
    }

    return 'blue';
  }

  return 'yellow';
}
</script>

<style scoped>
.profile-trips {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  margin-bottom: var(--spacer-f);
}

.profile-trips__dates {
  text-align: start;
  font-size: 0.8rem;
  margin-top: var(--spacer-a);
}

.profile-trips__badge {
  display: flex;
  align-items: center;
  gap: var(--spacer-c);
  font-size: 0.8rem;
  padding: var(--spacer-a) var(--spacer-c);
  border-radius: 1rem;
  margin-top: var(--spacer-c);
}

.profile-trips__badge--green {
  background-color: var(--p-emerald-200);
  color: var(--p-emerald-900);
}

.profile-trips__badge--yellow {
  background-color: var(--p-amber-200);
  color: var(--p-amber-900);
}

.profile-trips__badge--blue {
  background-color: var(--p-blue-200);
  color: var(--p-blue-900);
}
</style>
