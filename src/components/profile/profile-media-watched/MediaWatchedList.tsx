import { FinishedMedia } from '@/types/FinishedMedia';
import MediaWatchedCard from './MediaWatchedCard';

export default function MediaWatchedList({
  mediaWatched,
}: {
  mediaWatched: FinishedMedia[];
}) {
  return (
    <div className="flex mx-auto md:justify-normal justify-center flex-wrap gap-6.5 pt-4">
      {mediaWatched.map(media => (
        <MediaWatchedCard key={`media-item-${media.id}`} media={media} />
      ))}
    </div>
  );
}
