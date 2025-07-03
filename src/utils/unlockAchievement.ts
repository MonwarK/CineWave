import { supabase } from '@/libs/supabaseClient';

export async function unlockAchievement(userId: string, title: string) {
  const { data: achievement, error: achievementError } = await supabase
    .from('achievements')
    .select('id')
    .eq('title', title)
    .single();

  if (achievementError || !achievement) return;

  const { data: unlockedAchievement, error: upsertError } = await supabase
    .from('user_achievements')
    .upsert(
      {
        user_id: userId,
        achievement_id: achievement.id,
      },
      { onConflict: 'user_id,achievement_id' }
    )
    .select(
      `*,
      achievements (
        title,
        description,
        icon_url
      )
    `
    )
    .single();

  if (upsertError || !unlockedAchievement) return;

  return unlockedAchievement;
}
