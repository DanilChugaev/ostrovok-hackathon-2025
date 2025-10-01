<template>
  <Form
    v-slot="$form"
    class="submit-request-form"
    :initialValues="initialValues"
    :resolver="resolver"
    @submit="onValidateForm"
  >
    <h2 class="submit-request-form__title">{{ $t('personalInformation') }}</h2>

    <div class="submit-request-form__line">
      <form-field
        class="submit-request-form__field-container"
        :label="$t('username')"
        field-id="username"
        :field-state="$form.username"
      >
        <InputText id="username" fluid name="username" type="text" />
      </form-field>

      <form-field
        class="submit-request-form__field-container"
        :label="$t('password')"
        field-id="password"
        :field-state="$form.password"
      >
        <InputText id="password" fluid name="password" type="password" />
      </form-field>
    </div>

    <div class="submit-request-form__line">
      <form-field
        class="submit-request-form__field-container"
        :label="$t('firstName')"
        field-id="firstName"
        :field-state="$form.firstName"
      >
        <InputText id="firstName" fluid name="firstName" type="text" />
      </form-field>

      <form-field
        class="submit-request-form__field-container"
        :label="$t('lastName')"
        field-id="lastName"
        :field-state="$form.lastName"
      >
        <InputText id="lastName" fluid name="lastName" type="text" />
      </form-field>
    </div>

    <div class="submit-request-form__line">
      <form-field
        class="submit-request-form__field-container"
        label="Email"
        field-id="email"
        :field-state="$form.email"
      >
        <InputText id="email" fluid name="email" type="text" />
      </form-field>
    </div>

    <div class="submit-request-form__line">
      <form-field
        class="submit-request-form__field-container"
        :label="$t('phone')"
        field-id="phone"
        :field-state="$form.phone"
      >
        <InputText id="phone" fluid name="phone" type="text" />
      </form-field>
    </div>

    <div class="submit-request-form__line">
      <form-field
        class="submit-request-form__field-container"
        :label="$t('age')"
        field-id="age"
        :field-state="$form.age"
      >
        <InputText id="age" fluid name="age" type="number" />
      </form-field>

      <form-field
        class="submit-request-form__field-container"
        :label="$t('cityOfResidence')"
        field-id="city"
        :field-state="$form.city"
      >
        <Select :options="mappedCities" label-id="city" name="city" />
      </form-field>
    </div>

    <div class="form-actions">
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
import type { City, RequestForm } from '../../types.ts';
import { computed, onMounted, ref } from 'vue';
import { API } from '../../constants.ts';
import { apiRequest } from '../../api/request.ts';
import { useNotifications } from '../../composables/useNotifications.ts';
import { useAppForm } from '../../composables/useAppForm.ts';
import { useLocale } from '../../composables/useLocale.ts';

type UserRequestForm = RequestForm['user'];

const model = defineModel<UserRequestForm>();

const emit = defineEmits<{
  next: [];
}>();

const { errorNotify } = useNotifications();
const {
  usernameValidation,
  passwordValidation,
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  ageValidation,
  cityValidation,
} = useAppForm();
const { localeKey } = useLocale();

const initialValues = ref<UserRequestForm>({
  username: '',
  password: '',
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
      username: usernameValidation(),
      password: passwordValidation(),
      firstName: firstNameValidation(),
      lastName: lastNameValidation(),
      email: emailValidation(),
      phone: phoneValidation(),
      age: ageValidation(),
      city: cityValidation(),
    }),
  ),
);
const cities = ref<City[]>([]);

const mappedCities = computed<string[]>(() => cities.value.map(item => item.name[localeKey.value]));

function onValidateForm({ valid, values }: FormSubmitEvent<Record<string, any>>) {
  if (valid) {
    model.value = values as UserRequestForm;
    emit('next');
  }
}

async function fetchCities() {
  try {
    cities.value = await apiRequest<City[]>(API.Cities, { method: 'GET' }).then(data => data.data);
  } catch (e: any) {
    errorNotify(e.message);
  }
}

onMounted(async () => {
  await fetchCities();
});
</script>
