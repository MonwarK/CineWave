import Toast from '@/components/ui/Toast';
import { toast } from 'react-toastify';

export const notify = (
  title: string,
  description?: string,
  type: string = 'primary'
) => {
  if (type === 'primary') {
    toast(Toast, {
      data: {
        title,
        content: description || '',
      },
      className: '!p-0 !bg-transparent !justify-end !shadow-none',
      ariaLabel: title,
      icon: false,
      theme: 'colored',
      closeButton: false,
      autoClose: 3000,
    });
  }
};
