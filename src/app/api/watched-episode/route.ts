import { supabase } from '@/libs/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { show_id, season, episode } = body;

  if (!show_id || season == null || episode == null) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data, error } = await supabase.from('watched_episodes').upsert(
    [
      {
        user_id: userId,
        show_id,
        season,
        episode,
        watched_at: new Date().toISOString(),
      },
    ],
    { onConflict: 'user_id,show_id,season,episode' }
  );

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: 'Episode marked as watched', data },
    { status: 200 }
  );
}
