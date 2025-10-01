<template>
  <div class="hotel-reports">
    <h1>{{ $t('reports') }}</h1>

    <info-card-list :items="sortedReports" grid-type="grid">
      <template #default="{ item }: { item: HotelReportResponse }">
        <div v-if="item.id" class="hotel-reports__container">
          <h2 class="hotel-reports__title">{{ $t('reportFrom', { date: item.createdDate }) }}</h2>

          <p class="hotel-reports__text">{{ $t('trip') }}: {{ item.trip.id }}</p>
          <p class="hotel-reports__text">
            {{ $t('reportStatus') }}: {{ item.totalScore ? $t('completed') : $t('inProgress') }}
          </p>

          <template v-if="item.totalScore">
            <p class="hotel-reports__text">{{ $t('totalScore') }}: {{ item.totalScore }}</p>

            <div class="hotel-reports__comment">
              <p class="hotel-reports__text">{{ $t('comment') }}:</p>
              <Button
                icon="pi pi-info-circle"
                size="small"
                rounded
                variant="text"
                @click="toggle($event, item.comment)"
              />
            </div>
          </template>

          <Button
            class="hotel-reports__button"
            icon="pi pi-angle-right"
            icon-pos="right"
            size="small"
            :label="item.totalScore ? $t('show') : $t('continue')"
            @click="
              item.totalScore ? goToHotelReportPage(item.id) : goToHotelReportStagesPage(item.id)
            "
          />
        </div>

        <button
          v-else
          v-tooltip.bottom="$t('addNewReport')"
          class="hotel-reports__create-button"
          @click="onCreateButtonClick"
        >
          <i class="pi pi-plus"></i>
        </button>
      </template>
    </info-card-list>
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
import InfoCardList from '../../components/InfoCardList.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useTrips } from '../../composables/useTrips.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';

const { user, isAuth } = useUser();
const router = useRouter();
const { fetchTrips } = useTrips();
const { fetchHotelReports, createHotelReport, goToHotelReportPage, goToHotelReportStagesPage } =
  useHotelReports();

const popover = ref();
const reports = ref<HotelReportResponse[]>([]);
const trips = ref<Trip[]>([]);
const selectedTrip = ref<Trip | null>();
const selectedComment = ref<string>('');
const isVisibleCreateHotelReportDialog = ref(false);

const sortedReports = computed<HotelReportResponse[]>(() => {
  if (!isAuth.value) return [];

  return [
    ...reports.value,
    {
      id: 0,
      userId: user.value!.id,
      trip: {},
      totalScore: 0,
      comment: '',
      createdDate: dayjs(),
    } as unknown as HotelReportResponse,
  ].sort((a, b) => dayjs(a.createdDate).diff(b.createdDate));
});
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
  margin-left: auto;
  margin-top: auto;
}

.hotel-reports__create-button {
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  min-height: 220px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.hotel-reports__create-button:hover {
  background-color: var(--p-togglebutton-hover-background);
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
