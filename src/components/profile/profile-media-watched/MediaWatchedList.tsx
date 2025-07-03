import SquaredButton from '@/components/ui/SquaredButton';
import { FinishedMedia } from '@/types/FinishedMedia';
import Link from 'next/link';
import React from 'react';

export default function MediaWatchedList({
  mediaWatched,
}: {
  mediaWatched: FinishedMedia[];
}) {
  return (
    <div className="flex mx-auto flex-wrap gap-10 pt-4">
      {mediaWatched.map(media => (
        <div
          key={media.id}
          className="overflow-hidden rounded-2xl border border-gray-700"
        >
          <div className="relative">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                className="w-52 h-80 object-fill mx-auto"
              />
            </div>
            <div>
              <div className="space-y-1 pt-2 pb-8 px-2 flex-1">
                <h2>{media.title}</h2>
                <p className="text-xs text-gray-400">
                  Watched{' '}
                  {new Date(media.finished_at).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <Link href={`/movies/${media.media_id}`}>
                <SquaredButton
                  variant="secondary"
                  className="w-full !border-0 !rounded-none"
                >
                  View Details
                </SquaredButton>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
