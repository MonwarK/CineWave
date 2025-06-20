import Header from "@/components/main/Header";
import SquaredButton from "@/components/ui/SquaredButton";
import { Movie } from "@/types/Movie";
import { fetchMovieById } from "@/utils/api";
import { Calendar, Clock, Heart, Play, Plus, Share2, Star } from "lucide-react";

type Params = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = await params;

  const movie: Movie = await fetchMovieById(id);

  console.log(movie);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-5 h-5 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating / 2);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center p-0">
        
        <div className="relative w-full overflow-hidden min-h-[50vh] text-white flex flex-col justify-end">
          {/* Background */}
          <div className="absolute z-0 inset-0 h-full">
            <img
              className="h-full w-full object-cover object-top absolute top-0 left-0 brightness-50 -z-10"
              src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
            />
          </div>

          {/* Information */}
          <div className="relative z-0 p-4 mx-auto w-full container space-y-10 mb-10">
            <div className="space-y-5 lg:w-1/2">
              {/* Title & Tagling */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              <p className="text-xl text-gray-300 italic">
                "{movie.tagline}"
              </p>
              <p>{movie.overview}</p>
            </div>

            {/* Buttons */}
            <div>
              <div className="flex flex-wrap gap-3">
                <SquaredButton>
                  <Play className="w-5 h-5" />
                  <p>Watch Now</p>
                </SquaredButton>
                <SquaredButton variant="secondary">
                  <Plus className="w-5 h-5" />
                  <p>Watchlist</p>
                </SquaredButton>
                <SquaredButton variant="secondary">
                  <Heart className="w-5 h-5" />
                  <p>Favorite</p>
                </SquaredButton>
                <SquaredButton variant="secondary">
                  <Share2 className="w-5 h-5 " />
                  <p>Share</p>
                </SquaredButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 px-5 pb-[1rem] container mx-auto space-y-10">
        {/* Grid Info */}
        <div className="grid grid-cols-2 gap-10">
          {/* Rating */}
          <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div className="space-y-5">
              <div className="text-xl uppercase font-semibold">
                TMDB Rating
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="font-semibold text-sm flex items-center gap-4">
                  <div>
                    TheMovieDB ({movie.vote_average.toFixed(1)}/10)
                  </div>
                </div>
                <div className="flex items-center">
                  {renderStars(movie.vote_average)}
                </div>
              </div>

              <hr className="border-gray-500" />

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-zinc-700 p-5 rounded-lg border border-zinc-600 text-center">
                  <p>{movie.vote_count}</p>
                  <p>Vote Count</p>
                </div>
                <div className="bg-zinc-700 p-5 rounded-lg border border-zinc-600 text-center">
                  <p>{Math.round(movie.popularity)}</p>
                  <p>Popularity</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mb-7">
          
          <div className="flex space-x-2">
            <div>
              <p className="bg-orange-700/50 px-3 py-1 rounded-full">
                {movie.status}
              </p>
            </div>
            <div>
              {movie.adult === true ? (
                <p className="bg-orange-700/50 px-3 py-1 rounded-full">
                  Adult
                </p>
              ) : (
                <p className="bg-orange-900/50 px-3 py-1 rounded-full">
                  Not Adult
                </p>
              )}
            </div>
          </div>
        </div>


        {/* Grid Info */}
        <div className="grid lg:grid-cols-3 gap-3">
          {/* Release Date */}
          <div className="flex justify-between gap-3 items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div>
              <p className="text-sm text-gray-400">
                Release Date
              </p>
              <p className="font-medium">
                {new Date(movie.release_date).toDateString()}
              </p>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Runtime */}
          <div className="flex justify-between gap-3 items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div className="flex gap-3 items-center">
              <div>
                <p className="text-sm text-gray-400">Runtime</p>
                <p className="font-medium">{movie.runtime} Min</p>
              </div>
            </div>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Status */}
          <div className="flex justify-between gap-3 items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div className="flex gap-3 items-center">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="font-medium">Released</p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="flex gap-3 items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div>
              <p className="text-sm text-gray-400">Budget</p>
              <p className="font-medium">
                {movie.budget
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      trailingZeroDisplay: "stripIfInteger"
                    }).format(movie.budget)
                  : "Unknown"}
              </p>
            </div>
          </div>

          {/* Revenue */}
          <div className="flex gap-3 items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div>
              <p className="text-sm text-gray-400">Revenue</p>
              <p className="font-medium">
                {movie.budget
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      trailingZeroDisplay: "stripIfInteger"
                    }).format(movie.revenue)
                  : "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
            <div>
              <p className="text-sm text-gray-400">Language</p>
              <p className="font-medium">
                {movie.spoken_languages?.map(x => x.iso_639_1).join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
          <div className="space-y-8">
            <div className="text-2xl font-semibold">
              Genres
            </div>
            <div className="flex gap-4">
              {movie.genres.map((genre: any) => (
                <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production */}
        <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
          <div className="space-y-8">
            <div className="text-2xl font-semibold">
              Production Companies
            </div>
            <div className="flex gap-4">
              {movie.production_companies?.map((company: any) => (
                <div className="flex items-center flex-col gap-3 w-32 text-center">
                  <div className="w-20 h-20 grid place-items-center rounded-full bg-gray-500">
                    <p className="text-2xl">{company.name.split(" ").map((x: string) => x.charAt(0))}</p>
                  </div>
                  <p className="font-medium text-xs">{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
