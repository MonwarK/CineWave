import { supabase } from '@/libs/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { show_id, title, overview, poster_path, season, episode } = body;

  if (!show_id || season == null || episode == null) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data, error } = await supabase.from('series_progress').upsert(
    [
      {
        user_id: userId,
        show_id,
        title,
        overview,
        poster_path,
        season,
        episode,
        updated_at: new Date().toISOString(),
      },
    ],
    { onConflict: 'user_id, show_id' }
  );

  if (error) {
    console.error('Supabase upsert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
