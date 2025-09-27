<template>
  <greetings-section class="main-section" />

  <advantages-section class="main-section" />

  <how-does-this-work-section class="main-section" />

  <reviews-section class="main-section" />

  <are-you-ready-section class="main-section" />
</template>

<script setup lang="ts">
import GreetingsSection from './greetings-section.vue';
import AdvantagesSection from './advantages-section.vue';
import HowDoesThisWorkSection from './how-does-this-work-section.vue';
import ReviewsSection from './reviews-section.vue';
import AreYouReadySection from './are-you-ready-section.vue';
</script>

<style scoped>
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
