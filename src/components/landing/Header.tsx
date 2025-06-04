import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto w-full">
      <Link href="/">
        <img
          className="h-16 object-fit cursor-pointer hover:animate-pulse"
          src="https://media.discordapp.net/attachments/655822636277825588/1379584370620370945/image-removebg-preview_16.png?ex=6840c591&is=683f7411&hm=df888960b39c65f0f138910690bf88baa7711bd08b68f96a954397ab5d79cf48&=&format=webp&quality=lossless&width=491&height=301"
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
