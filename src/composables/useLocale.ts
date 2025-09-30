import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import type { LocalizationMessagesKeys } from '../types.ts';

export function useLocale() {
  const { t, locale } = useI18n();

  const localeKey = computed<LocalizationMessagesKeys>(
    () => locale.value as LocalizationMessagesKeys,
  );

  return {
    t,
    localeKey,
  };
}
