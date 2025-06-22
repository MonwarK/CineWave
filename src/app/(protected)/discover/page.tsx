import Main from "@/components/discover/Main";
import Sections from "@/components/discover/Sections";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
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
} from "@/utils/api";

export default async function page() {
  const trending = await fetchTrending();
  const popularMovie = await fetchPopularMovies();
  const topRated = await fetchTopRated();
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
          trending ? trending[Math.floor(Math.random() * trending.length)] : []
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
