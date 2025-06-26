'use client';

import React, { useEffect, useState } from 'react';
import Content from '../other/Content';
import Tabs from '../trending/Tabs';
import { fetchTrendingType } from '@/utils/api';
import { Movie } from '@/types/Movie';
import Loader from '../ui/Loader';
import Pagination from './Pagination';

export default function TrendingListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    scrollToTop();

    const fetchMovies = async () => {
      const movieData = await fetchTrendingType('movie', page);
      const seriesData = await fetchTrendingType('tv', page);

      setMovies(movieData);
      setSeries(seriesData);
    };

    fetchMovies().finally(() => setIsLoading(false));
  }, [page]);

  return isLoading ? (
    <Loader />
  ) : (
    <Content>
      <div className="space-y-5">
        <h1 className="text-3xl font-semibold">Trending</h1>
        <p className="text-gray-300">
          Explore a curated selection of the latest trending movies and TV
          shows.
        </p>
      </div>
      <Tabs shows={series} movies={movies} />

      <Pagination page={page} setPage={setPage} maxPage={10} />
    </Content>
  );
}
