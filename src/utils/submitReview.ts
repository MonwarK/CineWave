import { supabase } from '@/libs/supabaseClient';
import { unlockAchievement } from './unlockAchievement';

type Review = {
  movieId: number;
  isMovie: boolean;
  rating: number;
  review: string;
  movieTitle: string;
  posterPath: string;
  userId: string;
};

export const submitReview = async ({
  movieId,
  isMovie,
  rating,
  review,
  movieTitle,
  posterPath,
  userId,
}: Review) => {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      movie_id: movieId,
      is_movie: isMovie,
      rating,
      review,
      movie_title: movieTitle,
      poster_path: posterPath,
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('Review failed', json.error);
  }
  const { count, error } = await supabase
    .from('movie_reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Failed to count reviews', error);
  }

  switch (count) {
    case 1:
      await unlockAchievement(userId, 'First Review');
      break;
    case 10:
      await unlockAchievement(userId, 'Reviewer Lv1');
      break;
    case 50:
      await unlockAchievement(userId, 'Reviewer Lv2');
    case 100:
      await unlockAchievement(userId, 'Reviewer Lv3');
      break;
    default:
      break;
  }
};
