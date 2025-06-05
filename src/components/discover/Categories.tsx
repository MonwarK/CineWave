"use client";

import React, { useState } from "react";
import Genres from "../main/Genres";

export default function Categories() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl">
      <div className="max-w-screen-xl py-8 px-10 mx-auto hidden md:block">
        <Genres
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </div>
    </div>
  );
}
