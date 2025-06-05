"use client";

import React from "react";
import Hero from "./Hero";
import Plan from "./Plan";
import Trending from "./Trending";
import Features from "./Features";

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Top Section */}
      <Hero />

      <div className="max-w-screen-xl mx-auto px-5 py-20 space-y-20">
        {/* Plan */}
        <Plan />

        {/* Trending */}
        <Trending />

        {/* Features */}
        <Features />
      </div>
    </div>
  );
}
