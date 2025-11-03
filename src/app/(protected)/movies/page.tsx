import Header from '@/components/main/Header';
import MoviesListPage from '@/components/MoviesListPage.tsx/MoviesListPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
  description:
    'Browse the most popular and trending Movies right now on Cinewave. Discover your next favorite movies today!',
};

export default async function MoviesPage() {
  return (
    <div>
      <Header />
      <MoviesListPage
        title="Movies"
        description="Explore thousands of movies across every genre, from blockbuster hits to hidden indie gems. Whatever your taste, there's something waiting for you."
        isMovie={true}
      />
    </div>
  );
}
