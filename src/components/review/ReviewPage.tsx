'use client';

import { Movie } from '@/types/Movie';
import { Review } from '@/types/Review';
import { submitReview } from '@/utils/submitReview';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Header from '../main/Header';
import Content from '../other/Content';
import Loader from '../ui/Loader';
import ReviewForm from './ReviewForm';
import ReviewHeader from './ReviewHeader';
import ReviewList from './ReviewList';
import ReviewOverview from './ReviewOverview';
import ReviewTags from './ReviewTags';

export default function ReviewPage({ movie }: { movie: Movie }) {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMovie = movie.title ? true : false;

  const usersReview = reviews.find((x: Review) => x.user_id === user?.id);

  console.log(movie);

  useEffect(() => {
    if (!isLoading) return;
    setReviews([]);

    const fetchReviews = async () => {
      const res = await fetch(
        `/api/reviews?movie_id=${movie.id}&is_movie=${isMovie}`
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
    //TODO: Add checking if there is already a review from the user to stop botting and save DB resources
    submitReview({
      movieId: movie.id,
      isMovie,
      rating,
      review,
      movieTitle: movie.title || movie.name || '',
      posterPath: movie.poster_path,
      userId: user?.id as string
    }).then(() => setIsLoading(true));
  };

  const deleteReview = async (reviewId: string) => {
    await fetch(`/api/reviews?review_id=${reviewId}`, {
      method: 'DELETE',
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
            link={`/${isMovie ? 'movies' : 'series'}/${movie.id}`}
            title={movie.title || movie.name || ''}
          />

          {/* Tags */}
          <ReviewTags
            info={[
              new Date(movie.release_date || movie.first_air_date)
                .getFullYear()
                .toString(),
              isMovie ? 'Movie' : 'Series',
              isMovie
                ? `${movie.runtime} minutes`
                : `${movie.number_of_episodes} episodes`,
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
            <ReviewList
              reviews={reviews}
              onSubmit={onSubmit}
              deleteReview={deleteReview}
            />
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
