'use client'
import { containerVariants } from "@/motion/variants/motion";
import { Movie } from "@/types/Movie";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

interface Props {
  movies: Movie[]
}

export default function Trending({ movies }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <h2 className="text-2xl font-medium mb-8">Trending</h2>

      {/* Outer container must have overflow visible */}
      <Marquee speed={50} gradient={false}>
        <div className="flex space-x-6 px-6">
          {movies.map((item, i) => (
            <div
              key={i}
              className="relative w-40 h-60 rounded-xl overflow-hidden group"
            >
              <img
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                alt={item.name}
                className="w-full h-full object-cover group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 text-lg text-center">
                {item.name || item.title}
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </motion.div>
  );
}
