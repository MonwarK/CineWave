'use client';

import { Movie } from '@/types/Movie';
import { useEffect, useState } from 'react';
import Header from '../main/Header';
import Content from '../other/Content';
import ReviewForm from './ReviewForm';
import ReviewHeader from './ReviewHeader';
import ReviewList from './ReviewList';
import ReviewOverview from './ReviewOverview';
import ReviewTags from './ReviewTags';

export default function ReviewPage({ movie }: { movie: Movie }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `/api/reviews?movie_id=${movie.id}&is_movie=true`
      );
      const json = await res.json();
      setReviews(json.reviews);
    };

    fetchReviews();
  }, [movie.id]);

  const numberOfReviews = reviews.length;
  const reviewAverage =
    numberOfReviews > 0
      ? (
          reviews.reduce(
            (sum: number, review: { rating: number }) => sum + review.rating,
            0
          ) / numberOfReviews
        ).toFixed(1)
      : '0.0';

  return (
    <div>
      <Header />

      <Content>
        <div className="space-y-10">
          {/* Header */}
          <ReviewHeader
            link={`/movies/${movie.id}`}
            title={movie.title || ''}
          />

          {/* Tags */}
          <ReviewTags
            info={[
              new Date(movie.release_date).getFullYear().toString(),
              'Movie',
              `${movie.runtime} minutes`,
              movie.genres
                .slice(0, 3)
                .map(x => x.name)
                .join('  •  '),
            ]}
          />

          {/* Review Overview */}
          <ReviewOverview
            voteAverage={Number(reviewAverage) || 0}
            voteCount={numberOfReviews || 0}
          />

          {/* Write a Review */}
          <ReviewForm movie={movie} />

          {/* User Reviews Header */}
          <div>
            <div className="text-center font-medium text-3xl">User Reviews</div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} />
          ) : (
            <div>
              <p className='text-center'>This hasn&apos;t been reviewed yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </Content>
    </div>
  );
}
