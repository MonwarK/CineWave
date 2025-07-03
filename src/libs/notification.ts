import { toast } from 'react-toastify';

export const notify = (text: string, type: string = 'primary') => {
  if (type === 'primary') {
    toast(text, {
      className: '!bg-[#d36013] !text-white font-bold',
      theme: 'colored',
    });
  }
};
