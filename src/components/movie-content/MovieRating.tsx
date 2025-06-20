import { Movie } from "@/types/Movie";
import { Star } from "lucide-react";
import React from "react";

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
    );
  }

  const remainingStars = 5 - Math.ceil(rating / 2);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
  }

  return stars;
};

export default function MovieRating({ movie }: { movie: Movie }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div className="flex flex-col h-full w-full justify-between">
        <div className="space-y-3 flex-1">
          <div className="text-xl uppercase font-semibold">TMDB Rating</div>
          <div className="flex justify-between items-center gap-2 flex-1">
            <div className="font-semibold text-sm flex items-center gap-4">
              <div>TheMovieDB ({movie.vote_average.toFixed(1)}/10)</div>
            </div>
            <div className="flex items-center">
              {renderStars(movie.vote_average)}
            </div>
          </div>
        </div>

        <hr className="border-gray-500 my-4" />

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
      </div>
    </div>
  );
}
