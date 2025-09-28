<template>
  <header class="layout-header">
    <div class="container">
      <Menubar :model="navigationFiltered" class="container">
        <template #start>
          <router-link to="/" class="layout-header__title"> Секретный гость </router-link>
        </template>

        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
        </template>

        <template #end>
          <div class="layout-header__actions">
            <theme-switcher />

            <Button
              v-tooltip.bottom="loginButtonTooltip"
              :icon="loginButtonIcon"
              @click="onLoginButtonClick"
            />
            <Button
              v-if="isAuth"
              v-tooltip.bottom="'Выйти'"
              icon="pi pi-sign-out"
              @click="onLogoutButtonClick"
            />
          </div>
        </template>
      </Menubar>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ThemeSwitcher from '../ThemeSwitcher.vue';
import { PAGES } from '../../constants.ts';
import { useUser } from '../../composables/useUser.ts';
import { useRouter } from 'vue-router';
import type { HeaderNavigation } from '../../types.ts';

const { isAuth, user, isAdmin, isUser, isHotel } = useUser();
const router = useRouter();

const navigation = ref<HeaderNavigation[]>([
  {
    label: 'Главная',
    icon: 'pi pi-home',
    route: PAGES.Main,
    permissions: ['user', 'admin', 'hotel'],
  },
  {
    label: 'Подать заявку',
    icon: 'pi pi-file',
    route: PAGES.SubmitRequest,
    permissions: [],
  },
  {
    label: 'Личный кабинет',
    icon: 'pi pi-file',
    route: PAGES.Profile,
    permissions: ['user'],
  },
  {
    label: 'Админ панель',
    icon: 'pi pi-file',
    route: PAGES.Admin,
    permissions: ['admin'],
  },
  {
    label: 'Выбрать отель',
    icon: 'pi pi-file',
    route: PAGES.Hotels,
    permissions: ['user'],
  },
]);

const loginButtonTooltip = computed(() => (isAuth.value ? 'Профиль' : 'Войти'));
const loginButtonIcon = computed(() => (isAuth.value ? 'pi pi-user' : 'pi pi-sign-in'));
const navigationFiltered = computed(() => {
  return navigation.value.filter(item => {
    if (isAuth.value) {
      return item.permissions.includes(user.value!.role);
    }

    if (item.permissions?.length === 0) return true;
  });
});

function onLoginButtonClick() {
  if (isUser.value) {
    router.push(PAGES.Profile);
  }

  if (isAdmin.value) {
    router.push(PAGES.Admin);
  }

  if (isHotel.value) {
    router.push(PAGES.HotelAccount);
  }

  router.push(PAGES.Login);
}

function onLogoutButtonClick() {
  user.value = null;

  router.push(PAGES.Main);
}
</script>

<style scoped>
.layout-header {
  background-color: var(--p-menubar-background);
}

.layout-header:deep(.p-menubar-button) {
  order: 1;
}

.layout-header:deep(.p-menubar-start) {
  margin-right: auto;
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
