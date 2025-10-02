<template>
  <DataTable :value="mappedRequests" resizableColumns columnResizeMode="expand" showGridlines>
    <Column field="id" header="ID"></Column>
    <Column field="status" :header="$t('status')"></Column>
    <Column field="userId" header="userId"></Column>
    <Column field="username" :header="$t('username')"></Column>
    <Column field="firstName" :header="$t('firstName')"></Column>
    <Column field="lastName" :header="$t('lastName')"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="phone" :header="$t('phone')"></Column>
    <Column field="age" :header="$t('age')"></Column>
    <Column field="city" :header="$t('city')"></Column>
    <Column field="travelExperience" :header="$t('travelExperience')"></Column>
    <Column field="writingReviewsExperience" :header="$t('reviewWritingExperience')"></Column>
    <Column field="reason" :header="$t('reason')"></Column>
    <Column field="travelAccessibilityPreferences" :header="$t('travelAccessibility')"></Column>
    <Column field="preferredDirections" :header="$t('preferredDirections')"></Column>
    <Column field="agreeWithRules" :header="$t('agreeWithRules')"></Column>

    <Column>
      <template #body="{ data }">
        <div class="actions">
          <Button v-tooltip.bottom="$t('accept')" icon="pi pi-check" @click="accepted(data.id)" />
          <Button
            v-tooltip.bottom="$t('reject')"
            icon="pi pi-times"
            @click="rejected(data.id)"
            severity="danger"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { useNotifications } from '../../composables/useNotifications.ts';
import type { RequestForm } from '../../types.ts';
import { computed, onMounted, ref } from 'vue';
import { API } from '../../constants.ts';
import { apiRequest } from '../../api/request.ts';

const { errorNotify, successNotify } = useNotifications();

const requests = ref<RequestForm[]>([]);

const mappedRequests = computed(() =>
  requests.value.map(request => ({
    id: request.id,
    status: request.status,
    userId: request.user.userId,
    username: request.user.username,
    firstName: request.user.firstName,
    lastName: request.user.lastName,
    email: request.user.email,
    phone: request.user.phone,
    age: request.user.age,
    city: request.user.city,
    travelExperience: request.experience.travel,
    writingReviewsExperience: request.experience.writingReviews,
    reason: request.experience.reason,
    travelAccessibilityPreferences: request.preferences.travelAccessibility,
    preferredDirections: request.preferences.preferredDirections,
    agreeWithRules: request.agreeWithRules ? 'Согласен' : 'Не согласен',
  })),
);

async function accepted(requestId: number) {
  const response = await apiRequest<{ requestId: number }>(API.RequestAccepted, {
    method: 'POST',
    body: {
      requestId,
    },
  });

  if (response.success) {
    successNotify(response.message);
    window.location.reload();
  }
}

function rejected(requestId: number) {
  console.log(requestId);
}

async function fetchRequests() {
  try {
    requests.value = await apiRequest<RequestForm[]>(API.Requests, { method: 'GET' }).then(
      data => data.data,
    );
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  await fetchRequests();
});
</script>

<style scoped>
.actions {
  display: flex;
  align-items: center;
  gap: var(--spacer-d);
}
</style>
