<template>
  <div class="progress">
    <div class="progress__text">
      <span>{{ title }}</span>

      <span>{{ info }}</span>
    </div>

    <ProgressBar :value="percent"><span></span></ProgressBar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  percent: number;
  customInfo?: string;
}>();

const info = computed(() => props.customInfo || `${props.percent}%`);
</script>

<style scoped>
.progress {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-c);
}

.progress__text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}
</style>
