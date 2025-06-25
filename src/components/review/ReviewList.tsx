import { Review } from '@/types/Review';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div>
      <div className="space-y-5">
        {reviews.map((review) => (
          <ReviewListItem key={`review-list-${review.id}`} review={review} />
        ))}
      </div>
    </div>
  );
}
