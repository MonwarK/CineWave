import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

export default function ReviewListItem({ review }: any) {
  const { user } = useUser();
  const [isOpen, SetIsOpen] = useState(false);

  const handleOpen = () => {
    SetIsOpen(!isOpen);
  };

  //For testing
  console.log('User Reviews', review);

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900/10 p-5 border border-zinc-700 rounded-lg space-y-3">
      {/* Top Section */}
      <div>
        <div className="flex items-center space-x-5">
          {/* Profile Picture */}
          <div>
            <img className="w-14 rounded-full" src={user?.imageUrl} alt="" />
          </div>

          {/* Username and time sent */}
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-sm">{user?.fullName}</p>
            <p className="text-xs text-gray-500">
              {new Date(user?.createdAt || '').toDateString()}
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
              <button type="button" onClick={handleOpen}>
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
        <p className="text-sm">{review.review}</p>
      </div>
    </div>
  );
}
