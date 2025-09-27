<template>
  <Form
    v-slot="$form"
    class="submit-request-form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onValidateForm"
  >
    <h2 class="submit-request-form__title">Предпочтения и доступность</h2>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="travelAccessibility">Ваша доступность для поездок</label>

        <Select
          :options="accessibilityListForTravel"
          label-id="travelAccessibility"
          name="travelAccessibility"
          placeholder="Выберите вариант"
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
        <label for="preferredDirections">Предпочтительные направления</label>

        <Textarea
          id="preferredDirections"
          fluid
          name="preferredDirections"
          autoResize
          rows="5"
          placeholder="Укажите города или страны, которые вам интересны для посещения"
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
            <label class="checkbox-container__label" for="agreeWithRules"
              >Я согласен с условиями программы "Секретный гость"</label
            >

            <p class="checkbox-container__description">
              Я обязуюсь предоставлять честные и объективные отзывы об отелях, соблюдать
              конфиденциальность и следовать инструкциям программы.
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
      <Button label="Назад" outlined icon="pi pi-arrow-left" @click="$emit('back')" />
      <Button
        class="form-actions__next-button"
        label="Отправить заявку"
        iconPos="right"
        type="submit"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms';
import { apiRequest } from '../../api/request.ts';
import { onMounted, ref } from 'vue';
import type { RequestForm } from '../../types.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import {
  API,
  MAX_COUNT_CHARS_IN_TEXTAREA_FIELD,
  MIN_COUNT_CHARS_IN_FIELD,
} from '../../constants.ts';

const preferencesModel = defineModel<RequestForm['preferences']>('preferences');
const agreeWithRulesModel = defineModel<RequestForm['agreeWithRules']>('agreeWithRules');

const emit = defineEmits<{
  back: [];
  'send-request-form': [];
}>();

const { errorNotify } = useNotifications();

const initialValues = ref<
  RequestForm['preferences'] & { agreeWithRules: RequestForm['agreeWithRules'] }
>({
  travelAccessibility: '',
  preferredDirections: '',
  agreeWithRules: false,
});

const resolver = ref(
  zodResolver(
    z.object({
      travelAccessibility: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Выберите вариант' }),
      preferredDirections: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Обязательное поле' })
        .max(MAX_COUNT_CHARS_IN_TEXTAREA_FIELD, { message: 'Слишком длинный текст' }),
      agreeWithRules: z.custom(val => val === true, { message: 'Обязательный пункт' }),
    }),
  ),
);

const accessibilityListForTravel = ref<string[]>([]);

async function onValidateForm({ valid, values }) {
  if (valid) {
    preferencesModel.value!.travelAccessibility = values.travelAccessibility;
    preferencesModel.value!.preferredDirections = values.preferredDirections;
    agreeWithRulesModel.value = values.agreeWithRules;
    emit('send-request-form');
  }
}

// accessibility for travel
async function fetchAccessibilityListForTravel() {
  try {
    accessibilityListForTravel.value = await apiRequest<string[]>(API.AccessibilityListForTravel, {
      method: 'GET',
    }).then(data => data.data);
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
