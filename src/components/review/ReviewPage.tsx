'use client';

import { Movie } from '@/types/Movie';
import React from 'react';
import Header from '../main/Header';
import Content from '../other/Content';
import ReviewHeader from './ReviewHeader';
import ReviewTags from './ReviewTags';
import ReviewOverview from './ReviewOverview';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ReviewPage({ movie }: { movie: Movie }) {
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
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
          />

          {/* Write a Review */}
          <ReviewForm />

          {/* User Reviews Header */}
          <div>
            <div className="text-center font-medium text-3xl">User Reviews</div>
          </div>

          {/* Reviews */}
          <ReviewList />
        </div>
      </Content>
    </div>
  );
}
