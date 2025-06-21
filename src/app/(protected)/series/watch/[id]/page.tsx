import React from "react";
import { fetchMovieById, fetchTVById } from "@/utils/api";
import { Movie } from "@/types/Movie";
import WatchMoviePage from "@/components/watch-movie/WatchMoviePage";

type Params = Promise<{ id: string }>;

export default async function MovieWatchPage({ params }: { params: Params }) {
  const { id } = await params;
  const show: Movie = await fetchTVById(id);

  return <WatchMoviePage movie={show} isMovie={false} />;
}
