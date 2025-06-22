'use client';

import { Episode, Movie } from '@/types/Movie';
import { getEpisodesGroupedBySeason } from '@/utils/api';
import { getEpisodeServer, getMovieServer, servers } from '@/utils/servers';
import classNames from 'classnames';
import { ChevronLeft, Menu } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WatchMoviePage({
  movie,
  isMovie,
}: {
  movie: Movie;
  isMovie: boolean;
}) {
  // Server
  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const currentServer = servers[currentServerIndex];
  const searchParams = useSearchParams();

  // Seasons + Episodes
  const [episodesBySeason, setEpisodesBySeason] = useState<
    Record<number, Episode[]>
  >({});

  const searchSeasonParam = parseInt(searchParams.get('season') || '1');
  const initialSeasonValue = movie.seasons?.find(
    x => x.season_number === searchSeasonParam
  )
    ? searchSeasonParam
    : 1;

  const searchEpisodeParam = parseInt(searchParams.get('episode') || '1');
  const initialEpisodeValue =
    movie.seasons?.find(x => x.season_number === initialSeasonValue)
      ?.episode_count ||
    (0 <= searchEpisodeParam && searchEpisodeParam > 0)
      ? searchEpisodeParam
      : 1;

  const [season, setSeason] = useState(initialSeasonValue);
  const [episode, setEpisode] = useState(initialEpisodeValue);

  // Video src
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    setVideoSrc('');
    if (isMovie) {
      const getMovieLink = getMovieServer(currentServerIndex, movie.id) || '';
      setVideoSrc(getMovieLink);
    } else {
      const getEpisodeLink =
        getEpisodeServer(currentServerIndex, movie.id, season, episode) || '';
      setVideoSrc(getEpisodeLink);
    }
  }, [season, episode, currentServerIndex]);

  useEffect(() => {
    // Call and store in state
    if (isMovie) return;
    getEpisodesGroupedBySeason(movie.id, movie.seasons).then(res =>
      setEpisodesBySeason(res)
    );
  }, [movie.id]);

  return (
    <div className="flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-black border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/${isMovie ? 'movies' : 'series'}/${movie.id}`}>
              <div className="text-white hover:text-gray-300 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </Link>
            <div className="text-xl font-bold">CineWave</div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-screen-2xl w-full mx-auto flex-1">
        {/* Video Player Section */}
        <div className="flex-1">
          <div className="aspect-video">
            {videoSrc && (
              <iframe
                src={videoSrc}
                allowFullScreen
                width="100%"
                height="100%"
                className="w-full h-full"
                title="Video Player"
              />
            )}
          </div>

          {/* Video Info Section */}
          <div className="p-6 space-y-4">
            <div className="md:flex justify-between items-center">
              <h1 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-4">
                {isMovie ? movie.title : movie?.name}
              </h1>
              <div>
                <div className="text-xs text-whtie uppercase bg-orange-600 px-3 py-1 rounded-md font-semibold">
                  Server {currentServer.id}: {currentServer.name}
                </div>
              </div>
            </div>

            {!isMovie && (
              <div>
                <div className="flex justify-between items-center">
                  {movie.seasons && (
                    <select
                      onChange={e => {
                        setSeason(Number(e.target.value));
                        setEpisode(episodesBySeason[season][0].episode_number);
                      }}
                      className="bg-zinc-900 p-3 rounded-md"
                      value={season}
                    >
                      {movie.seasons.map(
                        (season, i) =>
                          season.season_number !== 0 && (
                            <option key={season?.name} value={i}>
                              {season?.name}
                            </option>
                          )
                      )}
                    </select>
                  )}

                  <select
                    onChange={e => setEpisode(Number(e.target.value))}
                    className="bg-zinc-900 p-3 rounded-md"
                    value={episode}
                  >
                    {episodesBySeason &&
                      episodesBySeason?.[season]?.map(
                        (ep: Episode, i: number) => (
                          <option
                            key={`season-${season}-episode-${i}`}
                            value={ep.episode_number}
                          >
                            Episode {ep.episode_number}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="font-medium text-lg">Overview</div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {movie.overview}
              </p>
            </div>

            {!isMovie && (
              <div className="space-y-2">
                <div className="font-medium text-lg">
                  S{season} E{episode} -{' '}
                  {episodesBySeason?.[season]?.[episode - 1]?.name}
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {episodesBySeason?.[season]?.[episode - 1]?.overview}
                  </p>
                </div>
              </div>
            )}

            <div>
              <div className="text-gray-400 text-xs">
                {movie?.production_companies?.[0]?.name}
              </div>
            </div>
          </div>
        </div>

        {/* Available Servers */}
        <div className="lg:w-96 border-l border-gray-800 p-6">
          <h3 className="text-white font-semibold mb-4 uppercase">
            Available Servers
          </h3>

          <div className="space-y-4">
            {servers.map((item, i) => (
              <div
                onClick={() => setCurrentServerIndex(i)}
                key={item.id}
                className={classNames(
                  'p-5 rounded-lg border space-y-1 cursor-pointer',
                  {
                    'bg-zinc-800 border-zinc-500': currentServer.id === item.id,
                    'bg-zinc-900 border-zinc-700 hover:opacity-80':
                      currentServer.id !== item.id,
                  }
                )}
              >
                <h2 className="text-sm">
                  Server {item.id}: {item.name}
                </h2>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
