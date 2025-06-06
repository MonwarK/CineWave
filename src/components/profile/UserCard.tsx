import { Crown } from "lucide-react";
import React from "react";
import { UserResource } from "@clerk/types";

interface Props {
  user: UserResource | null | undefined;
  dateJoined: string;
  currentPlan: string | undefined;
}

export default function UserCard({ user, dateJoined, currentPlan }: Props) {
  return (
    <div className="bg-zinc-800/50 rounded-2xl p-5 border border-gray-600 backdrop:blur-2xl flex items-center">
      <div className="flex flex-1 items-center space-x-5">
        <div>
          <img
            className="w-20 rounded-full border border-gray-700 duration-500 cursor-pointer"
            src={user?.imageUrl}
            alt=""
          />
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-xl font-bold mb-2">{user?.fullName}</p>
          <p className="text-xs text-gray-300">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <p className="text-xs text-gray-400">Member since {dateJoined}</p>
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-300 cursor-pointer font-semibold hover:animate-pulse">
        {currentPlan ? (
          <>
            <Crown className="text-yellow-500 fill-yellow-500" size={24} />
            <p>{currentPlan}</p>
          </>
        ) : (
          <p className="text-gray-400">No Plan Selected</p>
        )}
      </div>
    </div>
  );
}
