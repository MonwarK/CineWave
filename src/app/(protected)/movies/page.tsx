import Header from '@/components/main/Header';
import MovieLandscapeThumbnail from '@/components/movie-card/MovieLandscapeThumbnail';
import { Movie } from '@/types/Movie';
import { fetchTopRated } from '@/utils/api';

export const metadata = {
  title: 'Movies | Cinewave',
  description:
    'Browse the most popular and trending Movies right now on Cinewave. Discover your next favorite movies today!',
};

export default async function MoviesPage() {
  const movies = await fetchTopRated('movie');

  return (
    <div className="py-10">
      <Header />

      <div className="pt-20 max-w-screen-xl mx-auto w-full px-7">
        <div className="flex flex-col justify-between space-y-5">
          <div className="px-4 space-y-5">
            <h1 className="text-3xl font-semibold ">Movies</h1>
            <p className="text-gray-300">
              Discover thousands of movies from every genre. From blockbuster
              hits to indie gems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie: Movie) => (
              <MovieLandscapeThumbnail
                isMovie={true}
                key={`movie-thumbnail-${movie.id}`}
                movie={movie}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
