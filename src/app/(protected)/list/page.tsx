"use client";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import WatchlistSection from "@/components/watchlist/WatchlistSection";
import { useSavedMovies } from "@/context/SavedMoviesProvider";

export default function ListPage() {
  const { savedMovies } = useSavedMovies();

  return (
    <div>
      <Header />
      <div className="pt-[7rem] container max-w-6xl mx-auto flex flex-col">
        <h1 className="leading-2 text-3xl font-semibold text-center">
          Your Watchlist
        </h1>
        <WatchlistSection savedMovies={savedMovies} />
      </div>
    </div>
  );
}
