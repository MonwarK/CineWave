import { Review } from '@/types/Review';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';

interface Props {
  review: Review;
}

export default function ReviewListItem({ review }: Props) {
  const [isOpen, SetIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOpen = () => {
    SetIsOpen(!isOpen);
  };

  const shouldShowToggle =
    review.review.split('\n').length > 3 || review.review.length > 300;

  console;

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900/10 p-5 border border-zinc-700 rounded-lg space-y-3">
      {/* Top Section */}
      <div>
        <div className="flex items-center space-x-5">
          {/* Profile Picture */}
          <div>
            <img
              className="w-14 rounded-full"
              src={review.users.profile_image_url}
              alt=""
            />
          </div>

          {/* Username and time sent */}
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-sm">
              {review.users.first_name} {review.users.last_name}
            </p>
            <p className="text-xs text-gray-500">
              {review.updated_at !== review.created_at
                ? `Updated at ${new Date(review.updated_at).toUTCString()}`
                : `Posted at ${new Date(review.created_at).toUTCString()}`}
            </p>
          </div>

          {/* Rating */}
          <div className="flex space-x-2 items-center">
            <div className="px-2 py-1 bg-orange-500 rounded-md text-xs font-semibold">
              {review.rating}/10
            </div>
            {/* Dropdown */}
            {/* TODO: Add editing and deletion functionality */}
            <div>
              <button
                className="cursor-pointer"
                type="button"
                onClick={handleOpen}
              >
                <EllipsisVertical />
              </button>
              {isOpen && (
                <motion.div
                  initial={{ scale: 0, transition: { delay: 0.15 } }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: 'spring',
                      duration: 0.4,
                      delayChildren: 0.6,
                      staggerChildren: 0.05,
                    },
                  }}
                  exit={{ scale: 0 }}
                  className="bg-orange-900 flex flex-col gap-2 absolute rounded-md -translate-x-[3rem] px-4 py-2"
                >
                  <motion.p
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-[.90rem] py-2"
                  >
                    Edit
                  </motion.p>
                  <motion.p
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-[.90rem] py-2"
                  >
                    Delete
                  </motion.p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mid Section */}
      <div>
        <div
          className={`whitespace-pre-wrap transition-all duration-300 ease-in-out ${
            expanded ? '' : 'line-clamp-3'
          }`}
        >
          <Markdown>{review.review}</Markdown>
        </div>
        {shouldShowToggle && (
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
}
