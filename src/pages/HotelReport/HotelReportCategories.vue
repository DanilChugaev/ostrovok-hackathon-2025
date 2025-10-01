<template>
  <div class="hotel-report">
    <h1>Подкатегории этапа</h1>

    <!--    список отчетов -->
    <!--    <info-card-list :items="categories">-->
    <!--      <template #default="{ item }: { item: Review }">-->
    <!--        <div class="hotel-report__item">-->
    <!--          <div class="hotel-report__title-container">-->
    <!--            <i :class="item.icon"></i>-->

    <!--            <h3>{{ item.name }}</h3>-->
    <!--          </div>-->

    <!--          <p>"{{ item.text }}"</p>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </info-card-list>-->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.hotel-report {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}
</style>
