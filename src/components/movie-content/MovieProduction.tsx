import { Movie } from "@/types/Movie";
import React from "react";

export default function MovieProduction({ movie }: { movie: Movie }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div className="space-y-8">
        <div className="text-2xl font-semibold">Production Companies</div>
        <div className="flex gap-4">
          {movie.production_companies?.map((company: any) => (
            <div
              key={`company-${company.name}`}
              className="flex items-center flex-col gap-3 w-32 text-center"
            >
              <div className="w-20 h-20 grid place-items-center rounded-full bg-zinc-800">
                <p className="text-2xl">
                  {company.name.split(" ").map((x: string) => x.charAt(0))}
                </p>
              </div>
              <p className="font-medium text-xs">{company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
