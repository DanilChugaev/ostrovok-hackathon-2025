<template>
  <div class="not-found">
    <h1>{{ $t('error404') }}</h1>

    <p>{{ $t('pageNotFound') }}</p>

    <router-link class="not-found__link" :to="PAGES.Main">{{ $t('returnToHomePage') }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { PAGES } from '../constants.ts';
</script>

<style>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--spacer-f) 0;
  gap: var(--spacer-d);
}

.not-found__link {
  text-decoration: none;
  color: var(--p-primary-color);
}

.not-found__link:hover {
  text-decoration: underline;
}
</style>
