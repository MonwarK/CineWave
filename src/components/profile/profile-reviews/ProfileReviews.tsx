import { Review } from '@/types/Review';
import { useState } from 'react';
import ProfileReviewListItem from './ProfileReviewListItem';

export default function ProfileReviews({
  userReviews,
}: {
  userReviews: Review[];
}) {
  const [sortBy, setSortBy] = useState('updated_at');
  const [order, setOrder] = useState('desc');

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
        <div className="mb-4 space-x-5 mt-4 flex justify-end items-center">
          <div className="space-x-2">
            <label>Sort By:</label>
            <select
              className="bg-orange-500/60 p-2 rounded-md"
              onChange={e => setSortBy(e.target.value)}
            >
              <option
                className="rounded-md hover:bg-orange-700/60"
                value={'updated_at'}
              >
                Recent
              </option>
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
            </select>
          </div>
          <div className="space-x-2">
            <label>Order:</label>
            <select
              className="bg-orange-500/60 p-2 rounded-md "
              onChange={e => setOrder(e.target.value)}
            >
              <option
                className="rounded-md hover:bg-orange-700/60 decoration-orange-500/60"
                value={'desc'}
              >
                Descending
              </option>
              <option
                value={'asc'}
                className="rounded-md hover:bg-orange-700/60"
              >
                Ascending
              </option>
            </select>
          </div>
        </div>
        <div className="space-y-5 py-10">
          {sortedMovies?.map(review => (
            <ProfileReviewListItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    )
  );
}
