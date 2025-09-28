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
          <profile-summary :trips />

          <profile-trips :trips />
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
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { API, PAGES, PROFILE_TABS } from '../../constants.ts';
import ProfileGreetingSection from './profile-greeting-section.vue';
import ProfileInfoSection from './profile-info-section.vue';
import ProfileTrips from './profile-trips.vue';
import ProfileAwards from './profile-awards.vue';
import type { Trip } from '../../types.ts';
import { apiRequest } from '../../api/request.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import ProfileSummary from './profile-summary.vue';

const { errorNotify } = useNotifications();
const { isAuth, isAdmin, isHotel } = useUser();
const router = useRouter();

const trips = ref<Trip[]>([]);

async function fetchTrips() {
  try {
    trips.value = await apiRequest<Trip[]>(API.Trips, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

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

onMounted(async () => {
  await fetchTrips();
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
  padding: 0;
}
</style>
