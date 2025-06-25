import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/libs/supabaseClient';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eventType = body.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const user = body.data;

    const { id, first_name, last_name, email_addresses, profile_image_url } =
      user;
    const email = email_addresses?.[0]?.email_address;

    const { error } = await supabase.from('users').upsert({
      id,
      first_name,
      last_name,
      email,
      profile_image_url,
    });

    if (error) {
      console.error('Error saving user to Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to save user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ ignored: true }, { status: 200 });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
