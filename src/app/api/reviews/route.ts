import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/libs/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';

// Create or update a review
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { movie_id, is_movie, rating, review, movie_title, poster_path } = body;

  if (!movie_id || !rating || is_movie === undefined) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('movie_reviews')
    .upsert(
      [
        {
          user_id: userId,
          movie_id,
          is_movie,
          rating,
          review,
          movie_title,
          poster_path,
        },
      ],
      {
        onConflict: 'user_id, movie_id',
      }
    )
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ review: data[0] }, { status: 200 });
}

// Get all reviews for a movie/show
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const movie_id = searchParams.get('movie_id');
  const is_movie = searchParams.get('is_movie');

  if (!movie_id || is_movie === null) {
    return NextResponse.json(
      { error: 'Missing movie_id or is_movie' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('movie_reviews')
    .select('*, users(first_name, last_name, profile_image_url)')
    .eq('movie_id', parseInt(movie_id))
    .eq('is_movie', is_movie === 'true')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ reviews: data }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const review_id = searchParams.get('review_id');

  if (!review_id) {
    return NextResponse.json({ error: 'Missing review_id' }, { status: 400 });
  }

  const { error } = await supabase
    .from('movie_reviews')
    .delete()
    .match({ id: review_id });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
