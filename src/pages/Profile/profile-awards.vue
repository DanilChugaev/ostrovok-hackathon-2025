<template>
  <div class="profile-awards">
    <div class="profile-awards__info">
      <div class="profile-awards__info-header">
        <div>
          <h3 class="profile-awards__title">{{ $t('yourRewards') }}</h3>
          <p>{{ $t('currentLevel') }} {{ LOYALTY_STATUS_MAP[userStatus] }}</p>
        </div>

        <user-score :score="score" />
      </div>

      <rating-progress
        :title="$t('progressToTheNextLevel')"
        :percent="scorePercent"
        :custom-info="progressInfo"
      />
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
                v-tooltip.bottom="getTooltip(item)"
                :disabled="
                  !checkIsAvailableAwards(item.loyaltyCodes) || !checkLoyaltyScore(item.price)
                "
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
import type { Award, LoyaltyBase, LoyaltyCode } from '../../types.ts';
import InfoCardList from '../../components/InfoCardList.vue';
import { useNotifications } from '../../composables/useNotifications.ts';
import { computed, onMounted, ref } from 'vue';
import { apiRequest } from '../../api/request.ts';
import { API, LOYALTY_STATUS_MAP } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useConfirm } from 'primevue/useconfirm';
import UserScore from '../../components/UserScore.vue';
import RatingProgress from '../../components/RatingProgress.vue';
import { useLocale } from '../../composables/useLocale.ts';

const { errorNotify, successNotify } = useNotifications();
const { user } = useUser();
const confirm = useConfirm();
const { t } = useLocale();

const awards = ref<Award[]>([]);
const loyalty = ref<LoyaltyBase[]>([]);

const userStatus = computed(() => user.value?.loyalty?.code ?? 'bronze');
const score = computed(() => user.value?.loyalty?.score ?? 0);
const maxScoreInCurrentStatus = computed(
  () => loyalty.value.find(item => item.code === userStatus.value)?.maxScore ?? 0,
);
const scorePercent = computed(() => (score.value / maxScoreInCurrentStatus.value) * 100);
const progressInfo = computed(() => `${score.value} / ${maxScoreInCurrentStatus.value}`);

async function fetchAwards() {
  try {
    awards.value = await apiRequest<Award[]>(API.Awards, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

async function fetchLoyalty() {
  try {
    loyalty.value = await apiRequest<LoyaltyBase[]>(API.Loyalty, { method: 'GET' }).then(
      data => data.data,
    );
  } catch (e: any) {
    errorNotify(e.message);
  }
}

function checkIsAvailableAwards(loyaltyCodes: LoyaltyCode[]) {
  return loyaltyCodes.includes(user.value?.loyalty?.code ?? 'bronze');
}

function checkLoyaltyScore(price: number) {
  return (user.value?.loyalty?.score ?? 0) >= price;
}

function getTooltip(award: Award) {
  const isAvailableAward = checkIsAvailableAwards(award.loyaltyCodes);

  if (isAvailableAward) {
    if (!checkLoyaltyScore(award.price)) {
      return t('notEnoughScore');
    }

    return;
  }

  const neededStatuses = award.loyaltyCodes.map(item => LOYALTY_STATUS_MAP[item]).join(', ');

  return `${t('availableInStatuses')} ${neededStatuses}`;
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
  await fetchLoyalty();
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

.profile-awards__info {
  display: flex;
  flex-direction: column;
  background-color: var(--p-menubar-background);
  border-radius: var(--p-border-radius-lg);
  gap: var(--spacer-d);
  padding: var(--spacer-de);
}

.profile-awards__info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-awards__info-header .profile-awards__title {
  margin-bottom: var(--spacer-c);
  text-align: start;
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
  gap: var(--spacer-c);
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
