<template>
  <section class="reviews">
    <h2>Отзывы участников программы</h2>

    <info-card-list :items="reviews">
      <template #default="{ item }: { item: Review }">
        <div class="reviews__item">
          <div class="reviews__title-container">
            <img class="reviews__img" :src="item.imageUrl" alt="Фото участника" />

            <div class="reviews__title">
              <h3>{{ item.name }}</h3>
              <h4 class="reviews__title--secondary">{{ item.city }}</h4>
            </div>
          </div>

          <p>"{{ item.text }}"</p>
        </div>
      </template>
    </info-card-list>
  </section>
</template>

<script setup lang="ts">
import { apiRequest } from '../../api/request.ts';
import { onMounted, ref } from 'vue';
import type { Review } from '../../types.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import InfoCardList from '../../components/InfoCardList.vue';
import { API } from '../../constants.ts';

const { errorNotify } = useNotifications();

const reviews = ref<Review[]>([]);

async function fetchReviews() {
  try {
    reviews.value = await apiRequest<Review[]>(API.Reviews, { method: 'GET' }).then(
      data => data.data,
    );
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  await fetchReviews();
});
</script>

<style scoped>
.reviews__item,
.reviews__title {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.reviews__item {
  gap: var(--spacer-e);
}

.reviews__title {
  gap: var(--spacer-c);
}

.reviews__title-container {
  display: flex;
  align-items: center;
  gap: var(--spacer-c);
}

.reviews__title .reviews__title--secondary {
  color: var(--p-button-text-secondary-color);
}

.reviews__img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
