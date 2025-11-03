import Main from '@/components/discover/Main';
import Sections from '@/components/discover/Sections';
import Header from '@/components/main/Header';
import { supabase } from '@/libs/supabaseClient';
import {
  fetchActionMovies,
  fetchAiringToday,
  fetchComedyTV,
  fetchHorrorMovies,
  fetchNowPlaying,
  fetchPopularMovies,
  fetchPopularTV,
  fetchTopRated,
  fetchTrending,
  fetchUpcoming,
} from '@/utils/api';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Movies & TV Shows',
  description:
    'Browse trending, popular, and recommended movies and TV shows on CineWave. Find your next favorite watch.',
};

export default async function page() {
  const { userId } = await auth();

  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const trending = await fetchTrending();
  const popularMovie = await fetchPopularMovies();
  const topRated = await fetchTopRated('movie');
  const upcomingMovies = await fetchUpcoming();
  const popularTv = await fetchPopularTV();
  const actionMovies = await fetchActionMovies();
  const comedyShows = await fetchComedyTV();
  const horrorMovies = await fetchHorrorMovies();
  const airingToday = await fetchAiringToday();
  const nowPlaying = await fetchNowPlaying();

  const { data: seriesProgress, error: seriesProgressError } = await supabase
    .from('series_progress')
    .select('*')
    .eq('user_id', userId)
    .gte('updated_at', oneMonthAgo.toISOString())
    .lte('updated_at', now.toISOString())
    .order('updated_at', { ascending: false });

  return (
    <div className="relative">
      <Header />

      <Main
        movie={
          popularMovie
            ? popularMovie[Math.floor(Math.random() * popularMovie.length)]
            : []
        }
      />

      <Sections
        continueWatching={seriesProgress || undefined}
        trending={trending}
        popularMovie={popularMovie}
        topRated={topRated}
        upcomingMovies={upcomingMovies}
        popularTv={popularTv}
        actionMovies={actionMovies}
        comedyShows={comedyShows}
        horrorMovies={horrorMovies}
        airingToday={airingToday}
        nowPlaying={nowPlaying}
      />
    </div>
  );
}
