<template>
  <greetings-section class="main__greetings" />

  <advantages-section class="main__advantages" />

  <how-does-this-work-section class="main__how-does-this-work" />

  <reviews-section class="main__reviews-section" />
</template>

<script setup lang="ts">
import GreetingsSection from './greetings-section.vue';
import AdvantagesSection from './advantages-section.vue';
import HowDoesThisWorkSection from './how-does-this-work-section.vue';
import ReviewsSection from './reviews-section.vue';
</script>

<style scoped>
.main__greetings,
.main__advantages,
.main__how-does-this-work,
.main__reviews-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
