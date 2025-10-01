<template>
  <div class="hotels">
    <h1 class="hotels__title">{{ $t('selectAHotelToCheck') }}</h1>

    <hotel-filters v-model="filters" :cities :categories />

    <div class="hotels__list">
      <hotel-card v-for="hotel in hotelsFiltered" :key="hotel.id" :hotel="hotel">
        <template #actions>
          <Button :label="selectHotelButtonLabel" @click="onSelectHotelButtonClick(hotel.id)" />
        </template>
      </hotel-card>
    </div>
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
import HotelFilters from './hotel-filters.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import type { Hotel, HotelFiltersType } from '../../types.ts';
import HotelCard from '../../components/HotelCard.vue';
import { useNotifications } from '../../composables/useNotifications.ts';
import { apiRequest } from '../../api/request.ts';
import { API } from '../../constants.ts';
import { useLocale } from '../../composables/useLocale.ts';
import { useUser } from '../../composables/useUser.ts';
import { useTrips } from '../../composables/useTrips.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';

const { errorNotify } = useNotifications();
const { t, localeKey } = useLocale();
const { isSecretGuestProgramAccepted, user } = useUser();
const { createTrip } = useTrips();
const { createHotelReport } = useHotelReports();

const filters = reactive<HotelFiltersType>({
  name: '',
  city: '',
  stars: 0,
});

const hotels = ref<Hotel[]>([]);
const isVisibleInfoAboutHotelDialog = ref(false);

const cities = computed(() => [...new Set(hotels.value.map(item => item.city[localeKey.value]))]);
const categories = computed(() => [...new Set(hotels.value.map(item => item.stars.toString()))]);
const hotelsFiltered = computed(() => {
  return hotels.value.filter(item => {
    if (!filters.name && !filters.city && !filters.stars) {
      return true;
    }

    return (
      (item.name &&
        filters.name &&
        item.name[localeKey.value].toLowerCase().includes(filters.name.toLowerCase())) ||
      item.city[localeKey.value] === filters.city ||
      item.stars === filters.stars
    );
  });
});
const selectHotelButtonLabel = computed(() =>
  isSecretGuestProgramAccepted.value ? t('selectAHotel') : t('hotelInformation'),
);

async function fetchHotels() {
  try {
    hotels.value = await apiRequest<Hotel[]>(API.Hotels, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

async function onSelectHotelButtonClick(hotelId: number) {
  if (isSecretGuestProgramAccepted.value) {
    // для упрощения mvp просто создаем поездку и потом переходим в созданный отчет по этой поездке
    const trip = await createTrip(user.value!.id, hotelId);
    await createHotelReport(user.value!.id, trip!.id);
  } else {
    isVisibleInfoAboutHotelDialog.value = true;
  }
}

onMounted(async () => {
  await fetchHotels();
});
</script>

<style scoped>
.hotels {
  display: flex;
  flex-direction: column;
}

.hotels__title {
  margin: var(--spacer-f) 0;
}

.hotels__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  padding: var(--spacer-e) 0;
}
</style>
