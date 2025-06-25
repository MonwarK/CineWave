import React from 'react';
import ReviewListItem from './ReviewListItem';

export default function ReviewList({ reviews }: any) {
  return (
    <div>
      <div className="space-y-5">
        {reviews.map(review => (
          <ReviewListItem key={`review-list-${review.id}`} review={review} />
        ))}
      </div>
    </div>
  );
}
