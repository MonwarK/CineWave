"use client";

import Genres from "@/components/main/Genres";
import Header from "@/components/main/Header";
import SearchResult from "@/components/search/SearchResult";
import { containerVariants } from "@/motion/variants/motion";
import { searchTMDB } from "@/utils/api";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Movie } from "@/types/Movie";

export default function page() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const searchForResults = () =>
    searchTMDB(search, "multi").then((results) => setResults(results));

  return (
    <div className="bg-zinc-900/50 min-h-screen py-10">
      <Header />

      <div className="pt-20 max-w-screen-xl mx-auto w-full px-7 space-y-14">
        {/* Search Section */}
        <div className="space-y-5">
          <div>
            <h2 className="text-3xl font-semibold">Search</h2>
          </div>

          <div className="bg-zinc-700 p-2 rounded-md flex items-center">
            <div className="flex-1 px-4">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Search for movies, TV Shows, actors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="px-2">
              <SearchIcon
                onClick={searchForResults}
                className="cursor-pointer"
                color="lightgray"
                size={20}
              />
            </div>
          </div>
        </div>

        <div>
          <Genres
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Results</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="invisible"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-4"
            >
              {results.map((result: Movie) => (
                <SearchResult key={result?.id} result={result} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
