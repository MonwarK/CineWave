"use client";

import { noOpacity, visibleOpacity } from "@/motion/variants/opacity";
import { Movie } from "@/types/Movie";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import MainInfo from "./MainInfo";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: Props) {
  const [trailerKey, setTrailerKey] = useState("");
  const [fullMovie, setFullMovie] = useState<Movie>();

  useEffect(() => {
    if (!movie) return;

    const mediaType = movie.media_type || (movie.name ? "tv" : "movie");

    async function fetchDetailsAndTrailer() {
      if (!movie) return;

      try {
        // Fetch full movie/TV metadata
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const detailData = await detailRes.json();
        setFullMovie(detailData);

        // Fetch trailer info
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const videoData = await videoRes.json();
        const trailer = videoData.results?.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailerKey(trailer?.key || "");
      } catch (err) {
        console.error("Failed to fetch movie details or trailer", err);
      }
    }

    fetchDetailsAndTrailer();
  }, [movie]);

  if (!fullMovie) return null;

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          initial={noOpacity}
          animate={visibleOpacity}
          exit={noOpacity}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            layout
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="bg-neutral-900 text-white rounded-xl overflow-hidden w-full max-w-xl relative shadow-lg py-5"
            onClick={(e) => e.stopPropagation()}
          >
            {trailerKey ? (
              <iframe
                className="w-full aspect-video rounded-md"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="py-40 bg-gray-950">
                <p className="text-xs text-neutral-400 text-center">
                  No trailer found
                </p>
              </div>
            )}

            <MainInfo fullMovie={fullMovie} />

            <button
              onClick={onClose}
              className="absolute cursor-pointer top-3 right-3 text-white text-2xl font-bold hover:text-red-400"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
