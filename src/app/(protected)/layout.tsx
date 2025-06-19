import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/libs/supabaseClient";
import { SavedMoviesProvider } from "@/context/SavedMoviesProvider";
import { SavedMovie } from "@/types/SavedMovies";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const { data: savedMovies = [] } = await supabase
    .from("saved_movies")
    .select("*")
    .eq("user_id", userId);

  return (
    <SavedMoviesProvider initialMovies={savedMovies as SavedMovie[]}>
      {children}
    </SavedMoviesProvider>
  );
}
