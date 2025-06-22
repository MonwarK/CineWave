import Header from '@/components/main/Header';
import MovieAdditional from '@/components/movie-content/MovieAdditional';
import MovieBanner from '@/components/movie-content/MovieBanner';
import MovieCredits from '@/components/movie-content/MovieCredits';
import MovieGenres from '@/components/movie-content/MovieGenres';
import MovieRating from '@/components/movie-content/MovieRating';
import MovieStatsGrid from '@/components/movie-content/MovieStatsGrid';
import SeriesEpisodes from '@/components/movie-content/SeriesEpisodes';
import ShowInfo from '@/components/movie-content/ShowInfo';
import SimilarMovies from '@/components/movie-content/SimilarMovies';
import { fetchCredits, fetchSimilar, fetchTVById } from '@/utils/api';

type Params = Promise<{ id: string }>;

export default async function SeriePage({ params }: { params: Params }) {
  const { id } = await params;
  const show = await fetchTVById(id);

  const similarMovies = await fetchSimilar(id, 'tv');
  const credits = await fetchCredits(id, 'tv');

  console.log(show);

  return (
    <div>
      <Header />
      <MovieBanner movie={show} link={`/series/watch/${id}`} />

      <div className="pt-10 px-5 pb-[1rem] container mx-auto space-y-10">
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

        {similarMovies.length > 0 && (
          <SimilarMovies similarMovies={similarMovies} />
        )}

        <MovieCredits credits={credits} />
      </div>
    </div>
  );
}
