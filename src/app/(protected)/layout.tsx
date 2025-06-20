import Header from "@/components/main/Header";
import { SavedMoviesProvider } from "@/context/SavedMoviesProvider";
import { supabase } from "@/libs/supabaseClient";
import { SavedMovie } from "@/types/SavedMovies";
import { auth } from "@clerk/nextjs/server";

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
    <>
    <Header/>
        <SavedMoviesProvider initialMovies={savedMovies as SavedMovie[]}>
      {children}
    </SavedMoviesProvider>
    </>
  );
}
