<template>
  <header class="layout-header">
    <div class="container">
      <router-link to="/" class="layout-header__title"> Секретный гость </router-link>

      <Menubar :model="items">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
        </template>
      </Menubar>

      <div class="layout-header__actions">
        <theme-switcher />
        <Button>Профиль</Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from '../ThemeSwitcher.vue';
import { ref } from 'vue';
import { PAGES } from '../../constants.ts';

const items = ref([
  {
    label: 'Главная',
    icon: 'pi pi-home',
    route: PAGES.Main,
  },
  {
    label: 'Подать заявку',
    icon: 'pi pi-file',
    route: PAGES.SubmitRequest,
  },
]);
</script>

<style scoped>
.layout-header {
  background-color: var(--p-menubar-background);
}

.layout-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout-header__title {
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: var(--p-primary-color);
}

.layout-header__actions {
  display: flex;
  gap: var(--spacer-c);
}
</style>
