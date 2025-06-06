"use client";

import Genres from "@/components/main/Genres";
import Header from "@/components/main/Header";
import { searchTMDB } from "@/utils/api";
import React, { useState } from "react";
import { Movie } from "@/types/Movie";
import FullPageLoader from "@/components/loading/FullPageLoader";
import MovieModal from "@/components/movie-modal/MovieModal";
import SearchBarSection from "@/components/search/SearchBarSection";
import SearchResults from "@/components/search/SearchResults";
import SearchNoResults from "@/components/search/SearchNoResults";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const handleSearch = () => {
    setIsLoading(true);

    searchTMDB(search, "multi").then((results) => {
      setResults(results);
      setTimeout(() => setIsLoading(false), 500);
    });
  };

  return (
    <div className="bg-zinc-900/50 min-h-screen py-10">
      <Header />

      <div className="pt-20 max-w-screen-xl mx-auto w-full px-7 space-y-14">
        {/* Search Section */}
        <div className="space-y-7">
          <SearchBarSection
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />

          <div>
            <Genres
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />
          </div>

          {isLoading ? (
            <FullPageLoader />
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
              </div>

              {/* Search Results */}
              {results.length > 0 ? (
                <SearchResults
                  results={results}
                  selectMovie={setSelectedMovie}
                />
              ) : (
                <SearchNoResults />
              )}
            </div>
          )}

          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        </div>
      </div>
    </div>
  );
}
