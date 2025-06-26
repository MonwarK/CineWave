import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

interface Props {
  videoSrc: string;
  showId?: number;
  runtime?: number;
  saveProgress?: (season: number, episode: number) => void;
  season?: number;
  episode?: number;
  nextEpisode?: {
    season: number;
    episode: number;
  };
}

export default function VideoPlayer({
  videoSrc,
  showId,
  runtime,
  saveProgress,
  season,
  episode,
  nextEpisode,
}: Props) {
  const [hasEarlySaved, setHasEarlySaved] = useState(false);
  const [hasLateSaved, setHasLateSaved] = useState(false);

  const timer = useStopwatch({
    autoStart: showId ? true : false,
    interval: 20,
  });

  useEffect(() => {
    if (hasLateSaved) return;
    if (!showId || !runtime || !saveProgress || !season || !episode) return;

    const watchedMinEnough =
      timer.totalSeconds >= 30 && timer.totalSeconds / 60 <= runtime * 0.75;
    const watchedLateEnough = timer.totalSeconds / 60 >= runtime * 0.75;

    // Tracks current episode if user is on page for 30 seconds
    if (watchedMinEnough && !hasEarlySaved) {
      saveProgress(season, episode);
      setHasEarlySaved(true);
    }

    // Tracks onto next episode if 3/4 of episode watched
    if (watchedLateEnough && !hasLateSaved && nextEpisode) {
      saveProgress(nextEpisode.season, nextEpisode.episode);
      setHasLateSaved(true);

      timer.pause();
    }
  }, [timer]);

  useEffect(() => {
    if (timer.totalSeconds === 0) return;

    setHasEarlySaved(false);
    setHasLateSaved(false);

    timer.reset();
  }, [season, episode]);

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
