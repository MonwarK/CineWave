import { SearchIcon } from "lucide-react";
import React from "react";

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export default function SearchBarSection({
  search,
  setSearch,
  handleSearch,
}: Props) {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold mb-4">Search</h2>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-zinc-800/50 border border-orange-600/40 p-2 rounded-md flex items-center"
      >
        <div className="flex-1 px-4">
          <input
            className="w-full outline-none placeholder:text-gray-400"
            type="text"
            placeholder="Search for movies, TV Shows, actors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSearch} className="px-2">
          <SearchIcon className="cursor-pointer" color="lightgray" size={20} />
        </button>
      </form>
    </div>
  );
}
