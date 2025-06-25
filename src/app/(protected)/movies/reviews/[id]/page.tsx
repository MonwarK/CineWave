import ReviewPage from '@/components/review/ReviewPage';
import { Movie } from '@/types/Movie';
import { fetchMovieById } from '@/utils/api';
import React from 'react';

type Params = Promise<{ id: string }>;

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  return <ReviewPage movie={movie} />;
}
