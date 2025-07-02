export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  created_at: Date;
};

export type UserAchievements = {
  id: string;
  user_id: string;
  achievement_id: string;
  achievements: Achievement;
  unlocked_at: Date;
};
