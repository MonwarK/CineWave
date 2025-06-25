import { Review } from '@/types/Review';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {
  reviews: Review[];
  onSubmit: (rating: number, review: string) => void;
  deleteReview: (reviewId: string) => void;
}

export default function ReviewList({
  reviews,
  onSubmit,
  deleteReview,
}: ReviewListProps) {
  return (
    <div>
      <div className="space-y-5">
        {reviews.map((review: Review) => (
          <ReviewListItem
            key={`review-list-${review.id}`}
            review={review}
            onSubmit={onSubmit}
            deleteReview={deleteReview}
          />
        ))}
      </div>
    </div>
  );
}
