import {
  getAchievements,
  getMediaProgress,
  getUserData,
  getUserReviews,
} from '@/app/db/queries';
import UserProfile from '@/components/profile/UserProfile';
import { supabase } from '@/libs/supabaseClient';

import { Metadata, ResolvedMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvedMetadata
): Promise<Metadata> {
  const { id } = params;

  const user = await getUserData(id);

  return {
    title: `${user.first_name} ${user.last_name}'s Achievements`,
    description: `View the profile and activity of user  ${user.first_name} ${user.last_name}.`,
  };
}

export default async function UserAchievementsPage({ params }: Props) {
  const { id } = params;

  const user = await getUserData(id);
  const userReviews = await getUserReviews(id);
  const finishedMovies = await getMediaProgress(id);
  const achievements = await getAchievements(id);

  return (
    <UserProfile
      user={user}
      userId={id}
      userReviews={userReviews || []}
      finishedMovies={finishedMovies || []}
      achievements={achievements || []}
      currentTab="achievements"
    />
  );
}
