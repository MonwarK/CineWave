"use server"
import { supabase } from "@/libs/supabaseClient";
import { currentUser } from "@clerk/nextjs/server";
import { unlockAchievement } from "./unlockAchievement";

type Review = {
  movieId: number;
  isMovie: boolean;
  rating: number;
  review: string;
  movieTitle: string;
  posterPath: string;
}

export const submitReview = async ({ movieId, isMovie, rating, review, movieTitle, posterPath }: Review) => {
  const user = await currentUser();
  if(!user) return;

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
  } 



    const { count, error} = await supabase
    .from("movie_reviews")
    .select("*", { count: "exact", head: true})
    .eq("user_id", user.id);

    if(error) {
      console.error("Failed to count reviews", error)
    }

    switch(count) {
      case 1: 
      await unlockAchievement(user.id, "First Review")
      break;
      case 10:
      await unlockAchievement(user.id, "Reviewer Lv1")
      break;
      case 50:
      await unlockAchievement(user.id, "Reviewer Lv2")
      case 100:
      await unlockAchievement(user.id, "Reviewer Lv3")
      break;
      default:
      break;
    }

    
  };