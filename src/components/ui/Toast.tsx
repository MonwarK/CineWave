import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import React from 'react';
import { ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

export default function Toast({ closeToast, data }: CustomNotificationProps) {
  const isNoContent = data.content.length === 0;

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      {/* Subtle top accent line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>

      <div
        className={clsx(
          'flex gap-4 p-6',
          !isNoContent ? 'items-start' : 'items-center'
        )}
      >
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base mb-1 leading-tight">
            {data.title}
          </h3>
          {!isNoContent && (
            <p className="text-slate-300 text-sm leading-relaxed">
              {data.content}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={closeToast}
          className="cursor-pointer flex-shrink-0 w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors duration-200 flex items-center justify-center group"
        >
          <XIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
