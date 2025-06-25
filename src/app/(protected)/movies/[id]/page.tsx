import Header from '@/components/main/Header';
import MovieAdditional from '@/components/movie-content/MovieAdditional';
import MovieBanner from '@/components/movie-content/MovieBanner';
import MovieCredits from '@/components/movie-content/MovieCredits';
import MovieGenres from '@/components/movie-content/MovieGenres';
import MovieProduction from '@/components/movie-content/MovieProduction';
import MovieRating from '@/components/movie-content/MovieRating';
import MovieStatsGrid from '@/components/movie-content/MovieStatsGrid';
import RecommendedMovies from '@/components/movie-content/RecommendedMovies';
import SquaredButton from '@/components/ui/SquaredButton';
import { supabase } from '@/libs/supabaseClient';
import { Movie } from '@/types/Movie';
import {
  fetchCredits,
  fetchMovieById,
  fetchRecommendations,
} from '@/utils/api';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import Link from 'next/link';

type Params = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  const similarMovies = await fetchRecommendations(id, 'movie');
  const credits = await fetchCredits(id, 'movie');

  const { data, error } = await supabase
    .from('movie_reviews')
    .select('rating', { head: false })
    .eq('movie_id', id);

  const ratings = data?.map(r => r.rating) ?? [];
  const hasRatings = ratings.length > 0;
  const averageRating = (
    ratings.length
      ? parseInt(ratings.reduce((sum, r) => sum + r, 0)) / ratings.length
      : 0
  ).toFixed(1);

  return (
    <div>
      <Header />
      <MovieBanner movie={movie} link={`/movies/watch/${movie.id}`} />

      <div className="pt-10 px-5 pb-[1rem] container mx-auto space-y-10">
        {/* Reviews */}
        <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
          <div className="font-semibold uppercase mb-4">User Reviews</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star
                className="text-orange-400 fill-orange-400 mb-0.5"
                size={16}
              />
              <div className="text-zinc-400 text-sm">
                {hasRatings ? `${averageRating} rating` : 'No Reviews'}
              </div>
            </div>
            <div className="flex gap-5">
              <Link href={`/movies/reviews/${movie.id}`}>
                <SquaredButton variant={hasRatings ? 'primary' : 'secondary'}>
                  {hasRatings ? 'View All Reviews' : 'Leave a Review'}
                </SquaredButton>
              </Link>
            </div>
          </div>
        </div>

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
