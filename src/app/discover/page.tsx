import Categories from "@/components/discover/Categories";
import Main from "@/components/discover/Main";
import MovieRowSection from "@/components/discover/MovieRowSection";
import Header from "@/components/main/Header";
import {
  fetchActionMovies,
  fetchComedyTV,
  fetchHorrorMovies,
  fetchPopularMovies,
  fetchPopularTV,
  fetchTopRated,
  fetchTrending,
  fetchUpcoming,
} from "@/utils/api";
import React from "react";

export default async function page() {
  const trending = await fetchTrending();
  const popularMovie = await fetchPopularMovies();
  const topRated = await fetchTopRated();
  const upcomingMovies = await fetchUpcoming();
  const popularTv = await fetchPopularTV();
  const actionMovies = await fetchActionMovies();
  const comedyShows = await fetchComedyTV();
  const horrorMovies = await fetchHorrorMovies();

  return (
    <div className="bg-zinc-900/50 pb-10 relative">
      <Header />

      <Main />

      <Categories />

      <div className="py-10 space-y-18">
        <MovieRowSection title="Trending Now" movies={trending} />
        <MovieRowSection title="Popular Movies" movies={popularMovie} />
        <MovieRowSection title="Top Rated" movies={topRated} />
        <MovieRowSection title="Upcoming Movies" movies={upcomingMovies} />
        <MovieRowSection title="Popular TV Shows" movies={popularTv} />
        <MovieRowSection title="Action Movies" movies={actionMovies} />
        <MovieRowSection title="Comedy Shows" movies={comedyShows} />
        <MovieRowSection title="Horror Films" movies={horrorMovies} />
      </div>
    </div>
  );
}
