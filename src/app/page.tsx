"use client";

import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Plan from "@/components/landing/Plan";
import Trending from "@/components/landing/Trending";

export default function Home() {
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
