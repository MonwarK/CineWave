import {
  getMediaProgress,
  getUserData,
  getUserReviews,
} from '@/app/db/queries';
import ProfilePage from '@/components/profile/ProfilePage';

import { auth } from '@clerk/nextjs/server';

export default async function UserProfile() {
  const { userId } = await auth();
  if (!userId) return;

  const user = await getUserData(userId);
  const userReviews = await getUserReviews(userId);
  const finishedMovies = await getMediaProgress(userId);

  return (
    <ProfilePage
      user={user}
      userId={userId}
      userReviews={userReviews || []}
      finishedMovies={finishedMovies || []}
    />
  );
}
