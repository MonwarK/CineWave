"use client";

import { containerVariants, itemVariants } from "@/motion/variants/motion";
import { Movie } from "@/types/Movie";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SimilarMovies({
  similarMovies,
}: {
  similarMovies: Movie[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && innerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        setDragWidth(containerWidth - innerWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [similarMovies]);

  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700 overflow-hidden">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
        <div>
          <motion.div ref={containerRef} className="overflow-hidden">
            <motion.div
              ref={innerRef}
              drag="x"
              dragConstraints={{ right: 0, left: dragWidth }}
              className="flex space-x-4 cursor-grab py-5"
              viewport={{ once: true, amount: 0.3 }}
            >
              {similarMovies.map((movie: Movie) => (
                <motion.div
                  key={movie?.id}
                  className="flex-shrink-0 w-40"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.name}
                      className="w-full h-full object-cover group-hover:blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 text-xs text-center">
                      <Link
                        href={`/${movie.title ? "movies" : "series"}/${
                          movie.id
                        }`}
                        target="_blank"
                        className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
                      >
                        <ExternalLink />
                        <p>View</p>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
