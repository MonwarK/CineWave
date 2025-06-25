'use client';

import React from 'react';

export default function NumberRating({ rating }: any) {
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
          <button
            key={star}
            type="button"
            // onClick={() => onRate(star)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer ${
              star <= rating
                ? 'bg-orange-500 text-white shadow-lg scale-110'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {star}
          </button>
        ))}
      </div>
    </div>
  );
}
