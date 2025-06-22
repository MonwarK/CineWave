"use client";

import { SavedMovie } from "@/types/SavedMovies";
import WatchlistTabs from "./WatchlistTabs";

interface Props {
  savedMovies: SavedMovie[];
}

export default function WatchlistSection({ savedMovies }: Props) {
  
  return (
    <>
      <div className="py-10 space-y-18">
        <WatchlistTabs SavedMovies={savedMovies} />  
      </div>
    </>
  );
}
