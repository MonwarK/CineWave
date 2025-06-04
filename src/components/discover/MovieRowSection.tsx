"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/motion/variants/motion";

export default function MovieRowSection({ title, movies }: any) {
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
  }, [movies]);

  return (
    <motion.div
      variants={containerVariants}
      className="max-w-screen-xl w-full mx-auto px-10"
    >
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      <motion.div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={innerRef}
          drag="x"
          dragConstraints={{ right: 0, left: dragWidth }}
          className="flex space-x-4 cursor-grab py-5"
          viewport={{ once: true, amount: 0.3 }}
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              className="flex-shrink-0 w-40"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.name}
                className="w-full h-60 object-cover rounded-xl overflow-hidden transition"
              />
              <p className="text-sm mt-2 text-center">
                {movie.title || movie.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
