"use client";
import WatchlistSection from "@/components/watchlist/WatchlistSection";
import { useSavedMovies } from "@/context/SavedMoviesProvider";

export default function ListPage() {
  const { savedMovies, isSaved } = useSavedMovies();

  return (
    <div className="pt-[7rem] container max-w-6xl mx-auto flex flex-col">
      <h1 className="leading-2 text-3xl font-semibold text-center">
        Your Watchlist
      </h1>
      <WatchlistSection savedMovies={savedMovies} />
    </div>
  );
}
