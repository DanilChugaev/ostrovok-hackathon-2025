<template>
  <div>
    <pre>{{ response }}</pre>
    <Button :label="$t('checkHealth')" @click="fetchHealth" />
  </div>
</template>

<script setup lang="ts">
import { apiRequest } from '../api/request.ts';
import { API } from '../constants.ts';
import { onMounted, ref } from 'vue';
import { useNotifications } from '../composables/useNotifications.ts';

const { errorNotify } = useNotifications();

const response = ref<Record<string, string>>();

async function fetchHealth() {
  try {
    response.value = await apiRequest<Record<string, string>>(API.Health, { method: 'GET' }).then(
      data => data.data,
    );
  } catch (e: any) {
    errorNotify(e.message);
    return [];
  }
}

onMounted(async () => {
  await fetchHealth();
});
</script>

<style scoped></style>
