<template>
  <Form
    v-slot="$form"
    class="submit-request-form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onValidateForm"
  >
    <h2 class="submit-request-form__title">{{ $t('experienceAndMotivation') }}</h2>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="travel">{{ $t('travelExperience') }}</label>

        <Textarea
          id="travel"
          fluid
          name="travel"
          autoResize
          rows="5"
          :placeholder="$t('describeYourTravelExperience')"
        />

        <Message v-if="$form.travel?.invalid" severity="error" size="small" variant="simple">
          {{ $form.travel.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="writingReviews">{{ $t('reviewWritingExperience') }}</label>

        <Textarea
          id="writingReviews"
          fluid
          name="writingReviews"
          autoResize
          rows="5"
          :placeholder="$t('describeYourExperienceWritingReviewsOfHotelsOrOtherServices')"
        />

        <Message
          v-if="$form.writingReviews?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.writingReviews.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="reason">{{ $t('whyDoYouWantToBecomeASecretGuest') }}</label>

        <Textarea
          id="reason"
          fluid
          name="reason"
          autoResize
          rows="5"
          :placeholder="$t('describeYourMotivationForParticipatingInTheProgram')"
        />

        <Message v-if="$form.reason?.invalid" severity="error" size="small" variant="simple">
          {{ $form.reason.error?.message }}
        </Message>
      </div>
    </div>

    <div class="form-actions">
      <Button :label="$t('back')" outlined icon="pi pi-arrow-left" @click="$emit('back')" />
      <Button
        class="form-actions__next-button"
        :label="$t('next')"
        icon="pi pi-arrow-right"
        iconPos="right"
        type="submit"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { ref } from 'vue';
import type { RequestForm } from '../../types.ts';
import { useAppForm } from '../../composables/useAppForm.ts';

type ExperienceRequestForm = RequestForm['experience'];

const model = defineModel<ExperienceRequestForm>();

const emit = defineEmits<{
  back: [];
  next: [];
}>();

const { descriptionValidation } = useAppForm();

const initialValues = ref<ExperienceRequestForm>({
  travel: '',
  writingReviews: '',
  reason: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      travel: descriptionValidation(),
      writingReviews: descriptionValidation(),
      reason: descriptionValidation(),
    }),
  ),
);

function onValidateForm({ valid, values }: FormSubmitEvent<Record<string, any>>) {
  if (valid) {
    model.value = values as ExperienceRequestForm;
    emit('next');
  }
}
</script>
