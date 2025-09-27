<template>
  <section id="how-does-this-work" class="how-does-this-work">
    <h2>Как это работает</h2>

    <ul class="how-does-this-work__list">
      <li v-for="item in processList" :key="item.id" class="how-does-this-work__item">
        <span class="how-does-this-work__counter">{{ item.id }}</span>

        <div class="how-does-this-work__info">
          <h3 class="how-does-this-work__title">{{ item.title }}</h3>

          <p class="how-does-this-work__description">{{ item.description }}</p>
        </div>
      </li>
    </ul>

    <Button
      class="how-does-this-work__button"
      label="Стать секретным гостем"
      icon="pi pi-user"
      @click="submitRequest"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { PAGES } from '../../constants.ts';

const router = useRouter();

const processList = ref([
  {
    id: 1,
    title: 'Подайте заявку',
    description:
      'Заполните анкету, указав свой опыт путешествий и почему вы хотите стать секретным гостем.',
  },
  {
    id: 2,
    title: 'Выберите отель',
    description: 'После одобрения заявки выберите отель из списка доступных вариантов.',
  },
  {
    id: 3,
    title: 'Посетите отель',
    description:
      'Забронируйте и посетите выбранный отель, обращая внимание на все аспекты сервиса и удобства.',
  },
  {
    id: 4,
    title: 'Оставьте отчет',
    description: 'Заполните подробный отчет о своем пребывании, приложив фотографии и комментарии.',
  },
  {
    id: 4,
    title: 'Получите вознаграждение',
    description:
      'После проверки отчета получите компенсацию за проживание или бонусы для следующих поездок.',
  },
]);

function submitRequest() {
  router.push(PAGES.SubmitRequest);
}
</script>

<style scoped>
.how-does-this-work__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-f);
  position: relative;
}

.how-does-this-work__list::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 25px;
  width: 1px;
  z-index: 0;
  background-color: var(--p-primary-color);
}

.how-does-this-work__item {
  display: flex;
  align-items: center;
  gap: var(--spacer-d);
}

.how-does-this-work__title {
  text-align: start;
}

.how-does-this-work__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-c);
}

.how-does-this-work__counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: start;
  border-radius: 50%;
  min-width: 50px;
  min-height: 50px;
  background-color: var(--p-primary-color);
  color: var(--p-button-primary-color);
  box-shadow: var(--box-shadow);
  transition: box-shadow 0.3s;
  z-index: 1;
}

.how-does-this-work__item:hover .how-does-this-work__counter {
  box-shadow: var(--box-shadow-hover);
}

.how-does-this-work__button {
  margin-top: var(--spacer-f);
}

.how-does-this-work__description {
  text-align: start;
}
</style>
