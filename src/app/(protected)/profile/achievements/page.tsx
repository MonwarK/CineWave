import {
  getMediaProgress,
  getUserData,
  getUserReviews,
} from '@/app/db/queries';
import UserProfile from '@/components/profile/UserProfile';

import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Achievements ",

}

export default async function UserAchievementPage() {
  const { userId } = await auth();
  if (!userId) return;

  const user = await getUserData(userId);
  const userReviews = await getUserReviews(userId);
  const finishedMovies = await getMediaProgress(userId);

  return (
    <UserProfile
      user={user}
      userId={userId}
      userReviews={userReviews || []}
      finishedMovies={finishedMovies || []}
      currentTab="achievements"
    />
  );
}
