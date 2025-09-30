<template>
  <div class="hotels">
    <h1 class="hotels__title">{{ $t('selectAHotelToCheck') }}</h1>

    <hotel-filters v-model="filters" :cities :categories />

    <div class="hotels__list">
      <hotel-card v-for="hotel in hotelsFiltered" :key="hotel.id" :hotel="hotel">
        <template #actions>
          <Button :label="$t('selectAHotel')" @click="onSelectHotelButtonClick(hotel.id)" />
        </template>
      </hotel-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import HotelFilters from './hotel-filters.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import type { Hotel, HotelFiltersType } from '../../types.ts';
import HotelCard from '../../components/HotelCard.vue';
import { useNotifications } from '../../composables/useNotifications.ts';
import { apiRequest } from '../../api/request.ts';
import { API, PAGES } from '../../constants.ts';
import { useRouter } from 'vue-router';

const { errorNotify } = useNotifications();
const router = useRouter();

const filters = reactive<HotelFiltersType>({
  name: '',
  city: '',
  category: 0,
});

const hotels = ref<Hotel[]>([]);

const cities = computed(() => [...new Set(hotels.value.map(item => item.city))]);
const categories = computed(() => [...new Set(hotels.value.map(item => item.category.toString()))]);
const hotelsFiltered = computed(() => {
  return hotels.value.filter(item => {
    if (!filters.name && !filters.city && !filters.category) {
      return true;
    }

    return (
      (item.name && filters.name && item.name.toLowerCase().includes(filters.name.toLowerCase())) ||
      item.city === filters.city ||
      item.category === filters.category
    );
  });
});

async function fetchTrips() {
  try {
    hotels.value = await apiRequest<Hotel[]>(API.Hotels, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

function onSelectHotelButtonClick(id: number) {
  router.push(`${PAGES.ReportHotel}/${id}`);
}

onMounted(async () => {
  await fetchTrips();
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
