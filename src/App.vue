<template>
  <layout-header />

  <main class="container">
    <RouterView />
  </main>

  <Toast position="bottom-center" />
</template>

<script setup lang="ts">
import LayoutHeader from './components/layout/Header.vue';
</script>
