<template>
  <div class="hotels-list">
    <hotel-card v-for="hotel in hotels" :key="hotel.id" :hotel="hotel">
      <template #actions>
        <Button :label="$t('hotelInformation')" @click="onSelectHotelButtonClick()" />
      </template>
    </hotel-card>
  </div>

  <Dialog
    v-model:visible="isVisibleInfoAboutHotelDialog"
    modal
    :header="$t('hotelInformation')"
    :style="{ width: '25rem' }"
  >
    {{ $t('hotel') }}
  </Dialog>
</template>

<script setup lang="ts">
import HotelCard from '../../components/HotelCard.vue';
import { apiRequest } from '../../api/request.ts';
import type { Hotel } from '../../types.ts';
import { API } from '../../constants.ts';
import { onMounted, ref } from 'vue';
import { useNotifications } from '../../composables/useNotifications.ts';

const { errorNotify } = useNotifications();

const hotels = ref<Hotel[]>([]);
const isVisibleInfoAboutHotelDialog = ref(false);

async function fetchHotels() {
  try {
    hotels.value = await apiRequest<Hotel[]>(API.Hotels, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

async function onSelectHotelButtonClick() {
  isVisibleInfoAboutHotelDialog.value = true;
}

onMounted(async () => {
  await fetchHotels();
});
</script>

<style scoped>
.hotels-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  padding: var(--spacer-d) 0;
}
</style>
