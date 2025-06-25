import React from 'react';

export default function ReviewTags({ info }: { info: string[] }) {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {info.map(x => (
          <div
            key={`key-${x}`}
            className="px-4 py-1 border border-orange-500 text-xs bg-zinc-700/50 rounded-full"
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}
