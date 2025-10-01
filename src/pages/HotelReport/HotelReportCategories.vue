<template>
  <div class="hotel-report-stages">
    <h1>{{ $t('hotelRating') }} - категории</h1>

    <info-card-list :items="categories" grid-type="grid">
      <template #default="{ item }: { item: HotelReportCategoryResponse }">
        <hotel-report-card
          :code="item.code"
          :name="item.name"
          :progress="item.progress"
          :description="item.description"
        >
          <template #footer>
            <Button
              :label="getButtonLabel(item.progress)"
              icon="pi pi-angle-right"
              icon-pos="right"
              @click="() => {}"
            />
          </template>
        </hotel-report-card>
      </template>
    </info-card-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import { useRouter } from 'vue-router';
import type { HotelReportCategoryResponse } from '../../types.ts';
import InfoCardList from '../../components/InfoCardList.vue';
import HotelReportCard from '../../components/HotelReportCard.vue';

const props = defineProps<{
  stageId: number;
}>();

const { isAuth } = useUser();
const { fetchHotelReportCategoriesByStageId, getButtonLabel } = useHotelReports();
const router = useRouter();

const categories = ref<HotelReportCategoryResponse[]>([]);

onMounted(async () => {
  if (isAuth.value) {
    categories.value = await fetchHotelReportCategoriesByStageId(props.stageId);
  } else {
    router.push(PAGES.Login);
  }
});
</script>

<style scoped>
.hotel-report-stages {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  margin-bottom: var(--spacer-e);
}

.hotel-report-stages__text {
  text-align: start;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}
</style>
