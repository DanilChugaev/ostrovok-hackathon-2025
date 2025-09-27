<template>
  <div class="submit-request">
    <h1 class="submit-request__title">Заявка на участие в программе<br />"Секретный гость"</h1>

    <div class="submit-request__container">
      <Stepper :value="SUBMIT_REQUEST_FORM_STAGES.User" linear>
        <StepList>
          <Step :value="SUBMIT_REQUEST_FORM_STAGES.User">Личные данные</Step>
          <Step :value="SUBMIT_REQUEST_FORM_STAGES.Experience">Опыт</Step>
          <Step :value="SUBMIT_REQUEST_FORM_STAGES.Preferences">Предпочтения</Step>
        </StepList>

        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" :value="SUBMIT_REQUEST_FORM_STAGES.User">
            <user-form
              v-model="form.user"
              class="submit-request__form"
              @next="activateCallback(SUBMIT_REQUEST_FORM_STAGES.Experience)"
            />
          </StepPanel>

          <StepPanel
            v-slot="{ activateCallback, active }"
            :value="SUBMIT_REQUEST_FORM_STAGES.Experience"
          >
            <experience-form
              v-if="active"
              v-model="form.experience"
              class="submit-request__form"
              @back="activateCallback(SUBMIT_REQUEST_FORM_STAGES.User)"
              @next="activateCallback(SUBMIT_REQUEST_FORM_STAGES.Preferences)"
            />
          </StepPanel>

          <StepPanel
            v-slot="{ activateCallback, active }"
            :value="SUBMIT_REQUEST_FORM_STAGES.Preferences"
          >
            <preferences-form
              v-if="active"
              v-model:preferences="form.preferences"
              v-model:agree-with-rules="form.agreeWithRules"
              class="submit-request__form"
              @back="activateCallback(SUBMIT_REQUEST_FORM_STAGES.Experience)"
              @send-request-form="sendRequestForm"
            />
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue';
import UserForm from './user-form.vue';
import type { RequestForm, User } from '../../types.ts';
import { API, PAGES, SUBMIT_REQUEST_FORM_STAGES } from '../../constants.ts';
import { apiRequest } from '../../api/request.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import { useRouter } from 'vue-router';

const ExperienceForm = defineAsyncComponent(() => import('./experience-form.vue'));
const PreferencesForm = defineAsyncComponent(() => import('./preferences-form.vue'));

const { errorNotify } = useNotifications();
const router = useRouter();

const form = reactive<RequestForm>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    age: 0,
    city: '',
  },
  experience: {
    travel: '',
    writingReviews: '',
    reason: '',
  },
  preferences: {
    travelAccessibility: '',
    preferredDirections: '',
  },
  agreeWithRules: false,
});

async function sendRequestForm() {
  try {
    const user = await apiRequest<User>(API.SendRequestForm, {
      method: 'POST',
      body: form,
    }).then(data => data.data);

    localStorage.setItem('user', JSON.stringify(user));
    router.push(PAGES.Profile);
  } catch (e: any) {
    errorNotify(e.message);
  }
}
</script>

<style>
.submit-request__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-de);
  padding: var(--spacer-e);
}

.submit-request__title {
  margin: var(--spacer-f) 0;
}

.submit-request__container {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: var(--spacer-f);
}

.form-actions {
  display: flex;
  margin-top: var(--spacer-d);
}

.form-actions__next-button {
  margin-left: auto;
}

.submit-request .p-steppanel {
  border-radius: var(--p-border-radius-lg);
}

.submit-request-form__title {
  margin-bottom: 2rem;
  padding: 0;
}

.submit-request-form__line {
  display: flex;
  justify-content: space-between;
  gap: var(--spacer-d);
}

.submit-request-form__field-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacer-b);
}

.submit-request-form__field-container .p-select {
  width: 100%;
}

@media (max-width: 599px) {
  .submit-request-form__line {
    flex-direction: column;
  }
}
</style>
