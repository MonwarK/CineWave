"use client";

import React, { useState } from "react";
import MovieRowSection from "./MovieRowSection";
import MovieModal from "../movie-modal/MovieModal";

export default function Sections({
  trending,
  popularMovie,
  topRated,
  upcomingMovies,
  popularTv,
  actionMovies,
  comedyShows,
  horrorMovies,
}: any) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <div className="py-10 space-y-18">
        <MovieRowSection
          title="Trending Now"
          movies={trending}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Popular Movies"
          movies={popularMovie}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Top Rated"
          movies={topRated}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Upcoming Movies"
          movies={upcomingMovies}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Popular TV Shows"
          movies={popularTv}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Action Movies"
          movies={actionMovies}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Comedy Shows"
          movies={comedyShows}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Horror Films"
          movies={horrorMovies}
          setSelectedMovie={setSelectedMovie}
        />
      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
