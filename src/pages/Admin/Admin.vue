<template>
  <div class="admin">
    <h1>{{ $t('systemControlPanel') }}</h1>

    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ $t('requestsForParticipation') }}</Tab>
        <Tab value="1">{{ $t('reportsList') }}</Tab>
        <Tab value="2">{{ $t('hotelsList') }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <requests />
        </TabPanel>

        <TabPanel value="1">
          <reports-list />
        </TabPanel>

        <TabPanel value="2">
          <hotels-list />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '../../composables/useUser.ts';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { PAGES } from '../../constants.ts';
import Requests from './requests.vue';
import ReportsList from './reports-list.vue';
import HotelsList from './hotels-list.vue';

const { isAuth, isAdmin } = useUser();
const router = useRouter();

onBeforeMount(() => {
  if (!isAuth.value || !isAdmin.value) {
    router.push(PAGES.Main);
  }
});
</script>

<style scoped>
.admin {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-e);
}
</style>
