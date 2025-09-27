import { useToast } from 'primevue/usetoast';
import { NOTIFICATION_LIFE } from './../constants';

type NotifyType = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
type NotifyMessage = string;

export function useNotifications(): {
  successNotify: (message: NotifyMessage) => void;
  infoNotify: (message: NotifyMessage) => void;
  warnNotify: (message: NotifyMessage) => void;
  errorNotify: (message: NotifyMessage) => void;
  secondaryNotify: (message: NotifyMessage) => void;
  contrastNotify: (message: NotifyMessage) => void;
} {
  const toast = useToast();

  const notify = (type: NotifyType, message: NotifyMessage): void => {
    toast.add({
      severity: type,
      summary: message,
      life: NOTIFICATION_LIFE,
    });
  };

  const successNotify = (message: NotifyMessage): void => notify('success', message);
  const infoNotify = (message: NotifyMessage): void => notify('info', message);
  const warnNotify = (message: NotifyMessage): void => notify('warn', message);
  const errorNotify = (message: NotifyMessage): void => notify('error', message);
  const secondaryNotify = (message: NotifyMessage): void => notify('secondary', message);
  const contrastNotify = (message: NotifyMessage): void => notify('contrast', message);

  return {
    successNotify,
    infoNotify,
    warnNotify,
    errorNotify,
    secondaryNotify,
    contrastNotify,
  };
}
