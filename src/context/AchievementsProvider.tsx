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

    const firstAchievement = userAchievements.find(
      x => x.achievements.title === 'First Review'
    );
    const tenReviewsAchievementsUnlocked = userAchievements.find(
      x => x.achievements.title === 'Reviewer Lv1'
    );
    const fiftyReviewsAchievementsUnlocked = userAchievements.find(
      x => x.achievements.title === 'Reviewer Lv2'
    );
    const hundredReviewsAchievementsUnlocked = userAchievements.find(
      x => x.achievements.title === 'Reviewer Lv3'
    );

    if (reviewsCount >= 1 && !firstAchievement) {
      unlockAchievement(user.id, 'First Review').then(newAchievement => {
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
          notify('🏆 Achievement Unlocked: First Review');
        }
      });
    }

    if (reviewsCount >= 10 && !tenReviewsAchievementsUnlocked) {
      unlockAchievement(user.id, 'Reviewer Lv1').then(newAchievement => {
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
          notify('🏆 Achievement Unlocked: Reviewer Lvl1');
        }
      });
    }

    if (reviewsCount >= 50 && !fiftyReviewsAchievementsUnlocked) {
      unlockAchievement(user.id, 'Reviewer Lv2').then(newAchievement => {
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
          notify('🏆 Achievement Unlocked: Reviewer Lvl2');
        }
      });
    }

    if (reviewsCount >= 100 && !hundredReviewsAchievementsUnlocked) {
      unlockAchievement(user.id, 'Reviewer Lv3').then(newAchievement => {
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
          notify('🏆 Achievement Unlocked: Reviewer Lvl3');
        }
      });
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
