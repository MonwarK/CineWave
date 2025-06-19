import Header from "@/components/main/Header";
import SeriesSection from "@/components/other/SeriesSection";
import { fetchMovies } from "@/utils/api";

export default async function MoviesPage() {
    const movies = await fetchMovies();
    console.log(movies)
  return (
    <div>
        <Header />
        
        <div className="pt-[7rem] container max-w-6xl mx-auto flex flex-col">
        <h1 className="leading-2 text-3xl font-semibold text-center">Movies</h1>

            <SeriesSection
            series={movies} 
            />
        </div>
    </div>
  )
}
