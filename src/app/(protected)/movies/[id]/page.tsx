import Header from '@/components/main/Header';
import MovieAdditional from '@/components/movie-content/MovieAdditional';
import MovieBanner from '@/components/movie-content/MovieBanner';
import MovieCredits from '@/components/movie-content/MovieCredits';
import MovieGenres from '@/components/movie-content/MovieGenres';
import MovieProduction from '@/components/movie-content/MovieProduction';
import MovieRating from '@/components/movie-content/MovieRating';
import MovieStatsGrid from '@/components/movie-content/MovieStatsGrid';
import RecommendedMovies from '@/components/movie-content/RecommendedMovies';
import { Movie } from '@/types/Movie';
import {
  fetchCredits,
  fetchMovieById,
  fetchRecommendations,
} from '@/utils/api';

type Params = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  const similarMovies = await fetchRecommendations(id, 'movie');
  const credits = await fetchCredits(id, 'movie');

  return (
    <div>
      <Header />
      <MovieBanner movie={movie} link={`/movies/watch/${movie.id}`} />

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

        {similarMovies.length > 0 && (
          <RecommendedMovies recommendedMovies={similarMovies} />
        )}

        <MovieCredits credits={credits} />
      </div>
    </div>
  );
}
