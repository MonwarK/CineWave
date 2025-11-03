import { FinishedMedia } from '@/types/FinishedMedia';
import MediaWatchedCard from './MediaWatchedCard';

export default function MediaWatchedList({
  mediaWatched,
}: {
  mediaWatched: FinishedMedia[];
}) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6.5 pt-4">
      {mediaWatched.map(media => (
        <MediaWatchedCard key={`media-item-${media.id}`} media={media} />
      ))}
    </div>
  );
}
