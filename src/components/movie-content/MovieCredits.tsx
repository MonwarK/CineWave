'use client';
import { itemVariants } from '@/motion/variants/motion';
import { CastMember } from '@/types/Credits';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function MovieCredits({ credits }: { credits: CastMember[] }) {
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
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [credits]);

  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-4">Cast Members</h2>
        <div>
          <motion.div ref={containerRef} className="overflow-hidden w-full">
            <motion.div
              ref={innerRef}
              drag="x"
              dragConstraints={{ right: 0, left: dragWidth }}
              className="flex space-x-4 cursor-grab py-5"
              viewport={{ once: true, amount: 0.3 }}
            >
              {credits.map(member => (
                <motion.div
                  key={member?.id}
                  className="flex-shrink-0 w-40 relative overflow-hidden flex flex-col"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <div className="absolute w-full h-full z-10" />
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-60 object-cover z-0 rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-60 bg-gray-800 rounded-xl" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg mt-2 leading-tight">
                      {member.name}
                    </h2>
                    <p className="text-sm text-gray-500 italic">
                      {member.character}
                    </p>
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
