import Header from "@/components/main/Header";
import { fetchMovieById } from "@/utils/api";
import { Calendar, Clock, Heart, Play, Plus, Share2, Star } from "lucide-react";

type Params = Promise<{id: string}>

export default async function MoviePage({ params}: {params: Params}) {

    const { id } = await params;

    const movie = await fetchMovieById(id);

    console.log(movie)

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
        <div className="pt-[7rem] pb-[1rem] container mx-auto max-w-8xl">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="overflow-hidden shadow-2xl">
              <img
                src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
                alt={movie.name}
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div>
                {/* Title & Tagling */}
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {movie.original_title}
                </h1>
                <p className="text-xl text-muted-foreground italic">
                  {movie.tagline}
                </p>
              </div>

              {/* Rating  & Genre */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(movie.vote_average)}
                  </div>
                  <span className="text-lg font-semibold">
                    {movie.vote_average}/10
                  </span>
                </div>
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
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre: any) => (
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
                {movie.overview}
              </p>
            </div>
            {/* Show Info & Series Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Movie Info</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          First Air Date
                        </p>
                        <p className="font-medium">{movie.release_date}</p>
                      </div>
                    </div>
         
                    <div className="flex gap-3 items-center">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Runtime
                        </p>
                        <p className="font-medium">
                          {movie.runtime} Min
                        </p>
                      </div>
                    </div>
               
                  </div>
                </div>
              </div>
              <div className="rounded-lg border shadow-sm"> 
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Box Office</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">{movie.budget}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium">{movie.revenue}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        {movie.spoken_languages.map((language:any) => (
                          <p className="font-medium">{language.name}</p>
                        ))}
                      </div>
                    </div>
                 
                  </div>
                </div>
              </div>
              
            </div>
            <div>
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">Production Companies</div>
                  <div className="flex gap-4">
                    {movie.production_companies.map((company: any) => (
                      <div className="flex items-center">
                  
                <p className="font-medium">{company.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            {/* Seasons */}
            {/* <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Seasons</h2>
                <div className="grid gap-4">
                    {serie.seasons.map((season:any) => (
                        <div key={season.season_number} className="rounded-lg border">
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
                                            <span className="font-boldtext-lg">{season.season_number}</span>
                                        </div>
                                        <div>
                                        <h4>{season.name}</h4>
                                        <p>{season.episode_count} episodes • {season.air_date.slice(0,4)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{season.vote_average}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
          </div>
       </div>
        </div>
    </div>
  )
}
