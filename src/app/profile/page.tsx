import Header from "@/components/main/Header";
import { PricingTable } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <div>
      <Header />

      <div className="h-[50vh]"></div>

      <div className="max-w-screen-xl mx-auto w-full px-5">
        <PricingTable />
      </div>
    </div>
  );
}
