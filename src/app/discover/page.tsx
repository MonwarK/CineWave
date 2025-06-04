import Header from "@/components/main/Header";
import React from "react";

export default function page() {
  return (
    <div className="bg-zinc-900/50 pb-10 relative">
      <Header />

      <div className="relative flex flex-col min-h-[90vh] overflow-hidden justify-between">
        <div className="absolute w-full h-full">
          <img
            className="absolute -z-10 top-0 left-0 brightness-75 w-full h-full object-cover object-top"
            src="https://image.tmdb.org/t/p/w1920/nAxGnGHOsfzufThz20zgmRwKur3.jpg"
            alt=""
          />
        </div>

        <div />

        <div className="max-w-screen-xl mx-auto w-full px-10">
          <div className="space-y-4 md:space-y-6 md:w-1/2">
            <div className="flex space-x-4">
              <div>7.5</div>
              <div>2025</div>
              <div>2 Seasons</div>
            </div>
            <div>
              <div className="text-4xl font-medium tracking-[0.2em] uppercase">
                sinners
              </div>
            </div>
            <div>
              <div>
                Trying to leave their troubled lives behind, twin brothers
                return to their hometown to start again, only to discover that
                an even greater evil is waiting to welcome them back.
              </div>
            </div>
            <div className="sm:flex space-y-5 md:space-y-0 md:space-x-5 uppercase py-5">
              <div className="bg-primary hover:opacity-85 cursor-pointer backdrop-blur-2xl py-3 px-10 tracking-wider font-medium spacing-x-2 rounded-full transition">
                Watch
              </div>
              <div className="bg-gray-600/40 hover:opacity-85 cursor-pointer backdrop-blur-2xl py-3 px-10 tracking-wider font-medium spacing-x-2 rounded-full transition">
                Add To List
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-900/30 backdrop-blur-xl">
          <div className="max-w-screen-xl mx-auto hidden md:block px-10">
            <div className="grid grid-cols-5 text-center text-sm">
              <div className="py-5 border-b-2 border-orange-500">
                Trending Now
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                TV Shows
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                Movies
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                Recently Added
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                My List
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
