import Header from '@/components/main/Header';
import Content from '@/components/other/Content';
import WatchlistSection from '@/components/watchlist/WatchlistSection';

export const metadata = {
  title: 'My Saved List | Cinewave',
  description:
    'View your saved movies and TV shows on Cinewave. Continue watching or pick up where you left off.',
};

export default function ListPage() {
  return (
    <div>
      <Header />
      <Content>
        <h1 className="leading-2 text-3xl font-semibold text-center">
          Your Watchlist
        </h1>
        <WatchlistSection />
      </Content>
    </div>
  );
}
