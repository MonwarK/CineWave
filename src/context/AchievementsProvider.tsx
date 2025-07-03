'use client';

import { getEpisodesWatched, getMediaProgress, getUserReviews } from '@/app/db/queries';
import { notify } from '@/libs/notification';
import { Achievement, UserAchievements } from '@/types/Achievements';
import { unlockAchievement } from '@/utils/unlockAchievement';
import { useUser } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

type AchievementsContextType = {
  achievements: Achievement[];
  userAchievements: UserAchievements[];
  checkReviewsAchievements: () => void;
  checkMoviesAchievements: () => void;
  checkSeriesAchievements: () => void;
  checkEpisodesAchievements: () => void;
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
    checkMoviesAchievements();
    checkSeriesAchievements();
    checkEpisodesAchievements();
  }, [user]);

  const checkReviewsAchievements = async () => {
    if (!user) return;
    const reviewsCount =
      (await getUserReviews(user.id).then(x => x?.length)) || 0;

    const reviewAchievements = achievements.filter(x => x.type === 'Review');
    const thresholds = [1, 10, 50, 100];

    thresholds.forEach((threshold, idx) => {
      const achievement = reviewAchievements[idx];
      if (!achievement) return; 

      const alreadyUnlocked = userAchievements.some(
        x => x.achievements.title === achievement.title
      );

      if (reviewsCount >= threshold && !alreadyUnlocked) {
        unlockAchievement(user.id, achievement.title).then(newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${achievement.title}`,
              achievement.description
            );
          }
        });
      }
    });
  };

  const checkMoviesAchievements = async () => {
    if (!user) return;

    const finishedMovies = await getMediaProgress(user.id);
    const moviesWatched = finishedMovies?.filter(x => x.is_movie === true).length || 0;
    const movieAchievements = achievements.filter(x => x.type === 'Movie');

    const thresholds = [1, 5, 10, 20, 25, 30];

    thresholds.forEach((threshold, idx) => {
      const achievement = movieAchievements[idx];
      if (!achievement) return; 

      const alreadyUnlocked = userAchievements.some(
        x => x.achievements.title === achievement.title
      );

      if (moviesWatched >= threshold && !alreadyUnlocked) {
        unlockAchievement(user.id, achievement.title).then(newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${achievement.title}`,
              achievement.description
            );
          }
        });
      }
    });
  };

  const checkSeriesAchievements = async () => {
    if (!user) return;

    const finishedMovies = await getMediaProgress(user.id);
    const moviesWatched = finishedMovies?.filter(x => x.is_movie === true).length || 0;
    const seriesAchievements = achievements.filter(x => x.type === 'Series');

    // Define the thresholds for each movie achievement
    const thresholds = [1, 5, 10, 20, 25, 30];

    // Loop through each threshold and check/unlock achievements
    thresholds.forEach((threshold, idx) => {
      const achievement = seriesAchievements[idx];
      if (!achievement) return; // skip if achievement is missing

      const alreadyUnlocked = userAchievements.some(
        x => x.achievements.title === achievement.title
      );

      if (moviesWatched >= threshold && !alreadyUnlocked) {
        unlockAchievement(user.id, achievement.title).then(newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${achievement.title}`,
              achievement.description
            );
          }
        });
      }
    });
 
  }

  const checkEpisodesAchievements = async () => {
    if (!user) return;

    const episodesWatched = await getEpisodesWatched(user.id);
    const episodesWatchedCount = episodesWatched?.length || 0;
    const episodesAchievements = achievements.filter(x => x.type === 'Episodes');

    // Define the thresholds for each movie achievement
    const thresholds = [1, 10, 25, 50, 100, 250, 500, 1000];

    // Loop through each threshold and check/unlock achievements
    thresholds.forEach((threshold, idx) => {
      const achievement = episodesAchievements[idx];
      if (!achievement) return; // skip if achievement is missing

      const alreadyUnlocked = userAchievements.some(
        x => x.achievements.title === achievement.title
      );

      if (episodesWatchedCount >= threshold && !alreadyUnlocked) {
        unlockAchievement(user.id, achievement.title).then(newAchievement => {
          if (newAchievement) {
            setUserAchievements(prev => [...prev, newAchievement]);
            notify(
              `🏆 Achievement Unlocked: ${achievement.title}`,
              achievement.description
            );
          }
        });
      }
    });
 
  }

  if (!user) return null;

  return (
    <AchievementsContext.Provider
      value={{ achievements, userAchievements, checkReviewsAchievements, checkMoviesAchievements, checkSeriesAchievements, checkEpisodesAchievements }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};
