import Main from '@/components/discover/Main';
import Sections from '@/components/discover/Sections';
import Header from '@/components/main/Header';
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

export const metadata = {
  title: 'Discover Movies & TV Shows | CineWave',
  description:
    'Browse trending, popular, and recommended movies and TV shows on CineWave. Find your next favorite watch.',
};

export default async function page() {
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
