<template>
  <header class="layout-header">
    <div class="container">
      <Menubar :model="navigationFiltered" class="container">
        <template #start>
          <router-link to="/" class="layout-header__title">{{ $t('secretGuest') }}</router-link>
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
            <language-switcher />

            <theme-switcher />

            <Button
              v-tooltip.bottom="loginButtonTooltip"
              :icon="loginButtonIcon"
              @click="onLoginButtonClick"
            />

            <Button
              v-if="isAuth"
              v-tooltip.bottom="$t('logout')"
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
import LanguageSwitcher from '../LanguageSwitcher.vue';
import { useLocale } from '../../composables/useLocale.ts';

const { isAuth, user, isAdmin, isUser, isSecretGuest, isHotel } = useUser();
const router = useRouter();
const { t } = useLocale();

const navigation = ref<HeaderNavigation[]>([
  {
    label: t('home'),
    icon: 'pi pi-home',
    route: PAGES.Main,
    permissions: ['user', 'secret_guest', 'admin', 'hotel'],
  },
  {
    label: t('submitRequest'),
    icon: 'pi pi-file',
    route: PAGES.SubmitRequest,
    permissions: [],
  },
  {
    label: t('personalAccount'),
    icon: 'pi pi-user',
    route: PAGES.Profile,
    permissions: ['user', 'secret_guest'],
  },
  {
    label: t('adminPanel'),
    icon: 'pi pi-wrench',
    route: PAGES.Admin,
    permissions: ['admin'],
  },
  {
    label: t('hotels'),
    icon: 'pi pi-building',
    route: PAGES.Admin,
    permissions: ['hotel'],
  },
  {
    label: t('selectAHotel'),
    icon: 'pi pi-building',
    route: PAGES.Hotels,
    permissions: ['user', 'secret_guest'],
  },
]);

const loginButtonTooltip = computed(() => (isAuth.value ? t('profile') : t('login')));
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
  if (isUser.value || isSecretGuest.value) {
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
