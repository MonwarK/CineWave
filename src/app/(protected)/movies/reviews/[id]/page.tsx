import Header from '@/components/main/Header';
import Content from '@/components/other/Content';
import NumberRating from '@/components/other/NumberRating';
import StarRating from '@/components/other/StarRating';
import SquaredButton from '@/components/ui/SquaredButton';
import { Movie } from '@/types/Movie';
import { fetchMovieById } from '@/utils/api';
import { auth, currentUser } from '@clerk/nextjs/server';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Params = Promise<{ id: string }>;

export default async function page({ params }: { params: Params }) {
  const user = await currentUser();
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  return (
    <div>
      <Header />

      <Content>
        <div className="space-y-10">
          {/* Header */}
          <div className="grid grid-cols-8 items-center">
            <div>
              <Link href={`/movies/${movie.id}`}>
                <ChevronLeft />
              </Link>
            </div>
            <div className="text-center col-span-6">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
            </div>
            <div />
          </div>

          {/* Tags */}
          <div>
            <div className="flex justify-center space-x-6">
              <div className="px-4 py-1 border border-orange-500 text-xs bg-zinc-700/50 rounded-full">
                {new Date(movie.release_date).getFullYear()}
              </div>
              <div className="px-4 py-1 border border-orange-500 text-xs bg-zinc-700/50 rounded-full">
                Movie
              </div>
              <div className="px-4 py-1 border border-orange-500 text-xs bg-zinc-700/50 rounded-full">
                {movie.runtime} minutes
              </div>
              <div className="px-4 py-1 border border-orange-500 text-xs bg-zinc-700/50 rounded-full">
                {movie.genres
                  .slice(0, 3)
                  .map(x => x.name)
                  .join('  •  ')}
              </div>
            </div>
          </div>

          {/* Review Overview */}
          <div>
            <div className="border border-orange-500 rounded-lg px-5 py-10 bg-gradient-to-r from-orange-800/50 to-zinc-900/50 text-center space-y-5">
              <div>
                <div className="text-4xl font-bold mb-2">
                  {movie.vote_average}
                </div>
                <div className="flex justify-center">
                  <StarRating rating={movie.vote_average} />
                </div>
              </div>
              <p className="text-xs">Based on {movie.vote_count} reviews</p>
            </div>
          </div>

          {/* Write a Review */}
          <div className="bg-zinc-800/50 p-5 border border-zinc-700 rounded-lg space-y-5">
            {/* Heading */}
            <div>
              <h2 className="text-xl font-semibold">Write a Review</h2>
            </div>

            {/* Form */}
            <div>
              <div className="space-y-2">
                <div>Your Rating</div>
                <div>
                  <NumberRating rating={3} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div>Your Review</div>
              <div>
                <textarea className="w-full border rounded-md border-zinc-600 bg-zinc-900 min-h-28" />
              </div>
            </div>

            <SquaredButton>Submit Review</SquaredButton>
          </div>
          {/* User Reviews Header */}
          <div>
            <div className="text-center font-medium text-3xl">User Reviews</div>
          </div>

          {/* Reviews */}
          <div>
            <div className="space-y-5">
              {[1, 2, 3, 4].map(() => (
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900/10 p-5 border border-zinc-700 rounded-lg space-y-3">
                  {/* Top Section */}
                  <div>
                    <div className="flex items-center space-x-5">
                      {/* Profile Picture */}
                      <div>
                        <img className="w-14" src={user?.imageUrl} alt="" />
                      </div>

                      {/* Username and time sent */}
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold text-sm">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(user?.createdAt || '').toUTCString()}
                        </p>
                      </div>

                      {/* Rating */}
                    </div>
                  </div>

                  {/* Mid Section */}
                  <div>
                    <p className="text-sm">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Dolorem necessitatibus quos culpa nesciunt tempore numquam
                      voluptas vero cum ex unde sequi et vitae eaque adipisci
                      impedit ducimus, sint quam nemo?
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}
