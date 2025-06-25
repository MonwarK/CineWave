import React from 'react';

export default function Comment() {
  return (
    <div className="border-b border-zinc-800 flex py-10 space-x-5">
      <div>
        <div className="w-15 h-15 bg-zinc-800 rounded-full" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          {/* Name */}
          <div>Name</div>
          <div className="text-xs text-zinc-500">
            {new Date().toLocaleString()}
          </div>
        </div>

        {/* Message */}
        <div className="text-gray-400 text-sm">
          Lorem ipsum dolor.ucimus incidunt quia voluptatibus! Asperiores,
          eveniet.
        </div>
      </div>
    </div>
  );
}
