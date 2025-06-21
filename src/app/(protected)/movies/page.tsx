import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import MovieLandscapeThumbnail from "@/components/movie-card/MovieLandscapeThumbnail";
import { Movie } from "@/types/Movie";
import { fetchMovies } from "@/utils/api";

export default async function MoviesPage() {
  const movies = await fetchMovies();

  return (
    <div className="bg-zinc-900/50 min-h-screen py-10">
      <Header />

      <div className="pt-20 max-w-screen-xl mx-auto w-full px-7">
        <div className="flex flex-col justify-between space-y-5">
          <div className="px-4 space-y-5">
            <h1 className="text-3xl font-semibold ">Movies</h1>
            <p className="text-gray-300">
              Discover thousands of movies from every genre. From blockbuster
              hits to indie gems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie: Movie) => (
              <MovieLandscapeThumbnail
              mediaType="movie"
                key={`movie-thumbnail-${movie.id}`}
                movie={movie}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
