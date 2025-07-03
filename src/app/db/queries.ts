import { supabase } from '@/libs/supabaseClient';

export async function getUserData(id: string) {
  if (!id) return;

  const { data, error } = await supabase.from('users').select().eq('id', id);

  if (error) {
    console.log('Error fetching user data from supabase', error);
    return;
  }

  return data[0];
}

export async function getUserReviews(id: string) {
  if (!id) return;

  const { data, error } = await supabase
    .from('movie_reviews')
    .select()
    .eq('user_id', id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.log('Error fetching user data from supabase', error);
    return;
  }

  return data;
}

export async function getMediaProgress(id: string) {
  if (!id) return;

  const { data, error } = await supabase
    .from('user_finished_media')
    .select('*')
    .eq('user_id', id)
    .order('finished_at', { ascending: false });

  if (error) {
    console.log('Error fetching user media from supabase', error);
    return;
  }

  return data;
}

export async function getAchievements() {
  const { data, error } = await supabase
    .from('achievements')
    .select(`*`)
    .order('order');

  console.log(data);

  if (error) {
    console.log('Error fetching achiements from supabase', error);
    return;
  }

  return data;
}

export async function getUserAchievements(id: string) {
  if (!id) return;

  const { data, error } = await supabase
    .from('user_achievements')
    .select(
      `*,
      achievements (
        title,
        description,
        icon_url,
        type,
        order
      )
    `
    )
    .eq('user_id', id);

  if (error) {
    console.log('Error fetching user achievements from supabase', error);
    return;
  }

  return data;
}
