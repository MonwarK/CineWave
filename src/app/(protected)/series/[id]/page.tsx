import Header from "@/components/main/Header";
import { fetchTVById } from "@/utils/api";
import {
  Calendar,
  Clock,
  Heart,
  Play,
  Plus,
  Share2,
  Star,
  Tv,
} from "lucide-react";

type Params = Promise<{ id: string }>;

export default async function SeriePage({ params }: { params: Params }) {
  const { id } = await params;

  const serie = await fetchTVById(id);

  console.log(serie);

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
      <div className="pt-[7rem] pb-[1rem] container mx-auto px-4 max-w-8xl">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="overflow-hidden shadow-2xl">
              <img
                src={`https://image.tmdb.org/t/p/w400${serie.backdrop_path}`}
                alt={serie.name}
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div>
                {/* Title & Tagling */}
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {serie.name}
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  {serie.tagline}
                </p>
              </div>

              {/* Rating  & Genre */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(serie.vote_average)}
                  </div>
                  <span className="text-lg font-semibold">
                    {serie.vote_average}/10
                  </span>
                </div>
                <div>
                  <p className="bg-orange-700/50 px-3 py-1 rounded-full">
                    {serie.status}
                  </p>
                </div>
                <div>
                  {serie.adult === true ? (
                    <p className="bg-orange-700/50 px-3 py-1 rounded-full">
                      Adult
                    </p>
                  ) : (
                    <p className="bg-orange-900/50 px-3 py-1 rounded-full">
                      Not Adult
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {serie.genres.map((genre: any) => (
                    <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2 inline-flex items-center  font-semibold">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Now
                </button>
                <button className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2 inline-flex items-center font-semibold">
                  <Plus className="w-5 h-5  mr-2" />
                  Watchlist
                </button>
                <button className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2 inline-flex items-center  font-semibold">
                  <Heart className="w-5 h-5  mr-2" />
                  Favorite
                </button>
                <button className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2 inline-flex items-center  font-semibold">
                  <Share2 className="w-5 h-5  mr-2" />
                  Share
                </button>
              </div>
            </div>
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {serie.overview}
              </p>
            </div>
            {/* Show Info & Series Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Info */}
              <div className="rounded-lg border shadow-sm">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Show Info</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          First Air Date
                        </p>
                        <p className="font-medium">{serie.first_air_date}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Air Date
                        </p>
                        <p className="font-medium">{serie.last_air_date}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Episode Runtime
                        </p>
                        <p className="font-medium">
                          {serie.episode_run_time[0]} Min
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Tv className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Network</p>
                        {serie.networks.map((network: any) => (
                          <p>{network.name}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="rounded-lg border shadow-sm">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Show Stats</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Seasons</p>
                        <p className="font-medium">{serie.number_of_seasons}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Episodes
                        </p>
                        <p className="font-medium">
                          {serie.number_of_episodes}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Created By
                        </p>
                        <p className="font-medium">
                          {serie.created_by.length > 0
                            ? serie.created_by
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Language
                        </p>
                        <p className="font-medium">{serie.languages[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasons */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Seasons</h2>
              <div className="grid gap-4">
                {serie.seasons.map((season: any) => (
                  <div key={season.season_number} className="rounded-lg border">
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
                              {season.air_date.slice(0, 4)}
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
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
