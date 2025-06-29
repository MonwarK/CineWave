'use client';

import { Movie } from '@/types/Movie';
import { useState } from 'react';
import MovieModal from '../movie-modal/MovieModal';
import MovieRowSection from './MovieRowSection';
import { SeriesProgress } from '@/types/SeriesProgress';
import ContinueWatching from '../watchlist/ContinueWatching';

interface Props {
  continueWatching?: SeriesProgress[];
  trending: Movie[];
  popularMovie: Movie[];
  topRated: Movie[];
  upcomingMovies: Movie[];
  popularTv: Movie[];
  actionMovies: Movie[];
  comedyShows: Movie[];
  horrorMovies: Movie[];
  airingToday?: Movie[];
  nowPlaying: Movie[];
}

export default function Sections({
  continueWatching,
  trending,
  popularMovie,
  topRated,
  upcomingMovies,
  popularTv,
  actionMovies,
  comedyShows,
  horrorMovies,
  airingToday,
  nowPlaying,
}: Props) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <div className="py-16 space-y-18 max-w-screen-xl w-full mx-auto px-5">
        {continueWatching && continueWatching?.length > 0 && (
          <ContinueWatching
            continueWatching={continueWatching}
            showToggle={false}
          />
        )}
        <MovieRowSection
          title="Shows Airing Today"
          movies={airingToday}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieRowSection
          title="Movies In Cinema"
          movies={nowPlaying}
          setSelectedMovie={setSelectedMovie}
        />
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
