import React, { useState } from 'react';
import NumberRating from '../other/NumberRating';
import SquaredButton from '../ui/SquaredButton';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ReviewForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);

  const Chevron = isOpen ? ChevronUp : ChevronDown;

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
          <div className="py-5 space-y-7">
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
                <textarea className="w-full border rounded-md border-zinc-600 bg-zinc-900 min-h-28" />
              </div>
            </div>
            <SquaredButton>Submit Review</SquaredButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
