import React from "react";

interface Props {
  genres: {
    id: number;
    name: string;
  }[];
}

export default function Genres({ genres }: Props) {
  return (
    <div className="flex space-x-2 text-xs">
      {genres.map(
        (genre) =>
          genre.name && (
            <div>
              <div
                key={genre.id}
                className="bg-gray-700/50 px-3 py-1 rounded-full"
              >
                {genre.name}
              </div>
            </div>
          )
      )}
    </div>
  );
}
