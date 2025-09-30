<template>
  <section class="are-you-ready">
    <h2 class="are-you-ready__title">{{ $t('readyToBecomeASecretGuest') }}</h2>

    <p class="are-you-ready__description">
      {{ $t('joinTheProgramNowAndGainAccessToExclusiveHotelOffers') }}
    </p>

    <div class="are-you-ready__actions">
      <Button :label="$t('submitRequest')" icon="pi pi-file" @click="submitRequest" />
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
  margin-bottom: var(--spacer-f);
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
