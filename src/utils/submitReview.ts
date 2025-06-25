type Review = {
  movieId: number;
  isMovie: boolean;
  rating: number;
  review: string;
  movieTitle: string;
  posterPath: string;
}

export const submitReview = async ({ movieId, isMovie, rating, review, movieTitle, posterPath }: Review) => {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    console.error("Review failed", json.error);
  } else {
    console.log("Review saved!", json.review);
  }
};