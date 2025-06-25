import React from 'react';
import StarRating from '../other/StarRating';

interface Props {
  voteAverage: number;
  voteCount: number;
}

export default function ReviewOverview({ voteAverage, voteCount }: Props) {
  return (
    <div>
      <div className="border border-orange-500 rounded-lg px-5 py-10 bg-gradient-to-r from-orange-800/50 to-zinc-900/50 text-center space-y-5">
        <div>
          <div className="text-4xl font-bold mb-2">{voteAverage}</div>
          <div className="flex justify-center">
            <StarRating rating={voteAverage} />
          </div>
        </div>
        <p className="text-xs">Based on {voteCount} reviews</p>
      </div>
    </div>
  );
}
