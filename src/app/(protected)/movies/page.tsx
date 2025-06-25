import Header from '@/components/main/Header';
import MovieLandscapeThumbnail from '@/components/movie-card/MovieLandscapeThumbnail';
import Content from '@/components/other/Content';
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
    <div>
      <Header />

      <Content>
        <div className="flex flex-col justify-between space-y-10">
          <div className="space-y-5">
            <h1 className="text-3xl font-semibold ">Movies</h1>
            <p className="text-gray-300">
              Explore thousands of movies across every genre, from blockbuster
              hits to hidden indie gems. Whatever your taste, there&apos;s
              something waiting for you.
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
      </Content>
    </div>
  );
}
