<template>
  <section id="advantages" class="advantages">
    <h2>{{ $t('benefitsOfTheProgram') }}</h2>

    <info-card-list :items="advantages">
      <template #default="{ item }: { item: Advantage }">
        <div class="advantages__item">
          <i class="advantages__icon" :class="item.icon"></i>

          <h3>{{ item.title }}</h3>

          <p>{{ item.description }}</p>
        </div>
      </template>
    </info-card-list>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InfoCardList from '../../components/InfoCardList.vue';
import { useI18n } from 'vue-i18n';

interface Advantage {
  id: number | string;
  icon: string;
  title: string;
  description: string;
}

const { t } = useI18n();

const advantages = ref<Advantage[]>([
  {
    id: 'freeAccommodation',
    icon: 'pi pi-star',
    title: t('freeAccommodation'),
    description: t('getFreeOrSignificantlyDiscountedHotelStays'),
  },
  {
    id: 'flexibleChoice',
    icon: 'pi pi-map-marker',
    title: t('flexibleChoice'),
    description: t('chooseFromAWideRangeOfHotelsInDifferentCitiesAndCountries'),
  },
  {
    id: 'impactOnQuality',
    icon: 'pi pi-check',
    title: t('impactOnQuality'),
    description: t('yourFeedbackWillHelpImproveTheQualityOfServiceAndCustomerServiceAtHotels'),
  },
]);
</script>

<style scoped>
.advantages__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-d);
}

.advantages__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-d);
  background-color: var(--p-sky-200);
  color: var(--p-sky-800);
  border-radius: 50%;
}
</style>
