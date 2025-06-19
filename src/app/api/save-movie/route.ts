import { supabase } from "@/libs/supabaseClient";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { movie_id, title, isMovie, poster_path } = body;

  const movieItem = { user_id: userId, movie_id, title, isMovie, poster_path };

  const { data, error } = await supabase
    .from("saved_movies")
    .insert([movieItem])
    .select();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
