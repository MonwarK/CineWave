"use client";

import React, { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { Movie } from "@/types/Movie";
import { getMovieServer, servers } from "@/utils/servers";
import Link from "next/link";
import classNames from "classnames";

export default function WatchMoviePage({ movie }: { movie: Movie }) {
  const [currentServerIndex, setCurrentServerIndex] = useState(0);

  const currentServer = servers[currentServerIndex];
  const videoSrc = getMovieServer(currentServerIndex, movie.id);

  console.log(videoSrc);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-black border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/movies/${movie.id}`}>
              <div className="text-white hover:text-gray-300 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </Link>
            <div className="text-xl font-bold">CineWave</div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-screen-2xl w-full mx-auto flex-1">
        {/* Video Player Section */}
        <div className="flex-1">
          <div className="aspect-video bg-black">
            <iframe
              src={videoSrc}
              allowFullScreen
              width="100%"
              height="100%"
              frameBorder="0"
              className="w-full h-full"
              title="Video Player"
            />
          </div>

          {/* Video Info Section */}
          <div className="p-6 bg-black space-y-4">
            {/* Video Title */}
            <div className="md:flex justify-between items-center">
              <h1 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-4">
                {movie.title}
              </h1>
              <div className="text-xs text-whtie uppercase bg-orange-600 px-3 py-1 rounded-md font-semibold">
                Server {currentServer.id}: {currentServer.name}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {movie.overview}
              </p>
            </div>

            {/* Channel Info */}
            <div>
              <div className="text-gray-400 text-xs">
                {movie?.production_companies?.[0].name}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Netflix Style Recommendations */}
        <div className="lg:w-96 bg-black border-l border-gray-800 p-6">
          <h3 className="text-white font-semibold mb-4 uppercase">
            Available Servers
          </h3>

          {/* Recommended Videos */}
          <div className="space-y-4">
            {servers.map((item, i) => (
              <div
                onClick={() => setCurrentServerIndex(i)}
                key={item.id}
                className={classNames(
                  "p-5 rounded-lg border space-y-1 cursor-pointer",
                  {
                    "bg-zinc-800 border-zinc-500": currentServer.id === item.id,
                    "bg-zinc-900 border-zinc-700 hover:opacity-80":
                      currentServer.id !== item.id,
                  }
                )}
              >
                <h2 className="text-sm">
                  Server {item.id}: {item.name}
                </h2>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
