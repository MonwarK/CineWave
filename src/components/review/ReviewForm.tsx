import React, { useState } from 'react';
import NumberRating from '../other/NumberRating';
import SquaredButton from '../ui/SquaredButton';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Movie } from '@/types/Movie';
import { submitReview } from '@/utils/submitReview';

export default function ReviewForm({ movie }: { movie: Movie }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const isMovie = movie.title ? true : false;

  const Chevron = isOpen ? ChevronUp : ChevronDown;

  const onSubmit = e => {
    e.preventDefault();

    submitReview({
      movieId: movie.id,
      isMovie,
      rating,
      review,
      movieTitle: movie.title || movie.name || '',
      posterPath: movie.poster_path,
    });
  };

  return (
    <div className="bg-zinc-800/50 p-5 border border-zinc-700 rounded-lg overflow-hidden">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Write a Review</h2>
        </div>
        <div>
          <Chevron
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ height: 0 }}
          animate={isOpen ? { height: 'auto' } : { height: 0 }}
        >
          {/* Form */}
          <form onSubmit={onSubmit} className="py-5 space-y-7">
            <div className="space-y-2">
              <div className="space-y-2">
                <div>Your Rating</div>
                <div>
                  <NumberRating rating={rating} onRate={setRating} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div>Your Review</div>
              <div>
                <textarea
                  className="w-full border rounded-md border-zinc-600 bg-zinc-900 min-h-28 p-2 outline-none"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                />
              </div>
            </div>
            <SquaredButton>Submit Review</SquaredButton>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
