import Footer from '@/components/main/Footer';
import { AchievementsProvider } from '@/context/Achievements';
import { SavedMoviesProvider } from '@/context/SavedMoviesProvider';
import { supabase } from '@/libs/supabaseClient';
import { Achievement, UserAchievements } from '@/types/Achievements';
import { SavedMovie } from '@/types/SavedMovies';
import { auth } from '@clerk/nextjs/server';
import { getAchievements, getUserAchievements } from '../db/queries';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) return;

  const { data: savedMovies = [] } = await supabase
    .from('saved_movies')
    .select('*')
    .eq('user_id', userId);

  const achievements = await getAchievements();
  const userAchievements = await getUserAchievements(userId);

  return (
    <SavedMoviesProvider initialMovies={savedMovies as SavedMovie[]}>
      <AchievementsProvider
        initialAchievements={achievements as Achievement[]}
        initialUserAchievements={userAchievements as UserAchievements[]}
      >
        <div className="min-h-[90vh] bg-zinc-900/50 pb-10">{children}</div>
        <Footer />
      </AchievementsProvider>
    </SavedMoviesProvider>
  );
}
