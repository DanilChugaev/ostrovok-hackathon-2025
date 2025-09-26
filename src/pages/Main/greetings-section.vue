<template>
  <section class="main__greetings greetings">
    <h1 class="greetings__title">Станьте секретным гостем Островка</h1>

    <p class="greetings__description">
      Путешествуйте бесплатно, оценивайте отели и помогайте другим
      путешественникам делать правильный выбор.
    </p>

    <div class="greetings__actions">
      <Button @click="submitRequest">Подать заявку</Button>
      <Button outlined>Как это работает</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function submitRequest() {
  router.push('/submit-request');
}
</script>

<style scoped>
.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-e);
  padding-top: var(--spacer-g);
  padding-bottom: var(--spacer-g);
}

.greetings__title {
  margin: 0;
  font-size: 3rem;
  line-height: 1;
  color: var(--p-text-color);
}

.greetings__description {
  text-align: center;
  margin: 0;
  max-width: 672px;
  color: var(--p-text-color);
}

.greetings__actions {
  display: flex;
  gap: var(--spacer-d);
}
</style>
