<template>
  <div class="submit-request">
    <h1 class="submit-request__title">Заявка на участие в программе<br />"Секретный гость"</h1>

    <div class="submit-request__container">
      <Stepper value="1" linear>
        <StepList>
          <Step value="1">Личные данные</Step>
          <Step value="2">Опыт</Step>
          <Step value="3">Предпочтения</Step>
        </StepList>

        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <user-form v-model="form.user" @next="activateCallback('2')" />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="2">
            <experience-form
              v-model="form.experience"
              @back="activateCallback('1')"
              @next="activateCallback('3')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="3">
            <preferences-form v-model="form.preferences" @back="activateCallback('2')" />
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>

  <pre>{{ form }}</pre>
</template>

<script setup lang="ts">
import ExperienceForm from './experience-form.vue';
import { reactive } from 'vue';
import UserForm from './user-form.vue';
import type { RequestForm } from '../../types.ts';
import PreferencesForm from './preferences-form.vue';

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
</script>

<style>
.submit-request__title {
  margin: var(--spacer-f) 0;
}

.submit-request__container {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}

.form-actions {
  display: flex;
  margin-top: var(--spacer-d);
}

.form-actions__next-button {
  margin-left: auto;
}

.submit-request:deep(.p-steppanel) {
  border-radius: var(--p-border-radius-lg);
}
</style>
