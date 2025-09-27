<template>
  <Form
    v-slot="$form"
    class="submit-request-form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onValidateForm"
  >
    <h2 class="submit-request-form__title">Личные данные</h2>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="firstName">Имя</label>

        <InputText id="firstName" fluid name="firstName" type="text" />

        <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">
          {{ $form.firstName.error?.message }}
        </Message>
      </div>

      <div class="submit-request-form__field-container">
        <label for="lastName">Фамилия</label>

        <InputText id="lastName" fluid name="lastName" type="text" />

        <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">
          {{ $form.lastName.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="email">Email</label>

        <InputText id="email" fluid name="email" type="text" />

        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="phone">Телефон</label>

        <InputText id="phone" fluid name="phone" type="number" />

        <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
          {{ $form.phone.error?.message }}
        </Message>
      </div>
    </div>

    <div class="submit-request-form__line">
      <div class="submit-request-form__field-container">
        <label for="age">Возраст</label>

        <InputText id="age" fluid name="age" type="number" />

        <Message v-if="$form.age?.invalid" severity="error" size="small" variant="simple">
          {{ $form.age.error?.message }}
        </Message>
      </div>

      <div class="submit-request-form__field-container">
        <label for="city">Город проживания</label>

        <Select :options="cities" id="city" name="city" />

        <Message v-if="$form.city?.invalid" severity="error" size="small" variant="simple">
          {{ $form.city.error?.message }}
        </Message>
      </div>
    </div>

    <div class="form-actions">
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
import type { RequestForm } from '../../types.ts';
import { onMounted, ref } from 'vue';
import {
  MAX_COUNT_CHARS_IN_FIELD,
  MIN_COUNT_CHARS_IN_FIELD,
  MIN_COUNT_CHARS_IN_USERNAME,
} from '../../constants.ts';
import { apiRequest } from '../../api/request.ts';
import { useNotifications } from '../../composables/useNotifications.ts';

const model = defineModel<RequestForm['user']>();

const emit = defineEmits<{
  next: [];
}>();

const { errorNotify } = useNotifications();

const initialValues = ref<RequestForm['user']>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  city: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      firstName: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите имя' })
        .min(MIN_COUNT_CHARS_IN_USERNAME, { message: 'Минимум 3 символа' })
        .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинное имя' })
        .refine(checkStartFromDigits, {
          message: 'Имя не должно начинаться с цифры',
        })
        .refine(checkContainSpaces, {
          message: 'Поле не должно содержать пробелы',
        }),
      lastName: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите фамилию' })
        .min(MIN_COUNT_CHARS_IN_USERNAME, { message: 'Минимум 3 символа' })
        .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинная фамилия' })
        .refine(checkStartFromDigits, {
          message: 'Фамилия не должна начинаться с цифры',
        })
        .refine(checkContainSpaces, {
          message: 'Поле не должно содержать пробелы',
        }),
      email: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите email' })
        .email({ message: 'Неверный email' })
        .max(MAX_COUNT_CHARS_IN_FIELD, { message: 'Слишком длинный email' })
        .refine(checkContainSpaces, {
          message: 'Поле не должно содержать пробелы',
        }),
      phone: z.string().min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите телефон' }),
      age: z
        .string()
        .min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Введите возраст' })
        .refine((value: string) => Number(value) >= 18, {
          message: 'Возраст не может быть меньше 18',
        }),
      city: z.string().min(MIN_COUNT_CHARS_IN_FIELD, { message: 'Выберите город' }),
    }),
  ),
);
const cities = ref<string[]>([]);

function checkStartFromDigits(value: string) {
  return !/^\d/.test(value);
}

function checkContainSpaces(value: string) {
  return !/\s/.test(value);
}

async function onValidateForm({ valid, values }: { valid: boolean; values: RequestForm['user'] }) {
  if (valid) {
    model.value = values;
    emit('next');
  }
}

async function fetchCities() {
  try {
    cities.value = await apiRequest<string[]>(`/api/cities`, { method: 'GET' }).then(
      data => data.data,
    );
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  await fetchCities();
});
</script>
