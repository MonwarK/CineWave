import { supabase } from "@/libs/supabaseClient";

export async function unlockAchievement(userId: string, title: string) {
  const { data: achievement, error} = await supabase
  .from("achievements")
  .select("id")
  .eq("title", title)
  .single();

  if(error || !achievement) return;

  await supabase.from("user_achievements").upsert({
    user_id: userId,
    achievement_id: achievement.id,
  })
}
