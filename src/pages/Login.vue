<template>
  <div class="login">
    <h1 class="login__title">{{ $t('enter') }}</h1>

    <Form
      v-slot="$form"
      class="login__form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onValidateForm"
    >
      <form-field
        class="login__field"
        :label="$t('username')"
        field-id="username"
        :field-state="$form.username"
      >
        <InputText id="username" fluid name="username" type="text" />
      </form-field>

      <form-field
        class="login__field"
        label="Пароль"
        field-id="password"
        :field-state="$form.password"
      >
        <InputText id="password" fluid name="password" type="password" />
      </form-field>

      <Button
        class="login__button"
        :label="$t('auth')"
        icon="pi pi-user"
        iconPos="left"
        type="submit"
      />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { onBeforeMount, ref } from 'vue';
import type { LoginForm, User } from '../types.ts';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { API, PAGES } from '../constants.ts';
import { useAppForm } from '../composables/useAppForm.ts';
import { useUser } from '../composables/useUser.ts';
import { useRouter } from 'vue-router';
import { apiRequest } from '../api/request.ts';
import { useNotifications } from '../composables/useNotifications.ts';

const { usernameValidation, passwordValidation } = useAppForm();
const { isAuth, isAdmin, isHotel, isUser, isSecretGuest, user } = useUser();
const router = useRouter();
const { errorNotify } = useNotifications();

const initialValues = ref<LoginForm>({
  username: '',
  password: '',
});

const resolver = ref(
  zodResolver(
    z.object({
      username: usernameValidation(),
      password: passwordValidation(),
    }),
  ),
);

async function onValidateForm({ valid, values }: FormSubmitEvent<Record<string, any>>) {
  if (valid) {
    const typedValues = values as unknown as LoginForm;
    await sendLoginForm(typedValues);
  }
}

async function sendLoginForm(form: LoginForm) {
  try {
    const response = await apiRequest<User | null>(API.Login, {
      method: 'POST',
      body: form,
    });

    if (response.success) {
      user.value = response.data;

      redirectOnProfile();
    } else {
      errorNotify(response.message);
    }
  } catch (e: any) {
    errorNotify(e.message);
  }
}

function redirectOnProfile() {
  if (isUser.value || isSecretGuest.value) {
    router.push(PAGES.Profile);
  }

  if (isAdmin.value) {
    router.push(PAGES.Admin);
  }

  if (isHotel.value) {
    router.push(PAGES.HotelAccount);
  }
}

onBeforeMount(() => {
  if (isAuth.value) {
    redirectOnProfile();
  }
});
</script>

<style scoped>
.login__title {
  margin-top: var(--spacer-f);
  margin-bottom: var(--spacer-f);
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-de);
  padding: var(--spacer-e);
  background-color: var(--p-menubar-background);
  border-radius: var(--p-border-radius-lg);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
