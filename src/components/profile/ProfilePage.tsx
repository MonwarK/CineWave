import React from 'react';
import Header from '../main/Header';
import { User } from '@/types/User';
import ProfileBanner from './ProfileBanner';
import { Review } from '@/types/Review';
import ProfileReviewListItem from './ProfileReviewListItem';

export default function ProfilePage({
  user,
  userReviews,
}: {
  user: User;
  userReviews: Review[];
}) {
  return (
    <div>
      <Header />
      <ProfileBanner user={user} />
      <div className="p-5 py-10 max-w-screen-xl mx-auto">
        {/* Tabs */}
        <div className="space-y-5">
          <div className="flex space-x-10">
            <div className="uppercase font-semibold text-xl text-white cursor-pointer border-b-2 border-orange-400 pb-1">
              Reviews
            </div>
            <div className="uppercase font-semibold text-gray-400 text-xl hover:text-white cursor-pointer hover:border-b-2 border-orange-400 pb-1">
              Movies Watched
            </div>
            <div className="uppercase font-semibold text-gray-400 text-xl hover:text-white cursor-pointer hover:border-b-2 border-orange-400 pb-1">
              Series
            </div>
            <div className="uppercase font-semibold text-gray-400 text-xl hover:text-white cursor-pointer hover:border-b-2 border-orange-400 pb-1">
              Achievments
            </div>
          </div>
          <hr className="border-gray-600" />
        </div>
        {userReviews.length > 0 && (
          <div>
            <div className="space-y-5 py-10">
              {userReviews?.map((review, idx) => (
                <ProfileReviewListItem key={idx} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
