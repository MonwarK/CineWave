import classNames from "classnames";
import React from "react";

interface Props {
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
}

const genres = ["All", "Action", "Adventure", "Crime", "Documentary", "Drama"];

export default function Genres({ selectedGenre, setSelectedGenre }: Props) {
  return (
    <div className="flex space-x-6 overflow-x-auto no-scrollbar">
      {genres.map((genre) => (
        <div
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          className={classNames(
            "rounded-full cursor-pointer transition px-10 py-1",
            {
              "bg-gray-800/60 hover:bg-gray-800/40": selectedGenre !== genre,
              "bg-primary backdrop-opacity-60 hover:backdrop-opacity-40":
                selectedGenre === genre,
            }
          )}
        >
          {genre}
        </div>
      ))}
    </div>
  );
}
