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
import { submitReview } from '@/utils/submitReview';
import { Review } from '@/types/Review';
import { useUser } from '@clerk/nextjs';
import Loader from '../ui/Loader';

export default function ReviewPage({ movie }: { movie: Movie }) {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(reviews);

  const usersReview = reviews.find((x: Review) => x.user_id === user?.id);

  useEffect(() => {
    if (!isLoading) return;
    setReviews([]);

    const fetchReviews = async () => {
      const res = await fetch(
        `/api/reviews?movie_id=${movie.id}&is_movie=true`
      );
      const json = await res.json();
      setReviews(json.reviews);
    };

    fetchReviews().then(() => setIsLoading(false));
  }, [movie.id, isLoading]);

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

  const onSubmit = (rating: number, review: string) => {
    const isMovie = movie.title ? true : false;

    //TODO: Add checking if there is already a review from the user to stop botting and save DB resources
    submitReview({
      movieId: movie.id,
      isMovie,
      rating,
      review,
      movieTitle: movie.title || movie.name || '',
      posterPath: movie.poster_path,
    }).then(() => setIsLoading(true));
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <Loader />
      </div>
    );
  }

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
          <ReviewForm usersReview={usersReview} onSubmit={onSubmit} />

          {/* User Reviews Header */}
          <div>
            <div className="text-center font-medium text-3xl">User Reviews</div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} onSubmit={onSubmit} />
          ) : (
            <div>
              <p className="text-center">
                This hasn&apos;t been reviewed yet. Start the conversation!
              </p>
            </div>
          )}
        </div>
        {/* Add Pagination later */}
      </Content>
    </div>
  );
}
