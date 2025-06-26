import { ChevronLeft, Menu } from 'lucide-react';
import Link from 'next/link';
import { Movie } from '@/types/Movie';

export default function WatchTopBar({
  movie,
  isMovie,
  setIsOpen,
  isOpen,
}: {
  movie: Movie;
  isMovie: boolean;
  setIsOpen: (v: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <div className="bg-black border-b border-zinc-900 px-6 py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link href={`/${isMovie ? 'movies' : 'series'}/${movie.id}`}>
            <div className="text-white hover:text-gray-300 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </Link>
          <Link href="/">
            <div className="text-xl font-bold">CineWave</div>
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-300 transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
