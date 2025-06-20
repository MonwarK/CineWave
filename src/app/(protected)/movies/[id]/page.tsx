import Header from "@/components/main/Header";
import MovieAdditional from "@/components/movie-content/MovieAdditional";
import MovieBanner from "@/components/movie-content/MovieBanner";
import MovieGenres from "@/components/movie-content/MovieGenres";
import MovieProduction from "@/components/movie-content/MovieProduction";
import MovieRating from "@/components/movie-content/MovieRating";
import MovieStatsGrid from "@/components/movie-content/MovieStatsGrid";
import SquaredButton from "@/components/ui/SquaredButton";
import { Movie } from "@/types/Movie";
import { fetchMovieById } from "@/utils/api";
import { Calendar, Clock, Heart, Play, Plus, Share2, Star } from "lucide-react";

type Params = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  console.log(movie);

  return (
    <div>
      <Header />
      <MovieBanner movie={movie} />

      <div className="pt-10 px-5 pb-[1rem] container mx-auto space-y-10">
        {/* Stats */}
        <MovieStatsGrid movie={movie} />

        {/* Genres */}
        <MovieGenres genres={movie.genres} />

        {/* Grid Info */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Rating */}
          <MovieRating movie={movie} />

          {/* Additional */}
          <MovieAdditional movie={movie} />
        </div>

        {/* Production */}
        <MovieProduction movie={movie} />
      </div>
    </div>
  );
}
