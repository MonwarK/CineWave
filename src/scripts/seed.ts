

import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const achievements = [
  {
    title: 'First Review',
    description: 'Submitted your first review.',
    icon_url: 'https://example.com/icons/review1.png',
  },
  {
    title: 'Reviewer Lv1',
    description: 'Submitted 10 reviews.',
    icon_url: 'https://example.com/icons/review10.png',
  },
  {
    title: 'Reviewer Lv2',
    description: 'Submitted 50 reviews.',
    icon_url: 'https://example.com/icons/review50.png',
  },
  {
    title: 'Reviewer Lv3',
    description: 'Submitted 100 reviews.',
    icon_url: 'https://example.com/icons/review100.png',
  },
]

async function seedAchievements() {
  const { data, error } = await supabase.from('achievements').upsert(achievements)

  if (error) {
    console.error('Error seeding achievements:', error)
  } else {
    console.log('Seeded achievements:', data)
  }
}

seedAchievements();
