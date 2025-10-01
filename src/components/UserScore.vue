<template>
  <div class="user-score">
    <i class="pi pi-trophy"></i>
    <span>{{ scoreLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from '../composables/useLocale.ts';

const props = defineProps<{
  score?: number;
}>();

const { t } = useLocale();

const scoreLabel = computed(() => `${props.score ?? 0} ${t('score')}`);
</script>

<style scoped>
.user-score {
  display: flex;
  align-items: baseline;
  gap: var(--spacer-c);
}

.user-score .pi {
  color: var(--p-yellow-500);
}
</style>
