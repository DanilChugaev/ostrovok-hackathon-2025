<template>
  <ul class="card-list" :class="`card-list--${gridType}`">
    <li v-for="item in items" :key="item.id" class="card-list__item">
      <slot v-bind:item="item" />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends { id: number | string }">
withDefaults(
  defineProps<{
    items: T[];
    gridType?: 'flex' | 'grid';
  }>(),
  {
    gridType: 'flex',
  },
);
</script>

<style>
.card-list {
  gap: var(--spacer-e);
}

.card-list--flex {
  display: flex;
  justify-content: space-between;
}

.card-list--grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.card-list__item {
  flex: 1;
  padding: var(--spacer-e);
  border: 1px solid var(--border-color);
  border-radius: var(--p-border-radius-lg);
  background-color: var(--p-menubar-background);
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.09);
  transition: box-shadow 0.3s;
}

.card-list__item:hover {
  box-shadow: 0 0.6rem 0.9rem rgba(0, 0, 0, 0.09);
}

@media (max-width: 991px) {
  .card-list {
    flex-direction: column;
  }

  .card-list--grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 699px) {
  .card-list--grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 599px) {
  .card-list--grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
