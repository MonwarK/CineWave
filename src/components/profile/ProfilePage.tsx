'use client';
import { FinishedMedia } from '@/types/FinishedMedia';
import { Review } from '@/types/Review';
import { User } from '@/types/User';
import Header from '../main/Header';
import ProfileBanner from './ProfileBanner';
import ProfileTabs from './ProfileTabs';
import ProfileReviews from './ProfileReviews';

export default function ProfilePage({
  user,
  userId,
  userReviews,
  finishedMovies,
  currentTab,
}: {
  user: User;
  userId?: string;
  userReviews: Review[];
  finishedMovies: FinishedMedia[];
  currentTab: string;
}) {
  const moviesWatched = finishedMovies.filter(x => x.is_movie === true);
  const seriesWatched = finishedMovies.filter(x => x.is_movie === false);

  return (
    <div>
      <Header />
      <ProfileBanner
        user={user}
        userId={userId}
        reviewCount={userReviews.length}
        moviesWatched={moviesWatched.length}
        seriesWatched={seriesWatched.length}
      />
      <div className="p-5 py-10 max-w-screen-xl mx-auto">
        <ProfileTabs currentTab={currentTab} />

        {currentTab === 'reviews' && (
          <ProfileReviews userReviews={userReviews} />
        )}
      </div>
    </div>
  );
}
