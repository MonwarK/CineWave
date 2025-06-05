"use client";

import Header from "@/components/main/Header";
import { PricingTable, useUser } from "@clerk/nextjs";

export default function CustomProfilePage() {
  const { user } = useUser();

  const dateCreated = new Date(user?.createdAt).toDateString();

  return (
    <div className="pt-20">
      <Header />
      <div className="max-w-screen-xl mx-auto w-full p-5 space-y-10">
        <div className="bg-zinc-800/50 rounded-2xl p-5 border border-gray-600 backdrop:blur-2xl">
          <div className="flex items-center space-x-5">
            <div>
              <img className="w-20" src={user?.imageUrl} />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-xl font-bold mb-2">{user?.fullName}</p>
              <p className="text-xs text-gray-300">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              <p className="text-xs text-gray-400">
                Member since {dateCreated}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-5">Your Plans</h2>

          <PricingTable
            appearance={{
              variables: {
                colorPrimary: "#d86020",
                colorText: "#ffffff",
                colorBackground: "rgba(39, 39, 42, 0.5)",
                borderRadius: "8px",
                fontSize: "1rem",
              },
              elements: {
                pricingTableCardBody: "bg-black",
                pricingTableCardFooter: "bg-zinc-700/50",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
