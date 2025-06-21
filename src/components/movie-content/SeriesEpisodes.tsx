"use client";
import { Episode, Season } from "@/types/Movie";
import { getEpisodesGroupedBySeason } from "@/utils/api";
import { Calendar, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function SeriesEpisodes({
  seasons,
  id,
}: {
  seasons: Season[];
  id: number;
}) {
  const [activeSeason, setActiveSeason] = useState<number | null>(null);
  const [episodesBySeason, setEpisodesBySeason] = useState<
    Record<number, Episode[]>
  >({});

  useEffect(() => {
    // Call and store in state
    getEpisodesGroupedBySeason(id, seasons).then((res) =>
      setEpisodesBySeason(res)
    );
  }, [id]);

  // console.log(seasons);
  console.log("Seasons Eps", episodesBySeason);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{`Seasons (${seasons.length})`}</h2>
      <div className="grid gap-4">
        {seasons.map((season: Season) => {
          const isActive = activeSeason === season.season_number;

          return (
            <div
              key={season.season_number}
              className="bg-zinc-900 p-5 rounded-lg border border-zinc-700 cursor-pointer"
              onClick={() =>
                setActiveSeason(isActive ? null : season.season_number)
              }
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-lg">
                        {season.season_number}
                      </span>
                    </div>
                    <div>
                      <h4>{season.name}</h4>
                      <p>
                        {season.episode_count} episodes •{" "}
                        {season.air_date
                          ? new Date(season.air_date).getFullYear()
                          : null}
                      </p>
                    </div>
                  </div>
                  {season.vote_average > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{season.vote_average}</span>
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4 pt-8">
                    {episodesBySeason[season.season_number].map(
                      (ep: Episode, i: any) => (
                        <div
                          key={ep.id || i}
                          className=" bg-zinc-700 rounded-md border border-transparent overflow-hidden"
                        >
                          <div>
                          {ep.still_path ? (
                              <img
                              src={`https://image.tmdb.org/t/p/w1920${ep.still_path}`}
                              className="aspect-video overflow-hidden relative"
                              loading="lazy"
                            />
                          ) : (
                      <div className="w-full h-[200px] bg-gray-800 rounded-md" />

                          )}

                            <div className="p-4 flex flex-col gap-2">
                              <h2 className="text-xl font-bold leading-tight">
                                Episode {ep.episode_number}: {ep.name}
                              </h2>
                              <div>
                              <p className="text-xs">{ep.overview}</p>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-row justify-between">
                                <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{ep.vote_average ? ep.vote_average : "No Rating"}</span>    
                                </div>
                                <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 " />
                                <span className="font-medium">{new Date(ep.air_date).toLocaleDateString()}</span>    
                                </div>
                                </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
