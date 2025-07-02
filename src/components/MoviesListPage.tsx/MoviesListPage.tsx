'use client';

import React, { useEffect, useState } from 'react';
import Content from '../other/Content';
import MovieLandscapeThumbnail from '../movie-card/MovieLandscapeThumbnail';
import { Movie } from '@/types/Movie';
import { fetchTopRated } from '@/utils/api';
import Pagination from './Pagination';
import Loader from '../ui/Loader';

export default function MoviesListPage({
  title,
  description,
  isMovie,
}: {
  title: string;
  description: string;
  isMovie: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    scrollToTop();

    const fetchMovies = async () => {
      const movieData = await fetchTopRated(isMovie ? 'movie' : 'tv', page);
      setMovies(movieData);
    };

    fetchMovies().finally(() => {
      setIsLoading(false);
    });
  }, [page]);

  return isLoading ? (
    <Loader />
  ) : (
    <Content>
      <div className="flex flex-col justify-between space-y-10">
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold ">{title}</h1>
          <p className="text-gray-300">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie: Movie) => (
            <MovieLandscapeThumbnail
              isMovie={isMovie}
              key={`movie-thumbnail-${movie.id}`}
              movie={movie}
            />
          ))}
        </div>
      </div>

      <Pagination page={page} setPage={setPage} maxPage={10} />
    </Content>
  );
}
