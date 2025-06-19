"use client";

import { Movie } from "@/types/Movie";
import { SavedMovie } from "@/types/SavedMovies";
import { saveMovie } from "@/utils/saveMovie";
import { createContext, useContext, useState } from "react";

type SavedMoviesContextType = {
  savedMovies: SavedMovie[];
  addMovie: (movie: Movie) => void;
  isSaved: (movie_id: number) => boolean;
};

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(
  undefined
);

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);
  if (!context) {
    throw new Error("useSavedMovies must be used within a SavedMoviesProvider");
  }
  return context;
};

type ProviderProps = {
  children: React.ReactNode;
  initialMovies: SavedMovie[];
};

export const SavedMoviesProvider = ({
  children,
  initialMovies,
}: ProviderProps) => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>(initialMovies);

  const addMovie = (movie: Movie) => {
    const isMovieSaved = isSaved(movie.id);
    if (isMovieSaved) return;

    saveMovie(movie)
      .then((res) => res.json())
      .then((json) => {
        setSavedMovies((prev) => [...prev, json.data[0]]);
      })
      .catch((e) => console.log(3, e));
  };

  const isSaved = (movie_id: number) => {
    return savedMovies.some((m) => parseInt(m.movie_id) === movie_id);
  };

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, addMovie, isSaved }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};
