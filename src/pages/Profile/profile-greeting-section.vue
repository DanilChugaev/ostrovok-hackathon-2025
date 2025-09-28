<template>
  <section class="profile-greeting-section">
    <div>
      <h1 class="profile-greeting-section__title">Личный кабинет</h1>
      <p class="profile-greeting-section__greeting">Добро пожаловать, {{ fullUserName }}</p>
    </div>

    <Button label="Выбрать новый отель" @click="selectNewHotel" />
  </section>
</template>

<script setup lang="ts">
import { useUser } from '../../composables/useUser.ts';
import { useRouter } from 'vue-router';
import { PAGES } from '../../constants.ts';

const { fullUserName } = useUser();
const router = useRouter();

function selectNewHotel() {
  router.push(PAGES.Hotels);
}
</script>

<style scoped>
.profile-greeting-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding-top: var(--spacer-e);
  padding-bottom: var(--spacer-e);
  gap: var(--spacer-d);
}

.profile-greeting-section__title {
  text-align: start;
  font-size: 2.5rem;
  margin-bottom: var(--spacer-b);
}

.profile-greeting-section__greeting {
  text-align: left;
  color: var(--p-button-text-secondary-color);
}

@media (max-width: 599px) {
  .profile-greeting-section {
    flex-direction: column;
  }
  .profile-greeting-section__greeting {
    text-align: center;
  }
}
</style>
