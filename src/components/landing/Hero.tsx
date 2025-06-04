import React from "react";
import Header from "./Header";
import TextBox from "../auth/TextBox";

export default function Hero() {
  return (
    <div className="relative h-[90vh] overflow-hidden p-5 flex flex-col">
      <img
        className="w-full h-full top-0 left-0 object-cover brightness-50 absolute -z-50"
        src="https://media.discordapp.net/attachments/655822636277825588/1379578672498868274/ChatGPT_Image_Jun_3_2025_10_35_36_PM.png?ex=6840c042&is=683f6ec2&hm=cdfc2ac986eb5284ead90c11b9a0d4377bd1e2dd07322b54830920f8616e7a7e&=&format=webp&quality=lossless&width=916&height=611"
        alt="Background"
      />

      {/* Header */}
      <Header />

      {/* Central Form */}
      <div className="flex-1 grid place-items-center text-center">
        <div className="space-y-3 max-w-md">
          <h2 className="text-4xl font-semibold">
            Unlimited films, series and more
          </h2>

          <div className="text-gray-300 font-medium space-y-2">
            <p>Starts at £5.99. Cancel at any time.</p>
            <p>
              Ready to watch? Enter your email to creatr or restart your
              membership.
            </p>
          </div>

          <div className="flex space-x-4">
            <TextBox placeholder="Email address" />
            <button className="cursor-pointer md:text-lg tracking-wide px-5 py-2 bg-primary hover:brightness-80 transition rounded font-semibold w-1/2">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Fades */}
      <div className="h-1/5 -z-40 left-0 top-0 bg-gradient-to-b from-black to-transparent absolute w-full" />
      <div className="h-1/5 -z-40 left-0 bottom-0 bg-gradient-to-t from-black to-transparent absolute w-full" />
    </div>
  );
}
