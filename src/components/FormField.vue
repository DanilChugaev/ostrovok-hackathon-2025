<template>
  <div class="form-field">
    <label :for="fieldId">{{ label }}</label>

    <slot />

    <Message v-if="fieldState?.invalid" severity="error" size="small" variant="simple">
      {{ fieldState.error?.message }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import type { FormFieldState } from '@primevue/forms';

defineProps<{
  fieldState?: FormFieldState;
  label: string;
  fieldId: string;
}>();
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-b);
}
</style>
