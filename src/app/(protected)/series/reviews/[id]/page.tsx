import ReviewPage from '@/components/review/ReviewPage';
import { Movie } from '@/types/Movie';
import { fetchMovieById, fetchTVById } from '@/utils/api';
import React from 'react';

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: any) {
  const movie: Movie = await fetchTVById(params.id);

  return {
    title: `${movie.name} - Reviews | Cinewave`,
    description: `Read and write reviews for ${movie.name} on Cinewave.`,
  };
}

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchTVById(id);

  return <ReviewPage movie={movie} />;
}
