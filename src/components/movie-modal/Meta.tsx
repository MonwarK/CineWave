import { Star } from 'lucide-react';
import React from 'react';

interface Props {
  vote_average: number;
  release_date: string;
}

export default function Meta({ vote_average, release_date }: Props) {
  return (
    <div className="flex items-center space-x-5">
      {vote_average !== 0 && (
        <div className="bg-gray-700/50 px-2 py-1 font-medium rounded-md flex items-center space-x-2">
          <Star fill="orange" className="w-4 text-yellow-500" />
          <p>{Math.round(vote_average * 10) / 10}/10</p>
        </div>
      )}
      {release_date && (
        <div className="text-gray-300">
          <p>{new Date(release_date).getFullYear()}</p>
        </div>
      )}
      <div className="bg-gradient-to-r px-2 py-1 from-red-500 to-orange-500 rounded-md">
        <p>Trending</p>
      </div>
    </div>
  );
}
