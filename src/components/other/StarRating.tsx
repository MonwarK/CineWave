import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  className?: string;
};

export default function StarRating({
  rating,
  className = '',
}: StarRatingProps) {
  const starRating = Math.round((rating / 2) * 2) / 2;
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="w-5 h-5 fill-yellow-400 text-yellow-400"
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
  }

  return <div className={`flex items-center gap-1 ${className}`}>{stars}</div>;
}
