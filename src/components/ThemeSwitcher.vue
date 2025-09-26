<template>
  <ToggleButton
    v-model="isDark"
    class="theme-switcher"
    on-icon="pi pi-moon"
    off-icon="pi pi-sun"
    @update:model-value="toggleTheme"
  />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { DARK_MODE_CLASS, STORAGE_MODE_KEY } from '../constants';

const currentTheme = inject('currentTheme');

const isDark = ref(currentTheme === 'dark');

function toggleTheme() {
  const newTheme = isDark.value ? 'dark' : 'light';

  if (newTheme === 'dark') {
    document.documentElement.classList.add(DARK_MODE_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_MODE_CLASS);
  }

  localStorage.setItem(STORAGE_MODE_KEY, newTheme);
}
</script>

<style>
.theme-switcher {
  width: 44px;
  height: 44px;
  padding: 0 !important;
}
.theme-switcher .p-togglebutton-label {
  display: none;
}
</style>
