'use client';

import { Movie } from '@/types/Movie';
import React, { useEffect, useState } from 'react';
import Header from '../main/Header';
import Content from '../other/Content';
import ReviewHeader from './ReviewHeader';
import ReviewTags from './ReviewTags';
import ReviewOverview from './ReviewOverview';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

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
  const reviewAverage = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / numberOfReviews
  ).toFixed(1);

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
            voteAverage={reviewAverage || 0}
            voteCount={numberOfReviews || 0}
          />

          {/* Write a Review */}
          <ReviewForm movie={movie} />

          {/* User Reviews Header */}
          <div>
            <div className="text-center font-medium text-3xl">User Reviews</div>
          </div>

          {/* Reviews */}
          <ReviewList reviews={reviews} />
        </div>
      </Content>
    </div>
  );
}
