import SquaredButton from '@/components/ui/SquaredButton';
import { FinishedMedia } from '@/types/FinishedMedia';
import Link from 'next/link';
import React from 'react';
import MediaWatchedCard from './MediaWatchedCard';

export default function MediaWatchedList({
  mediaWatched,
}: {
  mediaWatched: FinishedMedia[];
}) {
  return (
    <div className="flex mx-auto flex-wrap gap-10 pt-4">
      {mediaWatched.map(media => (
        <MediaWatchedCard key={`media-item-${media.id}`} media={media} />
      ))}
    </div>
  );
}
