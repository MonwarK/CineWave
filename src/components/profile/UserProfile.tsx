'use client';
import {
  Achievement,
  UserAchievements as UserAchiementsType,
} from '@/types/Achievements';
import { FinishedMedia } from '@/types/FinishedMedia';
import { Review } from '@/types/Review';
import { User } from '@/types/User';
import Header from '../main/Header';
import UserAchievements from './profile-achievements/UserAchievements';
import ProfileBanner from './profile-banner/ProfileBanner';
import ProfileReviews from './profile-reviews/ProfileReviews';
import ProfileTabs from './ProfileTabs';
import UserWatched from './UserWatched';

export default function UserProfile({
  user,
  userId,
  userReviews,
  finishedMovies,
  currentTab,
  episodesWatched
}: {
  user: User;
  userId: string;
  userReviews: Review[];
  finishedMovies: FinishedMedia[];
  achievements?: Achievement[];
  userAchievements?: UserAchiementsType[];
  currentTab: string;
  episodesWatched?: number;
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
        episodesWatched={episodesWatched || 0}
      />
      <div className="p-5 py-10 max-w-screen-xl mx-auto">
        <ProfileTabs currentTab={currentTab} userId={userId} />

        {currentTab === 'reviews' && (
          <ProfileReviews userReviews={userReviews} />
        )}
        {currentTab === 'movies' && (
          <UserWatched finishedMedia={moviesWatched} mediaType="movies" />
        )}
        {currentTab === 'series' && (
          <UserWatched finishedMedia={seriesWatched} mediaType="series" />
        )}
        {currentTab === 'achievements' && <UserAchievements />}
      </div>
    </div>
  );
}
