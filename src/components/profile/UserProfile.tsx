'use client';
import { FinishedMedia } from '@/types/FinishedMedia';
import { Review } from '@/types/Review';
import { User } from '@/types/User';
import Header from '../main/Header';
import ProfileBanner from './profile-banner/ProfileBanner';
import ProfileReviews from './ProfileReviews';
import ProfileTabs from './ProfileTabs';
import UserWatched from './UserWatched';

export default function UserProfile({
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

  console.log(userId);

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
        {userId ? (
          <ProfileTabs currentTab={currentTab} userId={userId} />
        ) : (
          <ProfileTabs currentTab={currentTab} />
        )}

        {currentTab === 'reviews' && (
          <ProfileReviews userReviews={userReviews} />
        )}
        {currentTab === 'movies' && (
          <UserWatched finishedMedia={moviesWatched} mediaType="movies" />
        )}
        {currentTab === 'series' && (
          <UserWatched finishedMedia={seriesWatched} mediaType="series" />
        )}
      </div>
    </div>
  );
}
