<template>
  <section class="are-you-ready">
    <h2 class="are-you-ready__title">Готовы стать секретным гостем?</h2>

    <p class="are-you-ready__description">
      Присоединяйтесь к программе сейчас и получите доступ к эксклюзивным предложениям от отелей.
    </p>

    <div class="are-you-ready__actions">
      <Button @click="submitRequest" label="Подать заявку" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { PAGES } from '../../constants.ts';

const router = useRouter();

function submitRequest() {
  router.push(PAGES.SubmitRequest);
}
</script>

<style scoped>
.are-you-ready {
  gap: var(--spacer-e);
  padding-top: var(--spacer-g);
  padding-bottom: var(--spacer-g);
}

.are-you-ready__title {
  margin: 0;
}

.are-you-ready__description {
  max-width: 672px;
  color: var(--p-text-color);
}

.are-you-ready__actions {
  display: flex;
  gap: var(--spacer-d);
}
</style>
