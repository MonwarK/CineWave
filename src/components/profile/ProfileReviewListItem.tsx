"use client"
import { Review } from '@/types/Review';
import { Star } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';

interface Props {
  review: Review;
}

export default function ProfileReviewListItem({review} : Props) {
    const [expanded, setExpanded] = useState(false)

    const shouldShowToggle =
    review.review.split('\n').length > 3 || review.review.length > 300;

  return (
    <div className="bg-zinc-800/50 rounded-2xl p-5 border border-gray-600 backdrop:blur-2xl flex items-center">
      <div className='flex flex-1 space-x-5'>
        <div>
          <img 
          className='w-28 rounded-md border border-gray-700'
          src={`https://image.tmdb.org/t/p/w500${review.poster_path}`} /> 
        </div>
      <div className='flex flex-col w-full'>
      <div className='space-y-1 flex-1'>
          <h2 className='text-xl font-bold mb-2'>{review.movie_title}</h2>
          <div className='flex gap-2 items-center'>
            <p className='flex gap-1 items-center text-sm'><Star className='fill-yellow-500 text-yellow-500' /> {review.rating}/10 </p>
            •
            <p className='text-sm'>{new Date(review.created_at).toLocaleDateString()}</p>
            •
            <p className='text-sm'>{new Date(review.updated_at).toLocaleDateString()}</p>
          </div>
          <div className={`whitespace-pre-wrap transition-all duration-300 ease-in-out pt-2 ${expanded ? '' : 'line-clamp-3'}`}>
            <Markdown>{review.review}</Markdown>
          </div>
          {shouldShowToggle && (
            <button 
            className='text-sm text-blue-500 hover:underline cursor-pointer'
            onClick={() => setExpanded(prev => !prev)}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      
      </div>
      </div>
    </div>
  )
}
