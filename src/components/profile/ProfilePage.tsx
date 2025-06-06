"use client";

import { PricingTable, useUser } from "@clerk/nextjs";
import React from "react";
import Header from "../main/Header";
import { Crown, HandHelping } from "lucide-react";
import SearchIcon from "../search/SearchIcon";

interface Props {
  currentPlan: string | undefined;
}

export default function ProfilePage({ currentPlan }: Props) {
  const { user } = useUser();

  const dateCreated = new Date(user?.createdAt || "");
  const formatted = dateCreated.toLocaleString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pt-20">
      <Header />
      <div className="max-w-screen-xl mx-auto w-full p-5 space-y-10">
        <div className="bg-zinc-800/50 rounded-2xl p-5 border border-gray-600 backdrop:blur-2xl flex items-center">
          <div className="flex flex-1 items-center space-x-5">
            <div>
              <img
                className="w-20 rounded-full border border-gray-700"
                src={user?.imageUrl}
                alt=""
              />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-xl font-bold mb-2">{user?.fullName}</p>
              <p className="text-xs text-gray-300">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              <p className="text-xs text-gray-400">Member since {formatted}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-300 cursor-pointer font-semibold hover:animate-pulse">
            {currentPlan ? (
              <>
                <Crown className="text-yellow-500 fill-yellow-500" size={24} />
                <p>{currentPlan}</p>
              </>
            ) : (
              <SearchIcon />
            )}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-5">Your Plans</h2>

          <PricingTable
            appearance={{
              elements: {
                pricingTableCardBody: "bg-black",
                pricingTableCardFooter: "bg-zinc-700/50",
                pricingTableCardDescription: "pt-1 pb-3",
                pricingTable: "z-0 relative",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
