"use client";

import { SavedMovie } from "@/types/SavedMovies";
import MovieRowItem from "../discover/MovieRowItem";

interface Props {
  savedMovies: SavedMovie[];
}

export default function WatchlistSection({ savedMovies }: Props) {
  return (
    <>
      <div className="py-10 space-y-18">
        <div className="flex justify-center flex-wrap gap-4">
          {savedMovies.map((saved: SavedMovie) => (
            <MovieRowItem key={saved.id} savedMovie={saved} />
          ))}
        </div>
      </div>
    </>
  );
}
