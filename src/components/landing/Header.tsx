import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto w-full">
      <Link href="/">
        <img
          className="h-16 object-fit cursor-pointer hover:animate-pulse"
          src="https://i.ibb.co/5xXyfHkM/image-removebg-preview-16.png"
          alt="Logo"
        />
      </Link>

      <div>
        <Link href="/sign-in">
          <button className="cursor-pointer text-sm tracking-wide px-5 py-2 bg-primary hover:brightness-80 transition rounded font-semibold">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
