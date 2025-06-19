"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CreditCard, Search } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isLoaded } = useUser();
  const router = useRouter();

  return (
    <div className="bg-black/50 backdrop-blur-sm w-full fixed top-0 left-0 px-5 z-10">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-5">
        {/* Logo */}
        <div className="p-2 py-5">
          <Link href="/discover">
            <p className="text-lg">CineWave</p>
          </Link>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-5">
          <div>
            <Link href="/search">
              <Search className="text-white/80 cursor-pointer hover:animate-pulse" />
            </Link>
          </div>
          <div>
            <Link href="/series">
            Series
            </Link>
          </div>
          <div>
            <Link href="/movies">
            Movies
            </Link>
          </div>
          <div>
            {isLoaded && (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Subscription Plans"
                    labelIcon={<CreditCard size={16} />}
                    onClick={() => router.push("/profile")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
