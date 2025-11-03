import Header from '@/components/main/Header';
import MoviesListPage from '@/components/MoviesListPage.tsx/MoviesListPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Shows',
  description:
    'Browse the most popular and trending TV shows right now on Cinewave. Discover your next favorite series today!',
};

export default async function SeriesPage() {
  return (
    <div>
      <Header />

      <MoviesListPage
        title="TV Shows"
        description="Explore thousands of TV shows across every genre, from gripping crime dramas and lively talk shows to captivating anime and more. Whatever you're into, we've got something for you."
        isMovie={false}
      />
    </div>
  );
}
