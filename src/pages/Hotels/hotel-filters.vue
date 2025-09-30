<template>
  <div class="hotel-filters">
    <InputGroup>
      <InputText v-model="model!.name" :placeholder="$t('searchByName')" />
      <Button label="Фильтры" icon="pi pi-filter" @click="toggleFilters" />
    </InputGroup>

    <div v-if="isVisibleFilters" class="hotel-filters__list">
      <div class="hotel-filters__item">
        <b>{{ $t('city') }}</b>

        <SelectButton v-model="model!.city" :options="cities" />
      </div>

      <div class="hotel-filters__item">
        <b>{{ $t('hotelCategory') }}</b>

        <SelectButton
          :model-value="model!.stars.toString()"
          :options="categories"
          @update:model-value="model!.stars = Number($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HotelFiltersType } from '../../types.ts';
import { ref } from 'vue';

const model = defineModel<HotelFiltersType>();

defineProps<{
  cities: string[];
  categories: string[];
}>();

const isVisibleFilters = ref(false);

function toggleFilters() {
  isVisibleFilters.value = !isVisibleFilters.value;
}
</script>

<style scoped>
.hotel-filters:deep(.p-inputgroup .p-inputtext) {
  padding: var(--spacer-c) var(--spacer-d);
}

.hotel-filters__list {
  display: flex;
  flex-direction: column;
  padding: var(--spacer-d);
  gap: var(--spacer-e);
  background-color: var(--p-menubar-background);
  border-bottom-left-radius: var(--p-border-radius-lg);
  border-bottom-right-radius: var(--p-border-radius-lg);
}

.hotel-filters__item {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-c);
}
</style>
