import { supabase } from "@/libs/supabaseClient";

export async function getUserData(id: string) {
  if(!id) return;

  const {data, error} = await supabase.from("users").select().eq("id", id);

  if(error) {
    console.log("Error fetching user data from supabase", error);
    return;
  }

  return data[0]; 
}

export async function getUserReviews(id: string) {
  if(!id) return;

  const {data, error} = await supabase.from("movie_reviews").select().eq("user_id", id);

  if(error) {
    console.log("Error fetching user data from supabase", error);
    return;
  }

  return data; 
}

