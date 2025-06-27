import { getUserData, getUserReviews } from '@/app/db/queries';
import Header from '@/components/main/Header';
import ProfileReviewListItem from '@/components/profile/ProfileReviewListItem';

import { auth } from '@clerk/nextjs/server';

export default async function UserProfile() {
  const { userId } = await auth();

  if (!userId) return;

  const currentUser = await getUserData(userId);
  const userReviews = await getUserReviews(userId);

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
                src={currentUser.profile_image_url}
              />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-xl font-bold mb-2">
                {currentUser.first_name} {currentUser.last_name}
              </p>
              <p className="text-xs text-gray-300">{currentUser.email}</p>
              <p className="text-xs text-gray-400">
                Member since{' '}
                {new Date(currentUser.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
          {userReviews?.map((review, idx) => (
            <ProfileReviewListItem key={idx} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
