import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
interface Props {
  videoSrc: string;
  runtime: number;
  saveProgress?: (season: number, episode: number) => void;
  markEpisodeWatched?: (season: number, episode: number) => void;
  deleteSeriesProgress?: () => void;
  completeWatched: () => void;
  isMovie: boolean;
  season?: number;
  episode?: number;
  nextEpisode?: {
    season: number;
    episode: number;
  };
}

export default function VideoPlayer({
  videoSrc,
  runtime,
  saveProgress,
  completeWatched,
  deleteSeriesProgress,
  markEpisodeWatched,
  isMovie,
  season,
  episode,
  nextEpisode,
}: Props) {
  const [baseTime, setBaseTime] = useState(5);
  const [hasEarlySaved, setHasEarlySaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLateSaved, setHasLateSaved] = useState(false);

  const videoSessionSeconds = useStopwatch({
    autoStart: isPlaying,
    interval: 20,
  });
  const minTimeWatched = videoSessionSeconds.totalSeconds > 60;

  useEffect(() => {
    if (!minTimeWatched || hasLateSaved) return;

    const watchedMinEnough = baseTime >= 60 && baseTime <= runtime * 0.8;
    const watchedLateEnough = baseTime >= runtime * 0.8;

    if (isMovie) {
      if (watchedLateEnough && !hasLateSaved) {
        completeWatched();
        setHasLateSaved(true);
      }
    }

    if (
      !saveProgress ||
      !season ||
      !episode ||
      !deleteSeriesProgress ||
      !markEpisodeWatched
    )
      return;

    // Tracks current episode if user is on page for 30 seconds
    if (watchedMinEnough && !hasEarlySaved) {
      saveProgress(season, episode);
      setHasEarlySaved(true);
    }

    // Tracks onto next episode if 3/4 of episode watched
    if (watchedLateEnough && !hasLateSaved && nextEpisode) {
      saveProgress(nextEpisode.season, nextEpisode.episode);
      setHasLateSaved(true);
    }

    if (watchedLateEnough && !hasLateSaved && nextEpisode) {
      markEpisodeWatched(season, episode);
      saveProgress(nextEpisode.season, nextEpisode.episode);
      setHasLateSaved(true);
    }

    if (watchedLateEnough && !hasLateSaved && !nextEpisode) {
      markEpisodeWatched(season, episode);
      deleteSeriesProgress();
      completeWatched();
      setHasLateSaved(true);
    }
  }, [videoSessionSeconds]);

  useEffect(() => {
    if (baseTime === 0) return;

    setHasEarlySaved(false);
    setHasLateSaved(false);

    setBaseTime(0);
    videoSessionSeconds.pause();
    videoSessionSeconds.reset();
  }, [season, episode]);

  useEffect(() => {
    if (isPlaying) {
      videoSessionSeconds.start();
      return;
    }

    videoSessionSeconds.pause();
  }, [isPlaying]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'http://localhost:3000/') return;
      if (event.data.timeupdate) return;

      const { type: mediaMap, data } =
        typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (mediaMap !== 'PLAYER_EVENT') return;

      const timestamp = Math.round(data?.currentTime);

      if (!(episode == data.episode && season == data.season)) {
        const newUrl = `?season=${data.season}&episode=${data.episode}`;
        window.history.replaceState(null, '', newUrl);
      }

      // If Video Played
      if (data.event === 'play' && isPlaying === false) setIsPlaying(true);

      // If Video Paused
      if (data.event === 'pause' && isPlaying === true) setIsPlaying(false);

      if (data.event === 'timeupdate') {
        if (baseTime === 0 && baseTime != timestamp) return;
        setBaseTime(Math.round(data.currentTime));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="lg:px-6 bg-black">
      <div className="aspect-video max-h-[75vh] mx-auto">
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
    </div>
  );
}
