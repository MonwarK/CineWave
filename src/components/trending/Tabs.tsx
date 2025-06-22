'use client'
import { Movie } from '@/types/Movie';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import MovieLandscapeThumbnail from '../movie-card/MovieLandscapeThumbnail';

interface Props {
    shows: Movie[]
    movies: Movie[]
}

export default function Tabs({shows, movies}: Props) {
    const [isActive, setIsActive] = useState(0);


  return (
    <div>
        <div className='flex flex-row justify-center space-x-4  rounded-md w-fit p-2 mx-auto items-center mb-4'>
            <button className={clsx(isActive === 0 ? "bg-orange-900" : "bg-black/50", "px-4 py-2 rounded-md transition duration-300 cursor-pointer")} onClick={() => setIsActive(0)} >Movies</button>
            <button className={clsx(isActive === 1 ? "bg-orange-900" : "bg-black/50", "px-4 py-2 rounded-md transition duration-300 cursor-pointer")} onClick={() => setIsActive(1)}>Shows</button>
        </div>
        <div>
        {isActive === 0 ? (
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                   <AnimatePresence>
                   {movies.map((movie: Movie) => (
                      <motion.div
                      key={movie.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        duration: 1,
                        delay: 0.25,
                        stiffness: 260,
                        damping: 20
                      }}
                      >
                          <MovieLandscapeThumbnail 
                        mediaType='movie'
                        key={`movie-thumbnail-${movie.id}`}
                        movie={movie} />
                      </motion.div>
                    ))}
                   </AnimatePresence>
                </div>
            ) : (
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {shows.map((show: Movie) => (
                         <motion.div
                         key={show.id}
                         initial={{ y: 50, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         exit={{ y: 50, opacity: 0 }}
                         transition={{
                           type: 'spring',
                           duration: 1,
                           delay: 0.25,
                           stiffness: 260,
                           damping: 20
                         }}
                         >
                    <MovieLandscapeThumbnail 
                    mediaType='tv'
                    key={`movie-thumbnail-${show.id}`}
                    movie={show} />
                    </motion.div>
                ))}
            </div>
            )}
        </div>
    </div>
  )
}
