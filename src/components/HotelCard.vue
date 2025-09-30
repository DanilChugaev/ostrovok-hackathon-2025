<template>
  <div class="hotel-card">
    <div class="hotel-card__score">
      <i v-for="i in hotel.category" :key="i" class="pi pi-star-fill"></i>
    </div>

    <Image
      class="hotel-card__image"
      preview
      width="400"
      :src="hotel.photo"
      :alt="`${$t('hotelPhoto')} ${hotel.name}`"
    />

    <div class="hotel-card__info">
      <div class="hotel-card__header">
        <div>
          <div class="hotel-card__name">{{ hotel.name }}</div>
          <div class="hotel-card__location">
            <i class="pi pi-map-marker"></i>
            <div>{{ location }}</div>
          </div>
        </div>

        <slot name="badge">
          <div class="hotel-card__price">
            {{ price }}
          </div>
        </slot>
      </div>

      <p class="hotel-card__description">{{ hotel.description }}</p>

      <slot name="dates">
        <div class="hotel-card__dates">
          <b>{{ $t('availableDates') }}</b>

          <div class="hotel-card__dates-list">
            <span v-for="date in hotel.availableDates" :key="date" class="hotel-card__date">
              {{ date }}
            </span>
          </div>
        </div>
      </slot>

      <div class="hotel-card__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '../types.ts';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  hotel: Hotel;
}>();

const { t } = useI18n();

const location = computed(() => `${props.hotel.city}, ${props.hotel.address}`);
const price = computed(
  () => `${props.hotel.pricePerNight} ${props.hotel.currency} / ${t('night')}`,
);
</script>

<style scoped>
.hotel-card {
  display: flex;
  background-color: var(--p-menubar-background);
  border-radius: var(--p-border-radius-lg);
  overflow: hidden;
  position: relative;
}

.hotel-card:deep(.p-image img) {
  display: flex;
  object-fit: cover;
}

.hotel-card__score {
  display: flex;
  padding: var(--spacer-b) var(--spacer-c);
  gap: var(--spacer-a);
  background-color: var(--p-menubar-background);
  border-radius: 1rem;
  position: absolute;
  top: var(--spacer-b);
  left: var(--spacer-b);
  z-index: 1;
}

.hotel-card__score .pi {
  color: var(--p-yellow-500);
}

.hotel-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
  width: 100%;
  padding: var(--spacer-d) var(--spacer-de);
}

.hotel-card__name {
  font-weight: 700;
}

.hotel-card__location {
  display: flex;
  align-items: center;
  gap: var(--spacer-b);
  margin-top: var(--spacer-b);
}

.hotel-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.hotel-card__location,
.hotel-card__description,
.hotel-card__price {
  font-size: 0.8rem;
  color: var(--p-button-text-secondary-color);
}

.hotel-card__description {
  text-align: start;
}

.hotel-card__dates {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  gap: var(--spacer-b);
}

.hotel-card__dates-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacer-b);
  font-size: 0.7rem;
}

.hotel-card__date {
  background-color: var(--p-avatar-background);
  padding: var(--spacer-a) var(--spacer-c);
  border-radius: var(--p-border-radius-lg);
}

.hotel-card__actions {
  margin-top: var(--spacer-e);
}

@media (max-width: 799px) {
  .hotel-card:deep(.p-image img) {
    width: 300px;
  }
}

@media (max-width: 699px) {
  .hotel-card:deep(.p-image img) {
    width: 250px;
  }
}

@media (max-width: 599px) {
  .hotel-card {
    flex-direction: column;
  }

  .hotel-card__info {
    padding: var(--spacer-d);
  }

  .hotel-card__actions {
    display: flex;
    justify-content: flex-end;
    margin: 0;
  }

  .hotel-card:deep(.p-image img) {
    width: 100%;
  }
}
</style>
