"use client";

import { Movie } from "@/types/Movie";
import { useState } from "react";
import MovieRowItem from "../discover/MovieRowItem";
import MovieModal from "../movie-modal/MovieModal";

interface Props {
  series: Movie[];
}

export default function SeriesSection({ series }: Props) {
  const [selectSeries, setSelectedSeries] = useState(null);
  console.log(series);
  return (
    <>
      <div className="py-10 space-y-18">
        <div className="flex justify-center flex-wrap gap-4">
          {series.map((serie: Movie) => (
            <MovieRowItem
              key={serie.id}
              movie={serie}
              selectMovie={() => setSelectedSeries(serie as any)}
            />
          ))}
        </div>

        <MovieModal
          movie={selectSeries}
          onClose={() => setSelectedSeries(null)}
        />
      </div>
    </>
  );
}
