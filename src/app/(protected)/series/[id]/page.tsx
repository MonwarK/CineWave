import Header from '@/components/main/Header';
import MovieAdditional from '@/components/movie-content/MovieAdditional';
import MovieBanner from '@/components/movie-content/MovieBanner';
import MovieCredits from '@/components/movie-content/MovieCredits';
import MovieGenres from '@/components/movie-content/MovieGenres';
import MovieRating from '@/components/movie-content/MovieRating';
import MovieStatsGrid from '@/components/movie-content/MovieStatsGrid';
import SeriesEpisodes from '@/components/movie-content/SeriesEpisodes';
import ShowInfo from '@/components/movie-content/ShowInfo';
import { fetchCredits, fetchRecommendations, fetchTVById } from '@/utils/api';
import RecommendedMovies from '@/components/movie-content/RecommendedMovies';
import { Star } from 'lucide-react';
import SquaredButton from '@/components/ui/SquaredButton';
import Link from 'next/link';
import { supabase } from '@/libs/supabaseClient';
import { auth } from '@clerk/nextjs/server';

type Params = Promise<{ id: string }>;

export default async function SeriePage({ params }: { params: Params }) {
  const { userId } = await auth();
  const { id } = await params;
  const show = await fetchTVById(id);

  const recommendedMovies = await fetchRecommendations(id, 'tv');
  const credits = await fetchCredits(id, 'tv');

  const { data: reviews, error: reviewsError } = await supabase
    .from('movie_reviews')
    .select('rating', { head: false })
    .eq('movie_id', id)
    .eq('is_movie', false);

  const { data: seriesProgress, error: seriesProgressError } = await supabase
    .from('series_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('show_id', id);

  const ratings = reviews?.map(r => r.rating) ?? [];
  const hasRatings = ratings.length > 0;
  const averageRating = (
    ratings.length
      ? parseInt(ratings.reduce((sum, r) => sum + r, 0)) / ratings.length
      : 0
  ).toFixed(1);

  const currentEpisode = {
    season: seriesProgress?.[0]?.season || 1,
    episode: seriesProgress?.[0]?.episode || 1,
  };

  return (
    <div>
      <Header />
      <MovieBanner
        movie={show}
        currentEpisode={currentEpisode}
        link={`/series/watch/${id}?season=${currentEpisode.season}&episode=${currentEpisode.episode}`}
      />

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
              <Link href={`/series/reviews/${show.id}`}>
                <SquaredButton variant={hasRatings ? 'primary' : 'secondary'}>
                  {hasRatings ? 'View All Reviews' : 'Leave a Review'}
                </SquaredButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <MovieStatsGrid movie={show} />

        <MovieGenres genres={show.genres} />

        {/* Grid Info */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Rating */}
          <MovieRating movie={show} />

          {/* Additional */}
          <MovieAdditional movie={show} />
        </div>

        <div>
          <div className="space-y-6">
            {/* Show Info & Series Stats */}
            <div>
              {/* Info */}
              <ShowInfo show={show} />
            </div>

            <SeriesEpisodes seasons={show.seasons} id={show.id} />
          </div>
        </div>

        {recommendedMovies.length > 0 && (
          <RecommendedMovies recommendedMovies={recommendedMovies} />
        )}

        <MovieCredits credits={credits} />
      </div>
    </div>
  );
}
