'use client';

import { getUserReviews } from '@/app/db/queries';
import { Achievement, UserAchievements } from '@/types/Achievements';
import { Review } from '@/types/Review';
import { unlockAchievement } from '@/utils/unlockAchievement';
import { useUser } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

type AchievementsContextType = {
  achievements: Achievement[];
  userAchievements: UserAchievements[];
  checkReviewsAchievements: (reviewsCount: number) => void;
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
    if (!user) return;
    getUserReviews(user.id).then(reviews =>
      checkReviewsAchievements(reviews?.length || 0)
    );
  }, [user]);

  const checkReviewsAchievements = (reviewsCount: number) => {
    if (!user) return;

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
        console.log(newAchievement);
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
        }
      });
    }

    if (reviewsCount >= 10 && !tenReviewsAchievementsUnlocked) {
      unlockAchievement(user.id, 'Reviewer Lv1').then(newAchievement => {
        console.log(newAchievement);
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
        }
      });
    }

    if (reviewsCount >= 50 && !fiftyReviewsAchievementsUnlocked) {
      unlockAchievement(user.id, 'Reviewer Lv2').then(newAchievement => {
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
        }
      });
    }

    if (reviewsCount >= 100 && !hundredReviewsAchievementsUnlocked) {
      unlockAchievement(user.id, 'Reviewer Lv3').then(newAchievement => {
        if (newAchievement) {
          setUserAchievements(prev => [...prev, newAchievement]);
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
