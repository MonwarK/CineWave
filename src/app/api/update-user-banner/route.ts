import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/libs/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  const body = await req.json();
  const { banner } = body;

  const { error } = await supabase
    .from('users')
    .update({
      banner,
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }

  return NextResponse.json({ success: true, banner });
}
