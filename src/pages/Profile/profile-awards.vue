<template>
  <div class="profile-awards">
    <div>
      <h3 class="profile-awards__title">Ваши награды</h3>
    </div>

    <div>
      <h3 class="profile-awards__title">Доступные награды</h3>

      <info-card-list :items="awards" class="profile-awards__list">
        <template #default="{ item }: { item: Award }">
          <div class="profile-awards__item">
            <i class="profile-awards__icon pi pi-star"></i>

            <b>{{ item.name }}</b>

            <p class="profile-awards__description">{{ item.description }}</p>

            <div class="profile-awards__footer">
              <span>{{ item.price }} баллов</span>

              <Button
                v-tooltip.bottom="getTooltip(item.loyaltyStatuses)"
                :disabled="!checkIsAvailableAwards(item.loyaltyStatuses)"
                label="Обменять"
                @click="onExchangeButtonClick(item)"
              />
            </div>
          </div>
        </template>
      </info-card-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Award, LoyaltyStatus } from '../../types.ts';
import InfoCardList from '../../components/InfoCardList.vue';
import { useNotifications } from '../../composables/useNotifications.ts';
import { onMounted, ref } from 'vue';
import { apiRequest } from '../../api/request.ts';
import { API, LOYALTY_STATUS_MAP } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useConfirm } from 'primevue/useconfirm';

const { errorNotify, successNotify } = useNotifications();
const { user } = useUser();
const confirm = useConfirm();

const awards = ref<Award[]>([]);

async function fetchAwards() {
  try {
    awards.value = await apiRequest<Award[]>(API.Awards, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

function checkIsAvailableAwards(loyaltyStatuses: LoyaltyStatus[]) {
  return loyaltyStatuses.includes(user.value?.loyalty?.status ?? 'bronze');
}

function getTooltip(loyaltyStatuses: LoyaltyStatus[]) {
  const isAvailableAward = checkIsAvailableAwards(loyaltyStatuses);

  if (isAvailableAward) return;

  const neededStatuses = loyaltyStatuses.map(item => LOYALTY_STATUS_MAP[item]).join(', ');

  return `Доступно в статусах: ${neededStatuses}`;
}

function onExchangeButtonClick(award: Award) {
  confirm.require({
    message: `Вы обмениваете ${award.price} баллов на награду: ${award.name}`,
    header: 'Подтвердите обмен',
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Обменять',
    },
    accept: () => {
      successNotify('Вы успешно обменяли баллы, награда уже зачислена на ваш счет');
    },
  });
}

onMounted(async () => {
  await fetchAwards();
});
</script>

<style scoped>
.profile-awards {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
  margin: var(--spacer-e) 0 var(--spacer-f);
}

.profile-awards__title {
  font-size: 1.5rem;
  margin-bottom: var(--spacer-e);
}

.profile-awards__list {
  flex-wrap: wrap;
}

.profile-awards__list:deep(.card-list__item) {
  padding: var(--spacer-d);
  width: 45%;
  flex: auto;
}

.profile-awards__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacer-d);
}

.profile-awards__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-d);
  border-radius: 50%;
  font-size: 1.5rem;
  background-color: var(--p-sky-200);
  color: var(--p-sky-900);
}

.profile-awards__description {
  text-align: start;
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}

.profile-awards__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 991px) {
  .profile-awards__list {
    flex-direction: row;
  }
}

@media (max-width: 599px) {
  .profile-awards__list {
    flex-direction: column;
  }

  .profile-awards__list:deep(.card-list__item) {
    width: 100%;
  }
}
</style>
