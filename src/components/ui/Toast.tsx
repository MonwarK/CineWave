import React from 'react';
import { ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

export default function Toast({ closeToast, data }: CustomNotificationProps) {
  return (
    <div className="bg-[#d36013] rounded-xl overflow-hidden">
      <div className="flex flex-col p-4 font-semibol space-y-2 text-white">
        <h3 className="text-sm font-bold ">{data.title}</h3>
        <p className="text-xs font-semibold">{data.content}</p>
      </div>
    </div>
  );
}
