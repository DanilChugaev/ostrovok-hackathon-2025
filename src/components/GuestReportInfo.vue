<template>
  <div class="guest-report-info">
    <b class="guest-report-info__title">{{ $t('guestsOverallReview') }}</b>

    <div class="guest-report-info__text-container">
      <div class="guest-report-info__comment">"{{ comment }}"</div>

      <div class="guest-report-info__footer">
        <span>{{ $t('user') }} #{{ userId }}</span>
        <span>{{ $t('published') }} #{{ createdDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  comment: string;
  userId: number;
  createdDate: string;
}>();
</script>

<style scoped>
.guest-report-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}

.guest-report-info__text-container {
  display: flex;
  flex-direction: column;
  padding: var(--spacer-de);
  background-color: var(--p-menubar-background);
  border-radius: var(--p-border-radius-lg);
  gap: var(--spacer-d);
}

.guest-report-info__comment {
  font-style: italic;
}

.guest-report-info__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}
</style>
