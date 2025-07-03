import { Achievement } from '@/types/Achievements';
import clsx from 'clsx';
import React from 'react';

export default function UserAchievementSection({
  title,
  achievements,
  isAchievementUnlocked,
}: {
  title: string;
  achievements: Achievement[];
  isAchievementUnlocked: (id: string) => boolean;
}) {
  return (
    <div>
      <div>
        <h2 className="text-xl uppercase font-medium mb-5">{title}</h2>
      </div>
      <div className="space-y-5">
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
                <h2 className="text-xl mb-1 font-bold">{achievement.title}</h2>
                <p className="text-gray-400">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
