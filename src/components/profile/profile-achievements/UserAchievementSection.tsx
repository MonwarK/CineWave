import { Achievement } from '@/types/Achievements';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function UserAchievementSection({
  title,
  achievements,
  isAchievementUnlocked,
}: {
  title: string;
  achievements: Achievement[];
  isAchievementUnlocked: (id: string) => boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const Chevron = isOpen ? ChevronUp : ChevronDown;

  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl uppercase font-medium">{title}</h2>
        <div>
          <Chevron
            className="cursor-pointer text-gray-500 hover:opacity-50 transition duration-100"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={isOpen ? { height: 'auto' } : { height: 0 }}
        >
          <div className="grid md:grid-cols-2 gap-5">
            {achievements?.map(achievement => (
              <div
                key={achievement.id}
                className={clsx(
                  'bg-zinc-800 rounded-lg border border-zinc-700 p-5',
                  isAchievementUnlocked(achievement.id) &&
                    'opacity-30 grayscale-100'
                )}
              >
                <div className="flex items-center gap-5">
                  <div>
                    <img
                      className="w-16"
                      src="https://img.icons8.com/?size=100&id=LnEviQCbWLnq&format=png&color=000000"
                      alt={achievement.title}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl mb-1 font-bold">
                      {achievement.title}
                    </h2>
                    <p className="text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
