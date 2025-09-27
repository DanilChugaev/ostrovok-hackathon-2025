<template>
  <Form>
    <div class="form-actions">
      <Button label="Назад" severity="secondary" icon="pi pi-arrow-left" @click="$emit('back')" />
      <Button
        class="form-actions__next-button"
        label="Далее"
        icon="pi pi-arrow-right"
        iconPos="right"
        type="submit"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms';
</script>

<style scoped></style>
