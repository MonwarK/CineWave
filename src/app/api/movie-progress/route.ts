import { supabase } from '@/libs/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { media_id, is_movie, title, overview, poster_path } = body;

  if (!media_id || is_movie === undefined || !title) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase.from('user_finished_media').upsert(
    [
      {
        user_id: userId,
        media_id,
        is_movie,
        title,
        overview: overview,
        poster_path: poster_path,
        finished_at: new Date().toISOString(),
      },
    ],
    { onConflict: 'user_id, media_id' }
  );

  if (error) {
    console.error('Supabase upsert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
