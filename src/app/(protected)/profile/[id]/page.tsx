import {
  getEpisodesWatched,
  getMediaProgress,
  getUserData,
  getUserReviews,
} from '@/app/db/queries';
import UserProfile from '@/components/profile/UserProfile';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: any) {
  const { id } = await params;

  const user = await getUserData(id);

  return {
    title: `${user.first_name} ${user.last_name}'s Reviews`,
    description: `View the profile and activity of user  ${user.first_name} ${user.last_name}.`,
  };
}

export default async function Profile({ params }: Props) {
  const { id } = await params;

  const user = await getUserData(id);

  if (!user) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        User Not Found
      </div>
    );
  }

  const userReviews = await getUserReviews(id);
  const finishedMovies = await getMediaProgress(id);
  const episodesWatched = await getEpisodesWatched(id);
  

  return (
    <UserProfile
      user={user}
      userId={id}
      userReviews={userReviews || []}
      finishedMovies={finishedMovies || []}
      currentTab="reviews"
    />
  );
}
