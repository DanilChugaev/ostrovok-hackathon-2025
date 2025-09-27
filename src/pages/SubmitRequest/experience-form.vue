<template>
  <Form
    v-slot="$form"
    class="submit-request-form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onValidateForm"
  >
    <h2 class="submit-request-form__title">Опыт и мотивация</h2>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="travel">Опыт путешествий</label>

        <Textarea
          id="travel"
          fluid
          name="travel"
          autoResize
          rows="5"
          placeholder="Опишите свой опыт путешествий: как часто вы путешествуете, какие страны и города посетили"
        />

        <Message v-if="$form.travel?.invalid" severity="error" size="small" variant="simple">
          {{ $form.travel.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="writingReviews">Опыт написания отзывов</label>

        <Textarea
          id="writingReviews"
          fluid
          name="writingReviews"
          autoResize
          rows="5"
          placeholder="Опишите свой опыт написания отзывов об отелях или других услугах"
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
        <label for="reason">Почему вы хотите стать секретным гостем?</label>

        <Textarea
          id="reason"
          fluid
          name="reason"
          autoResize
          rows="5"
          placeholder="Опишите вашу мотивацию для участия в программе"
        />

        <Message v-if="$form.reason?.invalid" severity="error" size="small" variant="simple">
          {{ $form.reason.error?.message }}
        </Message>
      </div>
    </div>

    <div class="form-actions">
      <Button label="Назад" outlined icon="pi pi-arrow-left" @click="$emit('back')" />
      <Button
        class="form-actions__next-button"
        label="Далее"
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
import { Form } from '@primevue/forms';
import { ref } from 'vue';
import type { RequestForm } from '../../types.ts';
import { MAX_COUNT_CHARS_IN_TEXTAREA_FIELD, MIN_COUNT_CHARS_IN_FIELD } from '../../constants.ts';

const model = defineModel<RequestForm['experience']>();

const emit = defineEmits<{
  next: [];
}>();

const initialValues = ref<RequestForm['experience']>({
  travel: '',
  writingReviews: '',
  reason: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      travel: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Обязательное поле' })
        .max(MAX_COUNT_CHARS_IN_TEXTAREA_FIELD, { message: 'Слишком длинный текст' }),
      writingReviews: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Обязательное поле' })
        .max(MAX_COUNT_CHARS_IN_TEXTAREA_FIELD, { message: 'Слишком длинный текст' }),
      reason: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Обязательное поле' })
        .max(MAX_COUNT_CHARS_IN_TEXTAREA_FIELD, { message: 'Слишком длинный текст' }),
    }),
  ),
);

async function onValidateForm({
  valid,
  values,
}: {
  valid: boolean;
  values: RequestForm['experience'];
}) {
  if (valid) {
    model.value = values;
    emit('next');
  }
}
</script>
