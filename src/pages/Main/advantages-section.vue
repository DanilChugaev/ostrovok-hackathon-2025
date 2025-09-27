<template>
  <section id="advantages" class="advantages">
    <h2>Преимущества программы</h2>

    <card-list :items="advantages">
      <template #default="{ item }: { item: Advantage }">
        <div class="advantages__item">
          <i class="advantages__icon" :class="item.icon"></i>

          <h3>{{ item.title }}</h3>

          <p>{{ item.description }}</p>
        </div>
      </template>
    </card-list>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CardList from '../../components/CardList.vue';

interface Advantage {
  id: number | string;
  icon: string;
  title: string;
  description: string;
}

const advantages = ref<Advantage[]>([
  {
    id: 'freeAccommodation',
    icon: 'pi pi-star',
    title: 'Бесплатное проживание',
    description:
      'Получите возможность бесплатно остановиться в отелях или со значительной скидкой.',
  },
  {
    id: 'flexibleChoice',
    icon: 'pi pi-map-marker',
    title: 'Гибкий выбор',
    description: 'Выбирайте из множества отелей в разных городах и странах.',
  },
  {
    id: 'impactOnQuality',
    icon: 'pi pi-check',
    title: 'Влияние на качество',
    description: 'Ваши отзывы помогут улучшить качество сервиса и обслуживания в отелях.',
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
