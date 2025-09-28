<template>div</template>

<script setup lang="ts">
import { apiRequest } from '../../api/request.ts';
import type { Trip } from '../../types.ts';
import { API } from '../../constants.ts';
import { onMounted, ref } from 'vue';
import { useNotifications } from '../../composables/useNotifications.ts';

const { errorNotify } = useNotifications();

const trips = ref<Trip[]>([]);

async function fetchTrips() {
  try {
    trips.value = await apiRequest<Trip[]>(API.Trips, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  await fetchTrips();
});
</script>

<style scoped></style>
