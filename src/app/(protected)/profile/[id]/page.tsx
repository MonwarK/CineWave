import {
  getMediaProgress,
  getUserData,
  getUserReviews,
} from '@/app/db/queries';
import ProfilePage from '@/components/profile/ProfilePage';

type Params = Promise<{ id: string }>;

export default async function Profile({ params }: { params: Params }) {
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

  return (
    <ProfilePage
      user={user}
      userReviews={userReviews || []}
      finishedMovies={finishedMovies || []}
    />
  );
}
