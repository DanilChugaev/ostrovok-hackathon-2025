<template>
  <div class="profile-trips">
    <template v-if="sortedTrips.length">
      <hotel-card v-for="trip in sortedTrips" :key="trip.id" :hotel="trip.hotel">
        <template #badge>
          <div
            v-if="isSecretGuestProgramAccepted"
            :class="[
              'profile-trips__badge',
              {
                'profile-trips__badge--has-report': trip.hasReport,
              },
            ]"
          >
            {{ trip.hasReport ? $t('reportSent') : $t('waitingForReport') }}
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

    <p>
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
import type { Trip } from '../../types.ts';
import { computed, ref } from 'vue';
import HotelCard from '../../components/HotelCard.vue';
import { useUser } from '../../composables/useUser.ts';
import dayjs from 'dayjs';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';

const props = defineProps<{
  trips: Trip[];
}>();

const { isSecretGuestProgramAccepted, user } = useUser();
const { createHotelReport } = useHotelReports();

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
  background-color: var(--p-amber-200);
  color: var(--p-amber-900);
}

.profile-trips__badge--has-report {
  background-color: var(--p-emerald-200);
  color: var(--p-emerald-900);
}
</style>
