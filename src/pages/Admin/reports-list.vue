<template>
  <DataTable :value="reports" resizableColumns columnResizeMode="expand" showGridlines>
    <Column field="status" :header="$t('reportStatus')">
      <template #body="{ data }">
        {{ data.totalScore ? $t('completed') : $t('inProgress') }}
      </template>
    </Column>

    <Column field="createdDate" :header="$t('createdDate')"></Column>

    <Column field="trip" :header="$t('hotel')">
      <template #body="{ data }">
        {{ data.trip?.hotel?.name[localeKey] }}
      </template>
    </Column>

    <Column field="comment" :header="$t('comment')">
      <template #body="{ data }">
        <Button
          v-if="data.comment"
          icon="pi pi-info-circle"
          size="small"
          rounded
          variant="text"
          @click="toggle($event, data.comment)"
        />
      </template>
    </Column>

    <Column field="progress" :header="$t('progress')"></Column>

    <Column field="totalScore" :header="$t('totalScore')"></Column>

    <Column>
      <template #body="{ data }">
        <Button
          class="hotel-reports__button"
          icon="pi pi-angle-right"
          icon-pos="right"
          size="small"
          :label="$t('show')"
          @click="goToHotelReportPage(data.id)"
        />
      </template>
    </Column>
  </DataTable>

  <Popover ref="popover">{{ selectedComment }}</Popover>
</template>

<script setup lang="ts">
import { apiRequest } from '../../api/request.ts';
import type { HotelReportResponse } from '../../types.ts';
import { API } from '../../constants.ts';
import { onMounted, ref } from 'vue';
import { useNotifications } from '../../composables/useNotifications.ts';
import { useLocale } from '../../composables/useLocale.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';

const { errorNotify } = useNotifications();
const { localeKey } = useLocale();
const { goToHotelReportPage } = useHotelReports();

const reports = ref<HotelReportResponse[]>([]);
const selectedComment = ref<string>('');
const popover = ref();

async function fetchHotelReports() {
  try {
    reports.value = await apiRequest<HotelReportResponse[]>(`${API.AdminHotelReports}`, {
      method: 'GET',
    }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

function toggle(event: any, comment: string) {
  popover.value.toggle(event);
  selectedComment.value = comment;
}

onMounted(async () => {
  await fetchHotelReports();
});
</script>

<style scoped></style>
