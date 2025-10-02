<template>
  <div class="hotel-reports">
    <h1>{{ $t('reports') }}</h1>

    <DataTable :value="reports" resizableColumns columnResizeMode="expand" showGridlines>
      <Column field="status" :header="$t('reportStatus')">
        <template #body="{ data }">
          {{ data.totalScore ? $t('completed') : $t('inProgress') }}
        </template>
      </Column>

      <Column field="createdDate" :header="$t('createdDate')"></Column>

      <Column field="hotelName" :header="$t('hotel')">
        <template #body="{ data }">
          {{ data.trip.hotel.name[localeKey] }}
        </template>
      </Column>

      <Column field="comment" :header="$t('comment')">
        <template #body="{ data }">
          <Button
            v-if="data.comment"
            icon="pi pi-info-circle"
            size="small"
            rounded
            variant="text"
            @click="toggle($event, data.comment)"
          />
        </template>
      </Column>

      <Column field="progress" :header="$t('progress')"></Column>

      <Column field="totalScore" :header="$t('totalScore')"></Column>

      <Column>
        <template #body="{ data }">
          <Button
            class="hotel-reports__button"
            icon="pi pi-angle-right"
            icon-pos="right"
            size="small"
            :label="data.totalScore ? $t('show') : $t('continue')"
            @click="
              data.totalScore ? goToHotelReportPage(data.id) : goToHotelReportStagesPage(data.id)
            "
          />
        </template>
      </Column>
    </DataTable>

    <Button
      class="hotel-reports__create-button"
      :label="$t('addNewReport')"
      @click="onCreateButtonClick"
    />
  </div>

  <Popover ref="popover">{{ selectedComment }}</Popover>

  <Dialog
    v-model:visible="isVisibleCreateHotelReportDialog"
    modal
    :header="$t('selectTrip')"
    :style="{ width: '20rem' }"
  >
    <div class="select-trip-dialog">
      <template v-if="filteredTrips.length">
        <Select v-model="selectedTrip" :options="filteredTrips" optionLabel="id" variant="filled" />

        <Button
          :label="$t('addNewReport')"
          :disabled="!selectedTrip"
          @click="createHotelReport(user!.id, selectedTrip!.id)"
        />
      </template>

      <p v-else>{{ $t('oopsNoMoreRidesAvailable') }}</p>
    </div>
  </Dialog>

  <router-view></router-view>
</template>

<script setup lang="ts">
import type { HotelReportResponse, Trip } from '../../types.ts';
import { computed, onBeforeMount, ref } from 'vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useRouter } from 'vue-router';
import { useTrips } from '../../composables/useTrips.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import { useLocale } from '../../composables/useLocale.ts';

const { user, isAuth } = useUser();
const router = useRouter();
const { fetchTrips } = useTrips();
const { fetchHotelReports, createHotelReport, goToHotelReportPage, goToHotelReportStagesPage } =
  useHotelReports();
const { localeKey } = useLocale();

const popover = ref();
const reports = ref<HotelReportResponse[]>([]);
const trips = ref<Trip[]>([]);
const selectedTrip = ref<Trip | null>();
const selectedComment = ref<string>('');
const isVisibleCreateHotelReportDialog = ref(false);

const filteredTrips = computed(() => trips.value.filter(trip => !trip.hasReport));

async function onCreateButtonClick() {
  isVisibleCreateHotelReportDialog.value = true;
}

function toggle(event: any, comment: string) {
  popover.value.toggle(event);
  selectedComment.value = comment;
}

onBeforeMount(async () => {
  if (isAuth.value) {
    reports.value = await fetchHotelReports(user.value!.id);
    trips.value = await fetchTrips(user.value!.id);
  } else {
    router.push(PAGES.Login);
  }
});
</script>

<style>
.hotel-reports {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  padding-top: var(--spacer-e);
}

.hotel-reports__container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hotel-reports__title {
  font-size: 1rem;
  margin-bottom: var(--spacer-d);
  padding: 0;
}

.hotel-reports__text {
  text-align: start;
}

.hotel-reports__comment {
  display: flex;
  align-items: center;
  gap: var(--spacer-b);
}

.hotel-reports__comment :deep(.p-button) {
  padding: 0 !important;
}

.hotel-reports__button {
  width: 100%;
}

.hotel-reports__create-button {
  margin: 0 auto;
}

.select-trip-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacer-d);
}

.select-trip-dialog .p-select,
.select-trip-dialog .p-button {
  width: 100%;
}
</style>
