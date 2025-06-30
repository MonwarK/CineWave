import Header from '@/components/main/Header';
import TrendingListPage from '@/components/MoviesListPage.tsx/TrendingListPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trending Now',
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
