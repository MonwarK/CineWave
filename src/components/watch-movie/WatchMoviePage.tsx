'use client';

import { Episode, Movie } from '@/types/Movie';
import { getEpisodesGroupedBySeason } from '@/utils/api';
import { servers } from '@/utils/servers';
import { ChevronLeft, Menu } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommentSection from '../comments/CommentSection';
import AvailableServers from './AvailableServers';

export default function WatchMoviePage({
  movie,
  isMovie,
}: {
  movie: Movie;
  isMovie: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

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
  document.title = `Watching ${movie.title || movie.name} | CineWave`;

  const currentEpisodeData = episodesBySeason?.[season]?.find(
    ep => ep.episode_number == episode
  );

  // Video src
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    setVideoSrc('');
    setIsCommentsLoading(true);
    if (!movie) return; // guard clause if movie is not loaded

    if (isMovie) {
      const getMovieLink = servers[currentServerIndex].movieLink(movie.id);
      setVideoSrc(getMovieLink);
    } else {
      const getEpisodeLink = servers[currentServerIndex].showLink(
        movie.id,
        season,
        episode
      );
      setVideoSrc(getEpisodeLink);
    }
  }, [season, episode, currentServerIndex, movie, isMovie]);

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
      <div className="bg-black border-b border-zinc-900 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/${isMovie ? 'movies' : 'series'}/${movie.id}`}>
              <div className="text-white hover:text-gray-300 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </Link>
            <Link href="/">
              <div className="text-xl font-bold">CineWave</div>
            </Link>
          </div>

          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-2xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row flex-1 lg:pt-10">
          {/* Video Player Section */}
          <div className="flex-1">
            <div className="lg:px-6">
              <div className="aspect-video max-h-[75vh] mx-auto">
                {videoSrc && (
                  <iframe
                    src={videoSrc}
                    allowFullScreen
                    width="100%"
                    height="100%"
                    className="w-full h-full b"
                    title="Video Player"
                  />
                )}
              </div>
            </div>

            {/* Video Info Section */}
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center">
                <h1 className="text-white text-xl lg:text-2xl font-semibold leading-none">
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
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
                    {movie.seasons && (
                      <select
                        onChange={e => {
                          const assignedSeason = Number(e.target.value);
                          setSeason(assignedSeason);
                          setEpisode(
                            episodesBySeason[assignedSeason][0].episode_number
                          );
                        }}
                        className="bg-zinc-900 p-3 rounded-md tracking-wide outline-0"
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
                      className="bg-zinc-900 p-3 rounded-md tracking-wide outline-0 lg:max-w-xs"
                      value={episode}
                    >
                      {episodesBySeason &&
                        episodesBySeason?.[season]?.map(
                          (ep: Episode, i: number) => (
                            <option
                              key={`season-${season}-episode-${i}`}
                              value={ep.episode_number}
                            >
                              E{ep.episode_number} - {ep.name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
              )}

              {isMovie ? (
                <div className="space-y-2">
                  <div className="font-medium text-lg">Overview</div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {movie.overview}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="font-medium text-lg">
                    S{season} E{episode} - {currentEpisodeData?.name}
                  </div>
                  <div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {currentEpisodeData?.overview}
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
          <AvailableServers
            isOpen={isOpen}
            currentServer={currentServer}
            setCurrentServerIndex={setCurrentServerIndex}
          />
        </div>

        {/* Comments */}
        <CommentSection
          movieId={movie.id}
          isMovie={isMovie}
          episode={episode}
          season={season}
          loading={isCommentsLoading}
          setLoading={setIsCommentsLoading}
        />
      </div>
    </div>
  );
}
