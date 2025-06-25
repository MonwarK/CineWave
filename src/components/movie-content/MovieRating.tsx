import { Movie } from '@/types/Movie';
import { Star } from 'lucide-react';
import Link from 'next/link';
import StarRating from '../other/StarRating';
import SquaredButton from '../ui/SquaredButton';

export default function MovieRating({ movie }: { movie: Movie }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div className="flex flex-col h-full w-full space-y-5">
        <div className="space-y-3">
          <div className="text-xl uppercase font-semibold">TMDB Rating</div>
          <div className="flex justify-between items-center gap-2 flex-1">
            <div className="font-semibold text-sm flex items-center gap-4">
              <div>TheMovieDB ({movie.vote_average.toFixed(1)}/10)</div>
            </div>
            <div className="flex items-center">
              <StarRating rating={movie.vote_average} />
            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-5">
          <div className="bg-zinc-700 p-5 rounded-lg border border-zinc-600 text-center">
            <p className="text-orange-400 text-2xl font-medium mb-1">
              {movie.vote_count}
            </p>
            <p className="text-gray-400 text-xs font-medium uppercase">
              Vote Count
            </p>
          </div>
          <div className="bg-zinc-700 p-5 rounded-lg border border-zinc-600 text-center">
            <p className="text-orange-400 text-2xl font-medium mb-1">
              {Math.round(movie.popularity)}
            </p>
            <p className="text-gray-400 text-xs font-medium uppercase">
              Popularity
            </p>
          </div>
        </div>
        <hr className="border-gray-500 my-4" />

  <h2 className="text-xl uppercase font-semibold mb-2">Our Reviews</h2>
        <div className="flex md:items-center justify-between gap-5">
<div className="flex items-center space-x-2">
  <Star className="text-orange-400 fill-orange-400" size={20} />
  <div className="text-gray-400 text-sm mt-1">8.7 Ratings</div>
</div>
<div className="flex gap-5">
  <Link href={`/movies/reviews/${movie.id}`}>
    <SquaredButton className='!bg-orange-900 !border-orange-800 text-white hover:!bg-orange-500/20 transition duration-300'>View All Reviews</SquaredButton>
  </Link>
</div>
</div>
      </div>
    </div>
  );
}
