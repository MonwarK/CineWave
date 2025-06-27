import Header from '@/components/main/Header';
import TrendingListPage from '@/components/MoviesListPage.tsx/TrendingListPage';

export const metadata = {
  title: 'Trending Now | Cinewave',
  description:
    'Check out what’s trending in movies and TV shows today. Updated daily on Cinewave.',
};

export default async function TrendingPage() {
  return (
    <div>
      <Header />
      <TrendingListPage />
    </div>
  );
}
