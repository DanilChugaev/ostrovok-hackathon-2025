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
import type { Trip } from '../../types.ts';
import { PAGES } from '../../constants.ts';
import { ref } from 'vue';
import HotelCard from '../../components/HotelCard.vue';
import { useRouter } from 'vue-router';

defineProps<{
  trips: Trip[];
}>();

const router = useRouter();

const isVisibleDialog = ref(false);

function onReadMoreButtonClick() {
  isVisibleDialog.value = true;
}

function onReportButtonClick(id: number) {
  router.push(`${PAGES.ReportHotel}/${id}`);
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
