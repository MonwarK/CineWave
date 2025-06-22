import Header from "@/components/main/Header";
import Tabs from "@/components/trending/Tabs";
import { fetchPopularMovies, fetchPopularTV } from "@/utils/api";

export default async function TrendingPage() {
    const popularTv = await fetchPopularTV();
    const popularMovies = await fetchPopularMovies(); 

    console.log("TV Shows",popularTv);
    console.log("Movies", popularMovies)
  return (
    <div className="py-10">
        <Header /> 

        <div className="pt-20 max-w-screen-xl mx-auto w-full px-7">
            <h1 className="text-3xl font-semibold">Trending</h1>
            <p className="text-gray-300 text-sm mt-2">View all of the recently trending movies & tv shows.</p>
            <Tabs shows={popularTv} movies={popularMovies} />
        </div>
    </div>
  )
}
