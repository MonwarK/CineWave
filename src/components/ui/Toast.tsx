import React from 'react';
import { ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

export default function Toast({ closeToast, data }: CustomNotificationProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm ">
      {/* Subtle top accent line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>

      <div className="flex items-start gap-4 p-6">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base mb-1 leading-tight">
            {data.title}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {data.content}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={closeToast}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors duration-200 flex items-center justify-center group"
        >
          <svg
            className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
