<template>
  <div class="profile-trips">
    <hotel-card v-for="trip in trips" :key="trip.id" :hotel="trip.hotel">
      <template #badge>
        <div
          :class="[
            'profile-trips__badge',
            {
              'profile-trips__badge--has-report': trip.hasReport,
            },
          ]"
        >
          {{ trip.hasReport ? 'Отчет отправлен' : 'Ожидает отчета' }}
        </div>
      </template>

      <template #dates>
        <div>
          <b>Дата поездки:</b>
          <p class="profile-trips__dates">c {{ trip.startDate }} по {{ trip.endDate }}</p>
        </div>
      </template>

      <template #actions>
        <Button v-if="trip.hasReport" label="Подробнее" outlined @click="onReadMoreButtonClick" />
        <Button v-else label="Заполнить отчет" @click="onReportButtonClick(trip.hotel.id)" />
      </template>
    </hotel-card>
  </div>

  <Dialog
    v-model:visible="isVisibleDialog"
    modal
    header="Информация по отчету"
    :style="{ width: '25rem' }"
  >
    Отчет
  </Dialog>
</template>

<script setup lang="ts">
import { apiRequest } from '../../api/request.ts';
import type { Trip } from '../../types.ts';
import { API, PAGES } from '../../constants.ts';
import { onMounted, ref } from 'vue';
import { useNotifications } from '../../composables/useNotifications.ts';
import HotelCard from '../../components/HotelCard.vue';
import { useRouter } from 'vue-router';

const { errorNotify } = useNotifications();
const router = useRouter();

const trips = ref<Trip[]>([]);
const isVisibleDialog = ref(false);

async function fetchTrips() {
  try {
    trips.value = await apiRequest<Trip[]>(API.Trips, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

function onReadMoreButtonClick() {
  isVisibleDialog.value = true;
}

function onReportButtonClick(id: number) {
  router.push(`${PAGES.ReportHotel}/${id}`);
}

onMounted(async () => {
  await fetchTrips();
});
</script>

<style scoped>
.profile-trips {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  padding: var(--spacer-e) 0;
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
