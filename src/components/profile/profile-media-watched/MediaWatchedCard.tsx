import SquaredButton from '@/components/ui/SquaredButton';
import { FinishedMedia } from '@/types/FinishedMedia';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export default function MediaWatchedCard({ media }: { media: FinishedMedia }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-700/10 backdrop-blur-sm border h-fit border-gray-800/50">
      <div className="relative">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780${media.poster_path}`}
            className="w-full object-cover mx-auto"
          />
        </div>
        <div>
          <div className="space-y-1 pt-2 pb-8 border-t-[#d36013] border-t-[1px] px-2 flex-1">
            <h2>{media.title}</h2>
            <p className="text-xs flex items-center text-gray-400">
              <Calendar  className='w-4 h-4 mr-1'/>
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
              className="w-full !border-0 !rounded-none !bg-[#d36013] hover:!bg-[#d36013]/50 hover:text-white"
            >
              View Details
            </SquaredButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
