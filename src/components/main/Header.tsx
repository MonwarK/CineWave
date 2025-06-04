import { CircleUser, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="bg-black/50 backdrop-blur-sm w-full fixed top-0 left-0 px-5 z-40">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-5">
        {/* Logo */}
        <div className="p-2 py-5">
          <Link href="/discover">
            <p className="text-lg">CineWave</p>
          </Link>
        </div>

        {/* Profile */}
        <div className="flex space-x-5 justify-end">
          <Search className="text-white/80 cursor-pointer hover:animate-pulse" />
          <CircleUser className="text-white/80 cursor-pointer hover:animate-pulse" />
        </div>
      </div>
    </div>
  );
}
