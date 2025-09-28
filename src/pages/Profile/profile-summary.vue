<template>
  <info-card-list :items="summary" class="profile-summary">
    <template #default="{ item }: { item: Summary }">
      <div class="profile-summary__item" :class="item.className">
        <i class="profile-summary__icon" :class="item.icon"></i>

        <b>{{ item.count }}</b>

        <p>{{ item.text }}</p>
      </div>
    </template>
  </info-card-list>
</template>

<script setup lang="ts">
import type { Summary, Trip } from '../../types.ts';
import InfoCardList from '../../components/InfoCardList.vue';
import { ref } from 'vue';
import { useUser } from '../../composables/useUser.ts';

const props = defineProps<{
  trips: Trip[];
}>();

const { user } = useUser();

const summary = ref<Summary[]>([
  {
    id: 1,
    count: props.trips.length,
    icon: 'pi pi-calendar',
    text: 'Всего поездок',
    className: 'profile-summary__item--calendar',
  },
  {
    id: 2,
    count: props.trips.reduce((acc, current) => (acc += current.hasReport ? 1 : 0), 0),
    icon: 'pi pi-check-circle',
    text: 'Завершенных отчетов',
    className: 'profile-summary__item--check',
  },
  {
    id: 3,
    count: user.value?.loyalty?.score ?? 0,
    icon: 'pi pi-star',
    text: 'Накопленных баллов',
    className: 'profile-summary__item--star',
  },
]);
</script>

<style scoped>
.profile-summary {
  display: flex;
  justify-content: space-between;
  gap: var(--spacer-e);
  padding: var(--spacer-e) 0;
}

.profile-summary__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-d);
}

.profile-summary__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-d);
  border-radius: 50%;
  font-size: 1.5rem;
}

.profile-summary__item--calendar .pi {
  background-color: var(--p-sky-200);
  color: var(--p-sky-900);
}

.profile-summary__item--check .pi {
  background-color: var(--p-emerald-200);
  color: var(--p-emerald-900);
}

.profile-summary__item--star .pi {
  background-color: var(--p-yellow-200);
  color: var(--p-yellow-900);
}
</style>
