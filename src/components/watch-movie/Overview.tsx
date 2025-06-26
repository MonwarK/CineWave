import { Movie, Episode } from '@/types/Movie';

interface Props {
  isMovie: boolean;
  movie: Movie;
  currentEpisodeData?: Episode;
  season?: number;
  episode?: number;
  studio?: string;
}

export default function Overview({
  isMovie,
  movie,
  currentEpisodeData,
  season,
  episode,
  studio,
}: Props) {
  return (
    <div>
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
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {currentEpisodeData?.overview}
          </p>
        </div>
      )}
      <div className="mt-5">
        <div className="text-gray-400 text-xs">{studio}</div>
      </div>
    </div>
  );
}
