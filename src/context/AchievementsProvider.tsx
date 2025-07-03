'use client';

import { getUserReviews } from '@/app/db/queries';
import { notify } from '@/libs/notification';
import { Achievement, UserAchievements } from '@/types/Achievements';
import { Review } from '@/types/Review';
import { unlockAchievement } from '@/utils/unlockAchievement';
import { useUser } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

type AchievementsContextType = {
  achievements: Achievement[];
  userAchievements: UserAchievements[];
  checkReviewsAchievements: () => void;
};

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined
);

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error(
      'useAchievements must be used within a AchievementsContextProvider'
    );
  }
  return context;
};

type ProviderProps = {
  children: React.ReactNode;
  initialAchievements: Achievement[];
  initialUserAchievements: UserAchievements[];
};

export const AchievementsProvider = ({
  children,
  initialAchievements,
  initialUserAchievements,
}: ProviderProps) => {
  const { user } = useUser();

  const achievements = initialAchievements || [];
  const [userAchievements, setUserAchievements] = useState(
    initialUserAchievements || []
  );

  useEffect(() => {
    checkReviewsAchievements();
  }, [user]);

  const checkReviewsAchievements = async () => {
    if (!user) return;
    const reviewsCount =
      (await getUserReviews(user.id).then(x => x?.length)) || 0;

    const reviewAchievements = achievements.filter(x => x.type === 'Review');

    const firstAchievementUnlocked = userAchievements.find(
      x => x.achievements.title === reviewAchievements[0].title
    );

    const secondAchievementUnlocked = userAchievements.find(
      x => x.achievements.title === reviewAchievements[1].title
    );
    const thirdAchievementUnlocked = userAchievements.find(
      x => x.achievements.title === reviewAchievements[2].title
    );
    const fourthAchievementUnlocked = userAchievements.find(
      x => x.achievements.title === reviewAchievements[3].title
    );

    if (reviewsCount >= 1 && !firstAchievementUnlocked) {
      unlockAchievement(user.id, reviewAchievements[0].title).then(
        newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${reviewAchievements[0].title}`,
              reviewAchievements[0].description
            );
          }
        }
      );
    }

    if (reviewsCount >= 10 && !secondAchievementUnlocked) {
      unlockAchievement(user.id, reviewAchievements[1].title).then(
        newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${reviewAchievements[1].title}`,
              reviewAchievements[1].description
            );
          }
        }
      );
    }

    if (reviewsCount >= 50 && !thirdAchievementUnlocked) {
      unlockAchievement(user.id, reviewAchievements[2].title).then(
        newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${reviewAchievements[2].title}`,
              reviewAchievements[2].description
            );
          }
        }
      );
    }

    if (reviewsCount >= 100 && !fourthAchievementUnlocked) {
      unlockAchievement(user.id, reviewAchievements[3].title).then(
        newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${reviewAchievements[3].title}`,
              reviewAchievements[3].description
            );
          }
        }
      );
    }
  };

  if (!user) return null;

  return (
    <AchievementsContext.Provider
      value={{ achievements, userAchievements, checkReviewsAchievements }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};
