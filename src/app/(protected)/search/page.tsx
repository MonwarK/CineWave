"use client";

import FullPageLoader from "@/components/loading/FullPageLoader";
import Footer from "@/components/main/Footer";
import Genres from "@/components/main/Genres";
import Header from "@/components/main/Header";
import SearchBarSection from "@/components/search/SearchBarSection";
import SearchNoResults from "@/components/search/SearchNoResults";
import SearchResults from "@/components/search/SearchResults";
import { searchTMDB } from "@/utils/api";
import { useState } from "react";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
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
                <SearchResults results={results} />
              ) : (
                <SearchNoResults />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
