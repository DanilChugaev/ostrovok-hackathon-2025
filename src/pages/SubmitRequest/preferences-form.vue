<template>
  <Form
    v-slot="$form"
    class="submit-request-form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onValidateForm"
  >
    <h2 class="submit-request-form__title">{{ $t('preferencesAndAvailability') }}</h2>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="travelAccessibility">{{ $t('yourTravelAvailability') }}</label>

        <Select
          :options="mappedAccessibilityListForTravel"
          label-id="travelAccessibility"
          name="travelAccessibility"
          :placeholder="$t('selectAnOption')"
        />

        <Message
          v-if="$form.travelAccessibility?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.travelAccessibility.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="preferredDirections">{{ $t('preferredDestinations') }}</label>

        <Textarea
          id="preferredDirections"
          fluid
          name="preferredDirections"
          autoResize
          rows="5"
          :placeholder="$t('indicateTheCitiesOrCountriesYouAreInterestedInVisiting')"
        />

        <Message
          v-if="$form.preferredDirections?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.preferredDirections.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <div class="checkbox-container">
          <Checkbox inputId="agreeWithRules" name="agreeWithRules" binary />

          <div>
            <label class="checkbox-container__label" for="agreeWithRules">{{
              $t('iAgreeToTheTermsOfTheSecretGuestProgram')
            }}</label>

            <p class="checkbox-container__description">
              {{ $t('iCommitToProvidingHonestAndObjectiveHotelReviews') }}
            </p>
          </div>
        </div>

        <Message
          v-if="$form.agreeWithRules?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.agreeWithRules.error?.message }}
        </Message>
      </div>
    </div>

    <div class="form-actions">
      <Button :label="$t('back')" outlined icon="pi pi-arrow-left" @click="$emit('back')" />
      <Button
        class="form-actions__next-button"
        :label="$t('submitApplication')"
        iconPos="right"
        type="submit"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { apiRequest } from '../../api/request.ts';
import { computed, onMounted, ref } from 'vue';
import type { AccessibilityItemForTravel, RequestForm } from '../../types.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { API } from '../../constants.ts';
import { useAppForm } from '../../composables/useAppForm.ts';
import { useLocale } from '../../composables/useLocale.ts';

type PreferencesRequestForm = RequestForm['preferences'] & Pick<RequestForm, 'agreeWithRules'>;

const preferencesModel = defineModel<RequestForm['preferences']>('preferences');
const agreeWithRulesModel = defineModel<RequestForm['agreeWithRules']>('agreeWithRules');

const emit = defineEmits<{
  back: [];
  'send-request-form': [];
}>();

const { errorNotify } = useNotifications();
const { descriptionValidation, booleanValidation, travelAccessibilityValidation } = useAppForm();
const { localeKey } = useLocale();

const initialValues = ref<PreferencesRequestForm>({
  travelAccessibility: '',
  preferredDirections: '',
  agreeWithRules: false,
});

const resolver = ref(
  zodResolver(
    z.object({
      travelAccessibility: travelAccessibilityValidation(),
      preferredDirections: descriptionValidation(),
      agreeWithRules: booleanValidation(),
    }),
  ),
);

const accessibilityListForTravel = ref<AccessibilityItemForTravel[]>([]);

const mappedAccessibilityListForTravel = computed(() =>
  accessibilityListForTravel.value.map(item => item.name[localeKey.value]),
);

function onValidateForm({ valid, values }: FormSubmitEvent<Record<string, any>>) {
  if (valid) {
    const typedValues = values as unknown as PreferencesRequestForm;

    preferencesModel.value!.travelAccessibility = typedValues.travelAccessibility;
    preferencesModel.value!.preferredDirections = typedValues.preferredDirections;
    agreeWithRulesModel.value = typedValues.agreeWithRules;
    emit('send-request-form');
  }
}

// accessibility for travel
async function fetchAccessibilityListForTravel() {
  try {
    accessibilityListForTravel.value = await apiRequest<AccessibilityItemForTravel[]>(
      API.AccessibilityListForTravel,
      {
        method: 'GET',
      },
    ).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  await fetchAccessibilityListForTravel();
});
</script>

<style>
.checkbox-container {
  display: flex;
  gap: var(--spacer-d);
}

.checkbox-container__label {
  cursor: pointer;
}

.checkbox-container__description {
  text-align: start;
  font-size: 0.8rem;
  margin-top: var(--spacer-b);
  color: var(--p-button-text-secondary-color);
}
</style>
