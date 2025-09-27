<template>
  <Form>
    <div class="form-actions">
      <Button label="Назад" severity="secondary" icon="pi pi-arrow-left" @click="$emit('back')" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms';
</script>

<style scoped></style>
