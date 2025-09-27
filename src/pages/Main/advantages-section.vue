<template>
  <section class="advantages">
    <h2>Преимущества программы</h2>

    <ul class="advantages__list">
      <li v-for="item in advantages" :key="item.id" class="advantages__item">
        <i class="advantages__icon" :class="item.icon"></i>

        <h3>{{ item.title }}</h3>

        <p>{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const advantages = ref([
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
.advantages__list {
  display: flex;
  justify-content: space-between;
  gap: var(--spacer-e);
}

.advantages__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-d);
  flex: 1;
  flex-wrap: wrap;
  min-width: 350px;
  padding: var(--spacer-e);
  border: 1px solid var(--border-color);
  border-radius: vaR(--p-border-radius-lg);
  background-color: var(--p-menubar-background);
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.09);
  transition: box-shadow 0.3s;
}

.advantages__item:hover {
  box-shadow: 0 0.6rem 0.9rem rgba(0, 0, 0, 0.09);
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
