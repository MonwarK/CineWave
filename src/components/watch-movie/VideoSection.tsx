import { useEffect, useState } from 'react';
import { servers } from '@/utils/servers';
import VideoPlayer from './VideoPlayer';
import EpisodeSelector from './EpisodeSelector';
import Overview from './Overview';
import { Episode } from '@/types/Movie';

export default function VideoSection({ ...props }) {
  const {
    movie,
    isMovie,
    season,
    episode,
    setSeason,
    setEpisode,
    episodesBySeason,
    currentServerIndex,
    currentServer,
    setIsCommentsLoading,
  } = props;

  const [videoSrc, setVideoSrc] = useState('');
  const currentEpisodeData = episodesBySeason?.[season]?.find(
    (ep: Episode) => ep.episode_number == episode
  );

  useEffect(() => {
    // Reset page content
    setVideoSrc('');
    setIsCommentsLoading(true);

    if (!movie) return;

    const link = isMovie
      ? servers[currentServerIndex].movieLink(movie.id)
      : servers[currentServerIndex].showLink(movie.id, season, episode);

    setVideoSrc(link);
  }, [season, episode, currentServerIndex, movie, isMovie]);

  function getNextEpisode() {
    // Grab next episode in season
    const next = episodesBySeason?.[season]?.find(
      (x: Episode) => x.episode_number === episode + 1
    );

    // If there's a next episode
    if (next) return { season, episode: next.episode_number };

    // If there's no next episode in season, go to next season (if there is another)
    if (season + 1 <= movie.number_of_seasons) {
      return {
        season: season + 1,
        episode: episodesBySeason[season + 1]?.[0]?.episode_number,
      };
    }

    // Return undefined if there is no episode
    return undefined;
  }

  const nextEpisode = getNextEpisode();

  // Track series progress
  const saveProgress = async (season: number, episode: number) => {
    await fetch('/api/series-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ show_id: movie.id, season, episode }),
    });
  };

  return (
    <div className="flex-1">
      <VideoPlayer
        videoSrc={videoSrc}
        saveProgress={isMovie ? undefined : saveProgress}
        showId={isMovie ? undefined : movie.id}
        runtime={isMovie ? undefined : currentEpisodeData?.runtime}
        season={isMovie ? undefined : season}
        episode={isMovie ? undefined : episode}
        nextEpisode={isMovie ? undefined : nextEpisode}
      />
      <div className="p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl lg:text-2xl font-semibold leading-none">
            {isMovie ? movie.title : movie?.name}
          </h1>
          <div className="text-xs text-white uppercase bg-orange-600 px-3 py-1 rounded-md font-semibold">
            Server {currentServer.id}: {currentServer.name}
          </div>
        </div>

        {!isMovie && (
          <EpisodeSelector
            movie={movie}
            season={season}
            episode={episode}
            setSeason={setSeason}
            setEpisode={setEpisode}
            episodesBySeason={episodesBySeason}
          />
        )}

        <Overview
          isMovie={isMovie}
          movie={movie}
          currentEpisodeData={currentEpisodeData}
          season={season}
          episode={episode}
          studio={movie?.production_companies?.[0]?.name}
        />
      </div>
    </div>
  );
}
