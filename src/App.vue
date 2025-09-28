<template>
  <layout-header />

  <main class="container">
    <RouterView />
  </main>

  <layout-footer />

  <Toast position="bottom-center" />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import LayoutHeader from './components/layout/Header.vue';
import LayoutFooter from './components/layout/Footer.vue';
</script>
