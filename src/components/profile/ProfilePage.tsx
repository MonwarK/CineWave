"use client";

import { PricingTable, useUser } from "@clerk/nextjs";
import React from "react";
import Header from "../main/Header";
import UserCard from "./UserCard";

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
        <UserCard
          user={user}
          dateJoined={formatted}
          currentPlan={currentPlan}
        />

        <div>
          <h2 className="text-3xl font-semibold mb-5">Your Plans</h2>

          <PricingTable
            newSubscriptionRedirectUrl="/profile"
            appearance={{
              elements: {
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
