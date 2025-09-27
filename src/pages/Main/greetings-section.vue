<template>
  <section class="main__greetings greetings">
    <h1>Станьте секретным гостем Островка</h1>

    <p class="greetings__description">
      Путешествуйте бесплатно, оценивайте отели и помогайте другим путешественникам делать
      правильный выбор.
    </p>

    <div class="greetings__actions">
      <Button @click="submitRequest" label="Подать заявку" icon="pi pi-file" />
      <Button outlined label="Как это работает" icon="pi pi-question-circle" />
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
.greetings {
  gap: var(--spacer-e);
  padding-top: var(--spacer-g);
  padding-bottom: var(--spacer-g);
}

.greetings__description {
  max-width: 672px;
  color: var(--p-text-color);
}

.greetings__actions {
  display: flex;
  gap: var(--spacer-d);
}
</style>
