'use client';
import { FinishedMedia } from '@/types/FinishedMedia';
import { Review } from '@/types/Review';
import { User } from '@/types/User';
import { useState } from 'react';
import Header from '../main/Header';
import ProfileBanner from './ProfileBanner';
import ProfileReviewListItem from './ProfileReviewListItem';

export default function ProfilePage({
  user,
  userId,
  userReviews,
  finishedMovies,
}: {
  user: User;
  userId?: string;
  userReviews: Review[];
  finishedMovies: FinishedMedia[];
}) {
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');

  const moviesWatched = finishedMovies.filter(x => x.is_movie === true);
  const seriesWatched = finishedMovies.filter(x => x.is_movie === false);

  const sortedMovies = [...userReviews].sort((a, b) => {
    if (sortBy === 'title') {
      return order === 'asc'
        ? a.movie_title.localeCompare(b.movie_title)
        : b.movie_title.localeCompare(a.movie_title);
    } else if (sortBy === 'rating') {
      return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    } else if (sortBy === "updated_at") {
      return order === 'asc'
        ? new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return 0;
  });

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
              Achievements
            </div>
          </div>
          <hr className="border-gray-600" />
        </div>
        {userReviews.length > 0 && (
          <div>
            <div className="mb-4 space-x-2 mt-4 flex justify-end items-center">
              <label>Sort By:</label>
              <select
                className="bg-orange-500/60 p-2 rounded-md"
                onChange={e => setSortBy(e.target.value)}
              >
                <option
                  className="rounded-md hover:bg-orange-700/60"
                  value={'title'}
                >
                  Title
                </option>
                <option
                  className="rounded-md hover:bg-orange-700/60"
                  value={'rating'}
                >
                  Rating
                </option>
                <option
                  className="rounded-md hover:bg-orange-700/60"
                  value={'updated_at'}
                >
                  Updated At
                </option>
              </select>
              <label>Order:</label>
              <select
                className="bg-orange-500/60 p-2 rounded-md "
                onChange={e => setOrder(e.target.value)}
              >
                <option
                  value={'asc'}
                  className="rounded-md hover:bg-orange-700/60"
                >
                  Ascending
                </option>
                <option
                  className="rounded-md hover:bg-orange-700/60 decoration-orange-500/60"
                  value={'desc'}
                >
                  Descending
                </option>
              </select>
            </div>
            <div className="space-y-5 py-10">
              {sortedMovies?.map((review, idx) => (
                <ProfileReviewListItem key={idx} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
