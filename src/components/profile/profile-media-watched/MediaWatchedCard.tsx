import SquaredButton from '@/components/ui/SquaredButton';
import { FinishedMedia } from '@/types/FinishedMedia';
import Link from 'next/link';
import React from 'react';

export default function MediaWatchedCard({ media }: { media: FinishedMedia }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-700/10 backdrop-blur-sm border border-gray-800/50">
      <div className="relative">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
            className="w-56 h-80 object-fill mx-auto"
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
          <Link
            href={
              media.is_movie
                ? `/movies/${media.media_id}`
                : `/series/${media.media_id}`
            }
            target="_blank"
          >
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
  );
}
