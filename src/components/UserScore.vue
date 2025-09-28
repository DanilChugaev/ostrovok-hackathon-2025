<template>
  <div class="user-score">
    <i class="pi pi-star"></i>
    <span>{{ scoreLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  score?: number;
}>();

const scoreLabel = computed(() => `${props.score ?? 0} баллов`);
</script>

<style scoped>
.user-score {
  display: flex;
  align-items: baseline;
  gap: var(--spacer-c);
}

.user-score .pi-star {
  color: var(--p-yellow-500);
}
</style>
