import Header from '@/components/main/Header';
import Tabs from '@/components/trending/Tabs';
import { fetchTrendingType } from '@/utils/api';

export const metadata = {
  title: 'Trending Now | Cinewave',
  description:
    'Check out what’s trending in movies and TV shows today. Updated daily on Cinewave.',
};

export default async function TrendingPage() {
  const popularTv = await fetchTrendingType('tv');
  const popularMovies = await fetchTrendingType('movie');

  return (
    <div className="py-10">
      <Header />

      <div className="pt-20 max-w-screen-xl mx-auto w-full px-7">
        <div>
          <h1 className="text-3xl font-semibold">Trending</h1>
          <p className="text-gray-300 text-sm mt-2">
            View all of the recently trending movies & tv shows.
          </p>
        </div>
        <Tabs shows={popularTv} movies={popularMovies} />
      </div>
    </div>
  );
}
