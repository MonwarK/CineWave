import { getUserData, getUserReviews } from '@/app/db/queries';
import Header from '@/components/main/Header';
import ProfileReviewListItem from '@/components/profile/ProfileReviewListItem';
import SquaredButton from '@/components/ui/SquaredButton';
import Link from 'next/link';

type Params = Promise<{ id: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
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

  return (
    <div className="pt-20">
      <Header />
      <div className="max-w-screen-xl mx-auto w-full p-5 space-y-10">
        {/* User Card */}
        <div className="bg-zinc-800/50 rounded-2xl p-5 border border-gray-600 backdrop:blur-2xl flex items-center">
          <div className="flex flex-1 items-center space-x-5">
            <div>
              <img
                className="w-20 rounded-full border border-gray-700 duration-500 cursor-pointer"
                src={user.profile_image_url}
              />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-xl font-bold mb-2">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-300">{user.email}</p>
              <p className="text-xs text-gray-400">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className='flex justify-between items-center mb-2'>
          <h2 className="text-2xl font-bold">Most Recent Reviews</h2>
          <Link href={`/profile/${id}/reviews`} >
          <SquaredButton>
            View All
          </SquaredButton>
          </Link>
          </div>
          <div className='space-y-6'>
          {userReviews?.slice(0,3).map((review, idx) => (
            <ProfileReviewListItem key={idx} review={review} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
