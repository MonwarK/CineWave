'use client';

import { Movie, Episode } from '@/types/Movie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { servers } from '@/utils/servers';
import { getEpisodesGroupedBySeason } from '@/utils/api';
import AvailableServers from './AvailableServers';
import CommentSection from '../comments/CommentSection';
import WatchTopBar from './WatchTopBar';
import VideoSection from './VideoSection';

export default function WatchMoviePage({
  movie,
  isMovie,
  currentEpisode,
}: {
  movie: Movie;
  isMovie: boolean;
  currentEpisode?: { season: number; episode: number };
}) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);
  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const currentServer = servers[currentServerIndex];

  const [episodesBySeason, setEpisodesBySeason] = useState<
    Record<number, Episode[]>
  >({});
  const searchSeasonParam = parseInt(
    searchParams.get('season') || currentEpisode?.season.toString() || '1'
  );
  const initialSeasonValue = movie.seasons?.find(
    x => x.season_number === searchSeasonParam
  )
    ? searchSeasonParam
    : 1;

  const searchEpisodeParam = parseInt(
    searchParams.get('episode') || currentEpisode?.episode.toString() || '1'
  );
  const initialEpisodeValue = movie.seasons?.find(
    x => x.season_number === initialSeasonValue
  )?.episode_count
    ? searchEpisodeParam
    : 1;

  const [season, setSeason] = useState(initialSeasonValue);
  const [episode, setEpisode] = useState(initialEpisodeValue);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  useEffect(() => {
    if (!isMovie) {
      getEpisodesGroupedBySeason(movie.id, movie.seasons).then(res =>
        setEpisodesBySeason(res)
      );
    }
  }, [movie.id]);

  return (
    <div className="flex flex-col">
      <WatchTopBar
        movie={movie}
        isMovie={isMovie}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <div className="max-w-screen-2xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row flex-1 lg:pt-10">
          <VideoSection
            movie={movie}
            isMovie={isMovie}
            season={season}
            episode={episode}
            setSeason={setSeason}
            setEpisode={setEpisode}
            episodesBySeason={episodesBySeason}
            currentServerIndex={currentServerIndex}
            currentServer={currentServer}
            isCommentsLoading={isCommentsLoading}
            setIsCommentsLoading={setIsCommentsLoading}
          />
          <AvailableServers
            isOpen={isOpen}
            currentServer={currentServer}
            setCurrentServerIndex={setCurrentServerIndex}
          />
        </div>
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
