import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
interface Props {
  videoSrc: string;
  runtime: number;
  saveProgress?: (season: number, episode: number) => void;
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
  isMovie,
  season,
  episode,
  nextEpisode,
}: Props) {
  const [baseTime, setBaseTime] = useState(20);
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
      console.log(1);
      if (watchedLateEnough && !hasLateSaved) {
        console.log('Hello');
        completeWatched();
        setHasLateSaved(true);
      }
    }

    if (!saveProgress || !season || !episode) return;

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
      saveProgress(nextEpisode.season, nextEpisode.episode);
      setHasLateSaved(true);
    }

    if (watchedLateEnough && !hasLateSaved && !nextEpisode) {
      saveProgress(1, 1);
      completeWatched();
      setHasLateSaved(true);
    }
  }, [videoSessionSeconds]);

  useEffect(() => {
    if (baseTime === 0) return;

    setHasEarlySaved(false);
    setHasLateSaved(false);

    setBaseTime(0);
    videoSessionSeconds.reset();
  }, [season, episode]);

  useEffect(() => {
    if (isPlaying) {
      videoSessionSeconds.start();
      return;
    }

    videoSessionSeconds.pause();
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'http://localhost:3000/') return;
      if (event.data.timeupdate) return;

      const { type: mediaMap, data } =
        typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (mediaMap !== 'PLAYER_EVENT') return;

      // If Video Played
      if (data.event === 'play') setIsPlaying(true);

      // If Video Paused
      if (data.event === 'pause') setIsPlaying(false);

      if (data.event === 'timeupdate') {
        if (baseTime === 0) return;
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
