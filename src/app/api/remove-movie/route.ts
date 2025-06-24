import { supabase } from '@/libs/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { movie_id, isMovie } = body;

  const { data, error } = await supabase
    .from('saved_movies')
    .delete()
    .match({ movie_id: movie_id, isMovie: isMovie })
    .select();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
