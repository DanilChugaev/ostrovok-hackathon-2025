import { StorageSerializers, useStorage } from '@vueuse/core';
import type { User } from '../types.ts';
import { computed } from 'vue';

export function useUser() {
  const user = useStorage<User | null>('user', null, undefined, {
    serializer: StorageSerializers.object,
  });

  const isAuth = computed(() => Boolean(user.value?.id));
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isUser = computed(() => user.value?.role === 'user');
  const isSecretGuest = computed(() => user.value?.role === 'secret_guest');
  const isHotel = computed(() => user.value?.role === 'hotel');

  const fullUserName = computed(() => {
    if (!user.value) return '';

    return `${user.value.firstName} ${user.value.lastName}`;
  });

  const isSecretGuestProgramAccepted = computed(
    () => user.value?.programRequestStatus === 'accepted',
  );

  return {
    isAuth,
    isAdmin,
    isUser,
    isSecretGuest,
    isHotel,
    user,
    fullUserName,
    isSecretGuestProgramAccepted,
  };
}
