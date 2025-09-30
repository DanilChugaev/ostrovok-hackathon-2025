<template>
  <Select
    v-model="locale"
    :options="LOCALES"
    class="language-switcher"
    variant="filled"
    @change="changeLanguage"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';
import { LOCALES, STORAGE_LANGUAGE_KEY } from '../constants.ts';

const { locale } = useI18n();
const storedLocale = useStorage(STORAGE_LANGUAGE_KEY, locale.value);

function changeLanguage() {
  storedLocale.value = locale.value;
  window.location.reload();
}
</script>
