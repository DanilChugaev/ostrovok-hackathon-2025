<template>
  <section class="greetings">
    <h1>{{ $t('becomeASecretGuestOfOstrovok') }}</h1>

    <p class="greetings__description">
      {{ $t('travelForFree') }}
    </p>

    <div class="greetings__actions">
      <Button :label="$t('submitRequest')" icon="pi pi-file" @click="submitRequest" />
      <Button
        outlined
        icon="pi pi-question-circle"
        :label="$t('howDoesThisWork')"
        @click="scrollToElement"
      />
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

function scrollToElement() {
  document.getElementById('how-does-this-work')?.scrollIntoView({ behavior: 'smooth' });
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
