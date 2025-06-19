import Categories from "@/components/discover/Categories";
import Main from "@/components/discover/Main";
import Sections from "@/components/discover/Sections";
import Header from "@/components/main/Header";
import { useSavedMovies } from "@/context/SavedMoviesProvider";
import {
  fetchActionMovies,
  fetchComedyTV,
  fetchHorrorMovies,
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

  return (
    <div className="bg-zinc-900/50 pb-10 relative">
      <Header />

      <Main
        movie={
          trending ? trending[Math.floor(Math.random() * trending.length)] : []
        }
      />

      <Categories />

      <Sections
        trending={trending}
        popularMovie={popularMovie}
        topRated={topRated}
        upcomingMovies={upcomingMovies}
        popularTv={popularTv}
        actionMovies={actionMovies}
        comedyShows={comedyShows}
        horrorMovies={horrorMovies}
      />
    </div>
  );
}
