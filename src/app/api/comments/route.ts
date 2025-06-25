import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '@/libs/supabaseClient';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { movie_id, is_movie, comment, season, episode } = body;

  if (!movie_id || is_movie === undefined || !comment) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        user_id: userId,
        movie_id,
        is_movie,
        comment,
        season: season ?? null,
        episode: episode ?? null,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ comment: data }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const movie_id = searchParams.get('movie_id');
  const is_movie = searchParams.get('is_movie');
  const season = searchParams.get('season');
  const episode = searchParams.get('episode');

  if (!movie_id || is_movie === null) {
    return NextResponse.json(
      { error: 'Missing required params' },
      { status: 400 }
    );
  }

  let query = supabase
    .from('comments')
    .select('*, users(first_name, last_name, profile_image_url)')
    .eq('movie_id', parseInt(movie_id))
    .eq('is_movie', is_movie === 'true');

  if (season !== null) {
    query = query.eq('season', season === '' ? null : parseInt(season));
  }

  if (episode !== null) {
    query = query.eq('episode', episode === '' ? null : parseInt(episode));
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ comments: data }, { status: 200 });
}
