import React from "react";

export default function Categories() {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl">
      <div className="max-w-screen-xl mx-auto hidden md:block">
        <div className="flex space-x-10 py-8 px-10 overflow-x-auto no-scrollbar">
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Action
          </div>
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Adventure
          </div>
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Anime
          </div>
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Biography
          </div>
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Crime
          </div>
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Documentary
          </div>
          <div className="rounded-full bg-gray-800/60 hover:bg-gray-800/40 cursor-pointer transition px-10 py-1">
            Drama
          </div>
        </div>
      </div>
    </div>
  );
}
