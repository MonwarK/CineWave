import { useUser } from '@clerk/nextjs';
import React from 'react';

export default function ReviewListItem() {
  const { user } = useUser();

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
        </div>
      </div>

      {/* Mid Section */}
      <div>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          necessitatibus quos culpa nesciunt tempore numquam voluptas vero cum
          ex unde sequi et vitae eaque adipisci impedit ducimus, sint quam nemo?
        </p>
      </div>
    </div>
  );
}
