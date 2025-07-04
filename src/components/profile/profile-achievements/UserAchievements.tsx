import { useAchievements } from '@/context/AchievementsProvider';
import { UserAchievements as UserAchievementsType } from '@/types/Achievements';
import React from 'react';
import UserAchievementSection from './UserAchievementSection';

export default function UserAchievements() {
  const { achievements, userAchievements } = useAchievements();

  const reviewsAchievements = achievements.filter(x => x.type === 'Review');
  const moviesAchievements = achievements.filter(x => x.type === 'Movie');
  const seriesAchievements = achievements.filter(x => x.type === 'Series');
  const episodesAchievements = achievements.filter(x => x.type === 'Episode');

  const isAchievementUnlocked = (achievement_id: string) =>
    userAchievements?.filter(
      (x: UserAchievementsType) => x.achievement_id === achievement_id
    )?.[0]?.achievement_id !== achievement_id;

  return (
    <div className="py-10 space-y-10">
      <div>
        <h1 className="text-center text-3xl uppercase font-medium">
          Achievements
        </h1>
      </div>

      <div className="space-y-10">
        <UserAchievementSection
          title="Reviews"
          achievements={reviewsAchievements}
          isAchievementUnlocked={isAchievementUnlocked}
        />

        <UserAchievementSection
          title="Movies"
          achievements={moviesAchievements}
          isAchievementUnlocked={isAchievementUnlocked}
        />

        <UserAchievementSection
          title="Series"
          achievements={seriesAchievements}
          isAchievementUnlocked={isAchievementUnlocked}
        />

        <UserAchievementSection
          title="Episodes"
          achievements={episodesAchievements}
          isAchievementUnlocked={isAchievementUnlocked}
        />
      </div>
    </div>
  );
}
