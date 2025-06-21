import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import MovieAdditional from "@/components/movie-content/MovieAdditional";
import MovieBanner from "@/components/movie-content/MovieBanner";
import MovieCredits from "@/components/movie-content/MovieCredits";
import MovieGenres from "@/components/movie-content/MovieGenres";
import MovieRating from "@/components/movie-content/MovieRating";
import MovieStatsGrid from "@/components/movie-content/MovieStatsGrid";
import ShowInfo from "@/components/movie-content/ShowInfo";
import SimilarMovies from "@/components/movie-content/SimilarMovies";
import { fetchTVById, getCredits, getSimilar } from "@/utils/api";
import { Star } from "lucide-react";

type Params = Promise<{ id: string }>;

export default async function SeriePage({ params }: { params: Params }) {
  const { id } = await params;
  const show = await fetchTVById(id);

  const similarMovies = await getSimilar(id, "tv");
  const credits = await getCredits(id, "tv");

  return (
    <div>
      <Header />
      <MovieBanner movie={show} link={`/series/watch/${id}`} />

      <div className="pt-10 px-5 pb-[1rem] container mx-auto space-y-10">
        {/* Stats */}
        <MovieStatsGrid movie={show} />

        <MovieGenres genres={show.genres} />

        {/* Grid Info */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Rating */}
          <MovieRating movie={show} />

          {/* Additional */}
          <MovieAdditional movie={show} />
        </div>

        <div>
          <div className="space-y-6">
            {/* Show Info & Series Stats */}
            <div>
              {/* Info */}
              <ShowInfo show={show} />
            </div>

            {/* Seasons */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{`Seasons (${show.seasons.length})`}</h2>
              <div className="grid gap-4">
                {show.seasons.map((season: any) => (
                  <div
                    key={season.season_number}
                    className="bg-zinc-900 p-5 rounded-lg border border-zinc-700"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
                            <span className="font-boldtext-lg">
                              {season.season_number}
                            </span>
                          </div>
                          <div>
                            <h4>{season.name}</h4>
                            <p>
                              {season.episode_count} episodes •{" "}
                              {season.air_date
                                ? season.air_date.slice(0, 4)
                                : ""}
                            </p>
                          </div>
                        </div>
                        {season.vote_average > 0 ? (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {season.vote_average}
                            </span>
                          </div>
                        ) : (
                          null
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <SimilarMovies similarMovies={similarMovies} />

        <MovieCredits credits={credits} />
      </div>
      <Footer />
    </div>
  );
}
