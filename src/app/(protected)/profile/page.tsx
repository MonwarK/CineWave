import { getUserData, getUserReviews } from '@/app/db/queries';
import ProfilePage from '@/components/profile/ProfilePage';

import { auth } from '@clerk/nextjs/server';

export default async function UserProfile() {
  const { userId } = await auth();
  if (!userId) return;

  const user = await getUserData(userId);
  const userReviews = await getUserReviews(userId);

  return <ProfilePage user={user} userReviews={userReviews || []} />;
}
