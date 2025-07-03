import { FinishedMedia } from '@/types/FinishedMedia';
import Link from 'next/link';
import Header from '../main/Header';
import SquaredButton from '../ui/SquaredButton';
import MediaWatchedList from './profile-media-watched/MediaWatchedList';

type Props = {
  finishedMedia: FinishedMedia[];
  mediaType: string;
};

export default function UserWatched({ finishedMedia, mediaType }: Props) {
  const moviesWatched = finishedMedia.filter(x => x.is_movie === true);
  const seriesWatched = finishedMedia.filter(x => x.is_movie === false);

  const isMovie = mediaType === 'movies';
  const isNoMoviesWatched = isMovie && moviesWatched.length === 0;
  const isNoSeriesWatched = !isMovie && seriesWatched.length === 0;

  if (isNoMoviesWatched || isNoSeriesWatched) {
    return (
      <>
        <Header />
        <div className="pt-20 text-center h-full space-y-3 text-xl font-bold uppercase">
          <p className="text-gray-400">Uh oh, the list is empty {'(◕︿◕)'}</p>
          <Link href={isNoMoviesWatched ? '/movies' : '/series'}>
            <p className="text-blue-500 cursor-pointer">
              Discover {isNoMoviesWatched ? 'movies' : 'series'} here
            </p>
          </Link>
        </div>
      </>
    );
  }

  return (
    <MediaWatchedList mediaWatched={isMovie ? moviesWatched : seriesWatched} />
  );
}
