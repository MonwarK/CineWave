import Header from '@/components/main/Header';
import Content from '@/components/other/Content';
import WatchlistSection from '@/components/watchlist/WatchlistSection';
import { supabase } from '@/libs/supabaseClient';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'My Saved List | Cinewave',
  description:
    'View your saved movies and TV shows on Cinewave. Continue watching or pick up where you left off.',
};

export default async function ListPage() {
  const { userId } = await auth();

  const { data: seriesProgress, error: seriesProgressError } = await supabase
    .from('series_progress')
    .select('*')
    .eq('user_id', userId);

  return (
    <div>
      <Header />
      <Content>
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold">Your WatchList</h1>
          <p className="text-gray-300">
            Build your own personal cinema lineup. Whether you're planning a
            weekend binge or just bookmarking something for later, your
            Watchlist keeps everything you care about in one easy-to-access hub.
          </p>
        </div>
        <WatchlistSection seriesProgress={seriesProgress || []} />
      </Content>
    </div>
  );
}
