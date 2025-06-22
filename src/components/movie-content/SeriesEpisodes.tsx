'use client';
import { Episode, Season } from '@/types/Movie';
import { getEpisodesGroupedBySeason } from '@/utils/api';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SquaredButton from '../ui/SquaredButton';

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
  const [visibleEpisodes, setVisibleEpisodes] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    // Call and store in state
    getEpisodesGroupedBySeason(id, seasons).then(res =>
      setEpisodesBySeason(res)
    );
  }, [id]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{`Seasons (${seasons.length})`}</h2>
      <div className="grid gap-4">
        {seasons.map((season: Season) => {
          const isActive = activeSeason === season.season_number;

          if (season.season_number === 0) return;

          return (
            <div
              key={season.season_number}
              className="bg-zinc-900 p-5 rounded-lg border border-zinc-700"
            >
              <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Season Number */}
                  <div className="h-16 w-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-lg">
                      {season.season_number}
                    </span>
                  </div>

                  {/* Season Information */}
                  <div className="flex-1">
                    <h4>{season.name}</h4>
                    <p>
                      {season.episode_count} episodes •{' '}
                      {season.air_date
                        ? new Date(season.air_date).getFullYear()
                        : null}
                    </p>
                  </div>
                  {season.vote_average > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{season.vote_average}</span>
                    </div>
                  )}
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      const seasonNum = season.season_number;
                      setActiveSeason(isActive ? null : seasonNum);

                      // If this season isn't in visibleEpisodes yet, set default visible count
                      if (!visibleEpisodes[seasonNum]) {
                        setVisibleEpisodes(prev => ({
                          ...prev,
                          [seasonNum]: 20,
                        }));
                      }
                    }}
                  >
                    {isActive ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

             
                  <React.Fragment>
                    <motion.div
                    animate={ isActive ? { height: "auto", opacity: 1 } :  { height: 0, opacity: 0}}
                   >
                      <div  className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-4 pt-8">
                      {isActive && episodesBySeason[season.season_number]
                        .slice(0, visibleEpisodes[season.season_number] || 0)
                        .map((ep: Episode, i: any) => (
                          <div
                            key={ep.id || i}
                            className=" bg-black/60 rounded-md border border-zinc-700 overflow-hidden"
                          >
                            <div className="h-full">
                              <div className="flex flex-col h-full">
                                <div>
                                  {/* Thumbnail */}
                                  {ep.still_path ? (
                                    <img
                                      src={`https://image.tmdb.org/t/p/w1920${ep.still_path}`}
                                      className="aspect-video overflow-hidden relative"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="w-full h-[200px] bg-gray-800 rounded-md" />
                                  )}
                                </div>

                                <div className="p-4 flex flex-col gap-2 flex-1">
                                  {/* Episode Name */}
                                  <div>
                                    <h2 className="text-lg font-bold leading-tight">
                                      Episode {ep.episode_number} - {ep.name}
                                    </h2>
                                  </div>

                                  {/* Ratings */}
                                  <div>
                                    <div>
                                      <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-2">
                                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                          <span className="font-medium text-yellow-400">
                                            {ep.vote_average
                                              ? ep.vote_average
                                              : 'No Rating'}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <span className="font-medium text-xs text-gray-400">
                                            {new Date(
                                              ep.air_date
                                            ).toDateString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Overview */}
                                  <div className="flex-1 pb-5">
                                    <p className="text-sm line-clamp-4">
                                      {ep.overview}
                                    </p>
                                  </div>

                                  {/* Watch */}
                                  <div>
                                    <Link
                                      href={{
                                        pathname: `/series/watch/${id}`,
                                        query: {
                                          season: season.season_number,
                                          episode: ep.episode_number,
                                        },
                                      }}
                                    >
                                      <SquaredButton className="w-full justify-center">
                                        <Play className="w-5 h-5" />
                                        <p>Watch Now</p>
                                      </SquaredButton>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    {isActive && season.episode_count >=
                      visibleEpisodes[season.season_number] && (
                      <div className="flex justify-center">
                        <SquaredButton
                        className='mt-6'
                        variant='secondary'
                          onClick={() =>
                            setVisibleEpisodes(prev => ({
                              ...prev,
                              [season.season_number]:
                                prev[season.season_number] + 20,
                            }))
                          }
                        >
                          Load More Episodes
                        </SquaredButton>
                      </div>
                    )}
                  </React.Fragment>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
