'use client';

import { itemVariants } from '@/motion/variants/motion';
import { Movie } from '@/types/Movie';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Info, Play, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  movie: Movie;
  mediaType: string;
}

export default function MovieLandscapeThumbnail({ movie, mediaType }: Props) {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <motion.div
      className="cursor-pointer"
      key={movie.id}
      variants={itemVariants}
      onMouseEnter={() => setIsTapped(true)}
      onMouseLeave={() => setIsTapped(false)}
    >
      <div className="relative rounded-xl overflow-hidden group hover:shadow-md">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.name}
          className={classNames('w-full h-full object-cover', {
            'blur-[2px] scale-105 transition-all': isTapped,
            'blur-0 scale-100 transition-all': !isTapped,
          })}
        />
        {isTapped && (
          <div className="absolute inset-0 bg-black/60 text-white transition duration-300 text-xs">
            <div className="p-5 flex flex-col justify-between h-full space-y-3">
              <div>
                <h2 className="text-lg font-medium line-clamp-1">
                  {movie.title || movie.name}
                </h2>
                <div className="flex items-center space-x-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={12} />
                  <p>{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="line-clamp-3">{movie.overview}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-orange-500 hover:opacity-80 transition text-white cursor-pointer px-4 py-2 rounded-full uppercase font-bold flex items-center space-x-1">
                  <Play size={16} className="fill-white" />
                  <p>Play</p>
                </button>
                <Link
                  href={
                    mediaType === 'movie'
                      ? `/movies/${movie.id}`
                      : `/series/${movie.id}`
                  }
                >
                  <button className="bg-gray-800/20 hover:opacity-85 cursor-pointer backdrop-blur-2xl py-2 px-4 tracking-wider font-medium rounded-full transition uppercase flex items-center space-x-2">
                    <Info size={16} />
                    <p>Details</p>
                  </button>
                </Link>
                <button className="p-2 bg-white/20 rounded-full cursor-pointer hover:opacity-80 transition">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
