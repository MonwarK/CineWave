import Link from "next/link";
import React from "react";

export default function BackgroundImage() {
  return (
    <>
      {/* Background Image */}
      <div className="top-0 left-0 fixed -z-50 w-full h-full">
        <img
          className="w-full h-full object-cover brightness-50 blur-[4px]"
          src="https://i.ibb.co/20WjVpkH/Chat-GPT-Image-Jun-3-2025-10-35-36-PM.png"
          alt="Background"
        />
      </div>

      {/* Logo */}
      <div className="absolute z-50 top-0 left-0 p-5 max-w-screen-xl mx-auto w-full">
        <Link href="/">
          <img
            className="h-16 object-fit cursor-pointer hover:animate-pulse"
            src="https://i.ibb.co/5xXyfHkM/image-removebg-preview-16.png"
            alt="Logo"
          />
        </Link>
      </div>
    </>
  );
}
