import Header from '@/components/main/Header';
import MovieLandscapeThumbnail from '@/components/movie-card/MovieLandscapeThumbnail';
import { Movie } from '@/types/Movie';
import { fetchTopRated } from '@/utils/api';

export const metadata = {
  title: 'TV Shows | Cinewave',
  description:
    'Browse the most popular and trending TV shows right now on Cinewave. Discover your next favorite series today!',
};

export default async function SeriesPage() {
  const series = await fetchTopRated('tv');

  return (
    <div className="py-10">
      <Header />

      <div className="pt-20 max-w-screen-xl mx-auto w-full px-7">
        <div className="flex flex-col justify-between space-y-5">
          <div className="px-4 space-y-5">
            <h1 className="text-3xl font-semibold ">TV Shows</h1>
            <p className="text-gray-300">
              Discover thousands of tv shows from every genre, from talk shows
              to crime shows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {series.map((serie: Movie) => (
              <MovieLandscapeThumbnail
                key={`movie-thumbnail-${serie.id}`}
                isMovie={false}
                movie={serie}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
