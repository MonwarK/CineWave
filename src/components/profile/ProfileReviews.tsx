import React, { useState } from 'react';
import ProfileReviewListItem from './ProfileReviewListItem';
import { Review } from '@/types/Review';

export default function ProfileReviews({
  userReviews,
}: {
  userReviews: Review[];
}) {
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');

  const sortedMovies = [...userReviews].sort((a, b) => {
    if (sortBy === 'title') {
      return order === 'asc'
        ? a.movie_title.localeCompare(b.movie_title)
        : b.movie_title.localeCompare(a.movie_title);
    } else if (sortBy === 'rating') {
      return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    } else if (sortBy === 'updated_at') {
      return order === 'asc'
        ? new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return 0;
  });

  return (
    userReviews.length > 0 && (
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
            <option value={'asc'} className="rounded-md hover:bg-orange-700/60">
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
    )
  );
}
