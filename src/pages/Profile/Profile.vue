<template>
  <profile-greeting-section class="profile-greeting" />

  <profile-info-section class="profile-info" :loyalty />

  <section class="profile-tabs">
    <Tabs :value="PROFILE_TABS.Trips">
      <TabList>
        <Tab :value="PROFILE_TABS.Trips">{{ $t('trips') }}</Tab>
        <Tab :value="PROFILE_TABS.Awards">{{ $t('awards') }}</Tab>
      </TabList>

      <TabPanels>
        <TabPanel :value="PROFILE_TABS.Trips">
          <profile-summary :trips :reports />

          <profile-trips :trips :reports />
        </TabPanel>

        <TabPanel :value="PROFILE_TABS.Awards">
          <profile-awards :loyalty />
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
import type { HotelReportResponse, LoyaltyBase, Trip } from '../../types.ts';
import ProfileSummary from './profile-summary.vue';
import { useTrips } from '../../composables/useTrips.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import { apiRequest } from '../../api/request.ts';
import { useNotifications } from '../../composables/useNotifications.ts';

const { isAuth, isAdmin, isHotel, user } = useUser();
const router = useRouter();
const { fetchTrips } = useTrips();
const { fetchHotelReports } = useHotelReports();
const { errorNotify } = useNotifications();

const trips = ref<Trip[]>([]);
const reports = ref<HotelReportResponse[]>([]);
const loyalty = ref<LoyaltyBase[]>([]);

async function fetchLoyalty() {
  try {
    loyalty.value = await apiRequest<LoyaltyBase[]>(API.Loyalty, { method: 'GET' }).then(
      data => data.data,
    );
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
  trips.value = await fetchTrips(user.value!.id);
  reports.value = await fetchHotelReports(user.value!.id);
  await fetchLoyalty();
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
