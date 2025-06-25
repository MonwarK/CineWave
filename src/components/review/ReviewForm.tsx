import { Review } from '@/types/Review';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import NumberRating from '../other/NumberRating';
import SquaredButton from '../ui/SquaredButton';

export default function ReviewForm({
  usersReview,
  onSubmit,
}: {
  usersReview?: Review;
  onSubmit: (rating: number, review: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(usersReview?.rating || 1);
  const [review, setReview] = useState(usersReview?.review || '');

  const Chevron = isOpen ? ChevronUp : ChevronDown;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, review);
  };

  return (
    <div className="bg-zinc-800/50 p-5 border border-zinc-700 rounded-lg overflow-hidden">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {usersReview ? 'Edit your Review' : 'Write a Review'}
          </h2>
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
          <form onSubmit={handleSubmit} className="py-5 space-y-7">
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
            <SquaredButton className='!bg-orange-900 !border-orange-800 text-white hover:!bg-orange-500/20 transition duration-300' type='submit'>Submit Review</SquaredButton>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
