import { useUser } from '@clerk/nextjs';
import React from 'react';

export default function ReviewListItem({ review }: any) {
  const { user } = useUser();

  console.log(review);

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900/10 p-5 border border-zinc-700 rounded-lg space-y-3">
      {/* Top Section */}
      <div>
        <div className="flex items-center space-x-5">
          {/* Profile Picture */}
          <div>
            <img className="w-14" src={user?.imageUrl} alt="" />
          </div>

          {/* Username and time sent */}
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-sm">{user?.fullName}</p>
            <p className="text-xs text-gray-500">
              {new Date(user?.createdAt || '').toUTCString()}
            </p>
          </div>

          {/* Rating */}
          <div>
            <div className="px-2 py-1 bg-orange-500 rounded-md text-xs font-semibold">
              {review.rating}/10
            </div>
          </div>
        </div>
      </div>

      {/* Mid Section */}
      <div>
        <p className="text-sm">{review.review}</p>
      </div>
    </div>
  );
}
