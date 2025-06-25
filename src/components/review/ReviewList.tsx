import React from 'react';
import ReviewListItem from './ReviewListItem';

export default function ReviewList() {
  return (
    <div>
      <div className="space-y-5">
        {[1, 2, 3, 4].map((_, i) => (
          <ReviewListItem key={`review-list-${i}`} />
        ))}
      </div>
    </div>
  );
}
