import Link from "next/link";
import React from "react";

export default function BackgroundImage() {
  return (
    <>
      {/* Background Image */}
      <div className="top-0 left-0 fixed -z-50 w-full h-full">
        <img
          className="w-full h-full object-cover brightness-50 blur-[4px]"
          src="https://media.discordapp.net/attachments/655822636277825588/1379578672498868274/ChatGPT_Image_Jun_3_2025_10_35_36_PM.png?ex=6840c042&is=683f6ec2&hm=cdfc2ac986eb5284ead90c11b9a0d4377bd1e2dd07322b54830920f8616e7a7e&=&format=webp&quality=lossless&width=916&height=611"
          alt="Background"
        />
      </div>

      {/* Logo */}
      <div className="absolute z-50 top-5 left-5 right-5 max-w-screen-xl mx-auto w-full">
        <Link href="/">
          <img
            className="h-16 object-fit cursor-pointer hover:animate-pulse"
            src="https://media.discordapp.net/attachments/655822636277825588/1379584370620370945/image-removebg-preview_16.png?ex=6840c591&is=683f7411&hm=df888960b39c65f0f138910690bf88baa7711bd08b68f96a954397ab5d79cf48&=&format=webp&quality=lossless&width=491&height=301"
            alt="Logo"
          />
        </Link>
      </div>
    </>
  );
}
