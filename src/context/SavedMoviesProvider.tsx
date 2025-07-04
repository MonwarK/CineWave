'use client';

import { notify } from '@/libs/notification';
import { Movie } from '@/types/Movie';
import { SavedMovie } from '@/types/SavedMovies';
import { removeMovie } from '@/utils/removeMovie';
import { saveMovie } from '@/utils/saveMovie';
import { createContext, useContext, useState } from 'react';

type SavedMoviesContextType = {
  savedMovies: SavedMovie[];
  addMovie: (movie: Movie, isMovie: boolean) => void;
  deleteMovie: (movie: Movie, isMovie: boolean) => void;
  isSaved: (movie_id: number, isMovie: boolean) => boolean;
};

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(
  undefined
);

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);
  if (!context) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
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

  const addMovie = (movie: Movie, isMovie: boolean) => {
    const isMovieSaved = isSaved(movie.id, isMovie);
    if (isMovieSaved) return;

    saveMovie(movie)
      .then(res => res.json())
      .then(json => {
        setSavedMovies(prev => [...prev, json.data[0]]);
        const title = '🎬 Added to Library';
        const description = `${
          movie.title || movie.name
        } is now available in your watchlist.`;
        notify(title, description);
      })
      .catch(e => console.log(e));
  };

  const deleteMovie = (movie: Movie, isMovie: boolean) => {
    const isMovieSaved = isSaved(movie.id, isMovie);
    if (!isMovieSaved) return;

    removeMovie(movie)
      .then(res => res.json())
      .then(json => {
        const currentMovie = json.data[0];

        const movies = savedMovies.filter(
          m => !(m.movie_id === currentMovie.movie_id && m.isMovie && isMovie)
        );

        setSavedMovies(movies);
      })
      .catch(e => console.log(e));
  };

  const isSaved = (movie_id: number, isMovie: boolean) => {
    return savedMovies.some(
      m => parseInt(m.movie_id) === movie_id && m.isMovie === isMovie
    );
  };

  return (
    <SavedMoviesContext.Provider
      value={{ savedMovies, addMovie, deleteMovie, isSaved }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
};
