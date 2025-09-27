<template>
  <layout-header />

  <main class="container">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import LayoutHeader from './components/layout/Header.vue';
</script>
