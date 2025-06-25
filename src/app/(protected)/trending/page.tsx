import Header from '@/components/main/Header';
import Content from '@/components/other/Content';
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
    <div>
      <Header />

      <Content>
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold">Trending</h1>
          <p className="text-gray-300">
            Explore a curated selection of the latest trending movies and TV
            shows.
          </p>
        </div>
        <Tabs shows={popularTv} movies={popularMovies} />
      </Content>
    </div>
  );
}
