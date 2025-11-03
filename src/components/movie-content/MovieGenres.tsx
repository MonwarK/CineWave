// components/movie/MovieGenres.tsx
export default function MovieGenres({
  genres,
}: {
  genres: { name: string }[];
}) {
  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div className="space-y-8">
        <div className="text-2xl font-semibold mb-2">Genres</div>
        <div className="flex flex-wrap gap-4">
          {genres.map((genre, idx) => (
            <div key={genre.name} className="bg-gray-700/50 px-3 py-1 rounded-full">
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
