'use client';

import { Movie, Episode } from '@/types/Movie';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  movie: Movie;
  season: number;
  episode: number;
  setSeason: (season: number) => void;
  setEpisode: (episode: number) => void;
  episodesBySeason: Record<number, Episode[]>;
}

export default function EpisodeSelector({
  movie,
  season,
  episode,
  setSeason,
  setEpisode,
  episodesBySeason,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeason = Number(e.target.value);
    const firstEpisode =
      episodesBySeason[selectedSeason]?.[0]?.episode_number || 1;

    setSeason(selectedSeason);
    setEpisode(firstEpisode);

    const params = new URLSearchParams(searchParams.toString());
    params.set('season', selectedSeason.toString());
    params.set('episode', firstEpisode.toString());

    router.replace(`?${params.toString()}`);
  };

  const handleEpisodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEpisode = Number(e.target.value);
    setEpisode(selectedEpisode);

    const params = new URLSearchParams(searchParams.toString());
    params.set('season', season.toString());
    params.set('episode', selectedEpisode.toString());

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
      {movie.seasons && (
        <select
          onChange={handleSeasonChange}
          className="bg-zinc-900 p-3 rounded-md tracking-wide outline-0"
          value={season}
        >
          {movie.seasons.map(
            s =>
              s.season_number !== 0 && (
                <option key={s.season_number} value={s.season_number}>
                  {s.name}
                </option>
              )
          )}
        </select>
      )}

      <select
        onChange={handleEpisodeChange}
        className="bg-zinc-900 p-3 rounded-md tracking-wide outline-0 lg:max-w-xs"
        value={episode}
      >
        {episodesBySeason[season]?.map(ep => (
          <option
            key={`season-${season}-episode-${ep.episode_number}`}
            value={ep.episode_number}
          >
            E{ep.episode_number} - {ep.name}
          </option>
        ))}
      </select>
    </div>
  );
}
