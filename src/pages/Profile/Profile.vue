<template>
  <profile-greeting-section class="profile-greeting" />

  <profile-info-section class="profile-info" />

  <section class="profile-tabs">
    <Tabs :value="PROFILE_TABS.Trips">
      <TabList>
        <Tab :value="PROFILE_TABS.Trips">Поездки</Tab>
        <Tab :value="PROFILE_TABS.Awards">Награды</Tab>
      </TabList>

      <TabPanels>
        <TabPanel :value="PROFILE_TABS.Trips">
          <profile-trips />
        </TabPanel>

        <TabPanel :value="PROFILE_TABS.Awards">
          <profile-awards />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
</template>

<script setup lang="ts">
import { useUser } from '../../composables/useUser.ts';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { PAGES, PROFILE_TABS } from '../../constants.ts';
import ProfileGreetingSection from './profile-greeting-section.vue';
import ProfileInfoSection from './profile-info-section.vue';
import ProfileTrips from './profile-trips.vue';
import ProfileAwards from './profile-awards.vue';

const { isAuth, isAdmin, isHotel } = useUser();
const router = useRouter();

onBeforeMount(() => {
  if (!isAuth.value) {
    router.push(PAGES.Login);
  }

  if (isAuth.value) {
    if (isAdmin.value) {
      router.push(PAGES.Admin);
    }

    if (isHotel.value) {
      router.push(PAGES.HotelAccount);
    }
  }
});
</script>

<style scoped>
.profile-greeting {
  margin-bottom: var(--spacer-de);
}

.profile-info {
  margin-bottom: var(--spacer-f);
}

.profile-tabs {
  margin-top: 0;
}

.profile-tabs:deep(.p-tablist),
.profile-tabs:deep(.p-tabpanels) {
  background-color: transparent;
}
</style>
