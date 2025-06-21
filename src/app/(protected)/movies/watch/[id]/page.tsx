import React from "react";
import { fetchMovieById } from "@/utils/api";
import { Movie } from "@/types/Movie";
import WatchMoviePage from "@/components/watch-movie/WatchMoviePage";

type Params = Promise<{ id: string }>;

export default async function MovieWatchPage({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  return <WatchMoviePage movie={movie} />;
}
