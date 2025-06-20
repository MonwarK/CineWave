"use client"

import { itemVariants } from '@/motion/variants/motion';
import { Movie } from '@/types/Movie';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SimilarMovies({ similarMovies, mediaType}: { similarMovies: Movie[], mediaType: string}) {


  return (
    <div className='bg-zinc-900 p-5 rounded-lg border border-zinc-700'>
    <div className='space-y-8'>
    <h2 className="text-2xl font-semibold mb-4">Similar {mediaType}</h2>
    <div className='flex flex-wrap gap-4 justify-center'>
    {similarMovies.slice(0,8).map((similar: Movie) => (
                <motion.div
                key={similar?.id}
                className="flex-shrink-0 w-40"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
             
                   <img
                   src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
                   alt={similar.name}
                   className="w-full h-full object-cover group-hover:blur-[2px]"
                 />
                 <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 text-xs text-center">
                   <Link
                   href={`/movies/${similar.id}`}
                     className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
                   >
                     <ExternalLink />
                     <p>View</p>
                   </Link>
                 </div>
                 </div>
              </motion.div>
        ))}
    </div>        

    </div>
    </div>
  )
}


// {similarMovies ? (
//     <div className="mt-6">
//       <h2 className="mb-2">Similar Movies</h2>
//       <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
//         {similarMovies.slice(0, 3).map((movie: Movie, id) => (
//           <MovieRowItem
//             movie={movie}
//             key={id}
//             selectMovie={() => setSelectedMovie(movie as any)}
//           />
//         ))}

//         <MovieModal
//           movie={selectedMovie}
//           onClose={() => setSelectedMovie(null)}
//         />
//       </div>
//     </div>
//   ) : (
//     <></>
//   )}