<template>
  <section class="profile-info-section">
    <div class="profile-info-section__user-container">
      <div class="profile-info-section__user">
        <Avatar :image="userAvatar" icon="pi pi-user" class="mr-2" size="large" shape="circle" />

        <h2 class="profile-info-section__username">{{ fullUserName }}</h2>
      </div>

      <p>{{ user?.email }}</p>

      <div :class="requestStatusClasses">
        <i :class="requestStatusIcon"></i>

        <span>{{ requestStatusText }}</span>
      </div>
    </div>

    <div class="profile-info-section__loyalty-container">
      <div class="profile-info-section__loyalty-score">
        <i class="pi pi-star"></i>
        <span>{{ score }}</span>
      </div>

      <div>{{ loyaltyStatus }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUser } from '../../composables/useUser.ts';
import { LOYALTY_STATUS_MAP } from '../../constants.ts';

const { fullUserName, user } = useUser();

const requestStatusMap = {
  awaiting: {
    icon: 'pi pi-clock',
    text: 'Заявка: На рассмотрении',
  },
  accepted: {
    icon: 'pi pi-check-square',
    text: 'Заявка: Одобрена',
  },
  rejected: {
    icon: 'pi pi-times',
    text: 'Заявка: Отклонена',
  },
};

const userAvatar = computed(() => user.value?.avatar || undefined);
const requestStatusClasses = computed(() => {
  return [
    'profile-info-section__status',
    `profile-info-section__status--${user.value?.status ?? 'awaiting'}`,
  ];
});
const mappedStatusObj = computed(() => requestStatusMap[user.value?.status ?? 'awaiting']);
const requestStatusIcon = computed(() => mappedStatusObj.value.icon);
const requestStatusText = computed(() => mappedStatusObj.value.text);
const score = computed(() => `${user.value?.loyalty?.score ?? 0} баллов`);
const loyaltyStatus = computed(
  () => `Уровень: ${LOYALTY_STATUS_MAP[user.value?.loyalty?.status ?? 'bronze']}`,
);
</script>

<style scoped>
.profile-info-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: var(--spacer-de);
  background-color: var(--p-menubar-background);
  border-radius: var(--p-border-radius-lg);
  gap: var(--spacer-d);
}

.profile-info-section__user-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacer-c);
}

.profile-info-section__user {
  display: flex;
  align-items: center;
  gap: var(--spacer-c);
}

.profile-info-section__username {
  font-size: 1rem;
  margin: 0;
  padding: 0;
}

.profile-info-section__status {
  display: flex;
  align-items: center;
  gap: var(--spacer-c);
  padding: var(--spacer-b) var(--spacer-d);
  border-radius: 1rem;
  font-size: 0.8rem;
  margin-top: var(--spacer-c);
}

.profile-info-section__status--awaiting {
  background-color: var(--p-amber-200);
  color: var(--p-amber-900);
}

.profile-info-section__status--accepted {
  background-color: var(--p-emerald-200);
  color: var(--p-emerald-900);
}

.profile-info-section__status--rejected {
  background-color: var(--p-red-200);
  color: var(--p-red-900);
}

.profile-info-section__loyalty-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacer-c);
  position: relative;
}

.profile-info-section__loyalty-container::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  top: 0;
  left: -1.333rem;
  background-color: var(--p-avatar-background);
}

.profile-info-section__loyalty-score {
  display: flex;
  align-items: baseline;
  gap: var(--spacer-c);
}

.profile-info-section__loyalty-score .pi-star {
  color: var(--p-yellow-500);
}

@media (max-width: 499px) {
  .profile-info-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-info-section__loyalty-container {
    align-items: flex-start;
  }

  .profile-info-section__loyalty-container::before {
    display: none;
  }
}
</style>
