<template>
  <footer class="layout-footer">
    <div class="container">
      <div class="layout-footer__column-container">
        <div class="layout-footer__column">
          <h2 class="layout-footer__title">{{ $t('secretGuest') }}</h2>
          <p class="layout-footer__description">
            {{ $t('aProgramToImproveHotelQualityAndIncreaseUserTrustInReviews') }}
          </p>
        </div>

        <div class="layout-footer__column">
          <h2 class="layout-footer__title">{{ $t('links') }}</h2>

          <ul class="layout-footer__list">
            <li class="layout-footer__item">
              <router-link :to="PAGES.Main" class="layout-footer_link">
                {{ $t('home') }}
              </router-link>
            </li>
            <li class="layout-footer__item">
              <router-link :to="PAGES.SubmitRequest" class="layout-footer_link">
                {{ $t('becomeAGuest') }}
              </router-link>
            </li>
            <li class="layout-footer__item">
              <a class="layout-footer_link" @click="scrollToElement">{{ $t('aboutProgram') }}</a>
            </li>
          </ul>
        </div>

        <div class="layout-footer__column">
          <h2 class="layout-footer__title">{{ $t('contacts') }}</h2>

          <div>
            <p class="layout-footer__description">
              {{ $t('ifYouHaveAnyQuestionsPleaseContactUsByEmail') }}
            </p>
            <a href="mailto:secretguest@ostrovok.ru" target="_blank" class="layout-footer_link">
              secretguest@ostrovok.ru
            </a>
          </div>
        </div>
      </div>

      <div class="layout-footer__copyright">{{ $t('allRightsReserved') }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PAGES } from '../../constants.ts';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

function scrollToElement() {
  if (route.path === PAGES.Main) {
    document.getElementById('advantages')?.scrollIntoView({ behavior: 'smooth' });
  } else {
    router.push(`${PAGES.Main}#advantages`);
  }
}
</script>

<style scoped>
.layout-footer {
  align-content: end;
  background-color: var(--p-menubar-background);
  margin-top: auto;
}

.layout-footer .container {
  display: flex;
  flex-direction: column;
  padding-top: var(--spacer-e);
  padding-bottom: var(--spacer-e);
  gap: var(--spacer-f);
}

.layout-footer__title {
  margin: 0;
  font-size: 1rem;
  margin-bottom: var(--spacer-e);
}

.layout-footer__copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.layout-footer__description,
.layout-footer_link {
  text-align: start;
  font-size: 0.8rem;
}

.layout-footer_link {
  cursor: pointer;
  text-decoration: none;
  color: var(--p-primary-color);
}

.layout-footer_link:hover {
  text-decoration: underline;
}

.layout-footer__column-container {
  display: flex;
  gap: var(--spacer-f);
}

.layout-footer__column {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
}

.layout-footer__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-d);
}

.layout-footer__item {
  display: flex;
}

@media (max-width: 991px) {
  .layout-footer__title {
    margin-bottom: var(--spacer-c);
  }
  .layout-footer__column-container {
    flex-direction: column;
    gap: var(--spacer-e);
  }
  .layout-footer .container {
    gap: var(--spacer-e);
  }
}
</style>
