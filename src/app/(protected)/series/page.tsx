import Header from '@/components/main/Header';
import MovieLandscapeThumbnail from '@/components/movie-card/MovieLandscapeThumbnail';
import Content from '@/components/other/Content';
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
    <div>
      <Header />

      <Content>
        <div className="flex flex-col justify-between space-y-10">
          <div className="space-y-5">
            <h1 className="text-3xl font-semibold ">TV Shows</h1>
            <p className="text-gray-300">
              Explore thousands of TV shows across every genre, from gripping
              crime dramas and lively talk shows to captivating anime and more.
              Whatever you&apos;re into, we&apos;ve got something for you.
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
      </Content>
    </div>
  );
}
