import toastr from 'toastr';
import i18n from '@/shared/i18n';

export const onError = (message?: string): void => {
  toastr.error(
    message || i18n.tc('general.errorOperation'),
    i18n.tc('general.error')
  );
};

export const onSuccess = (message?: string): void => {
  toastr.success(
    message || i18n.tc('general.successOperation'),
    i18n.tc('general.success')
  );
};
