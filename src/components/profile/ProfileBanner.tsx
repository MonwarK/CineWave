import { User } from '@/types/User';
import React from 'react';

export default function ProfileBanner({
  user,
  reviewCount,
  moviesWatched,
  seriesWatched,
}: {
  user: User;
  reviewCount: number;
  moviesWatched: number;
  seriesWatched: number;
}) {
  const username = user.first_name.toLowerCase();
  const dateJoined = new Date(user.created_at).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col justify-center items-center p-0">
      <div className="relative w-full overflow-hidden min-h-[40vh] lg:min-h-[50vh] text-white flex flex-col justify-end">
        <div className="absolute z-0 inset-0 h-full">
          <img
            className="h-full w-full object-none object-center absolute top-0 left-0 brightness-50 -z-10"
            src="https://image.tmdb.org/t/p/w1920/kU98MbVVgi72wzceyrEbClZmMFe.jpg"
          />
        </div>

        <div className="bg-black/50 relative">
          <div className="p-4 mx-auto w-full max-w-screen-xl space-y-10 space-x-4 ">
            <div>
              <div className="flex items-center gap-10">
                {/* Image */}
                <div>
                  <img
                    className="h-28 rounded-full border-gray-700 duration-500 cursor-pointer"
                    src={user.profile_image_url}
                  />
                </div>

                {/* Profile Info */}
                <div className="py-2 space-y-3 flex-1">
                  <div>
                    <div>
                      <p className="text-2xl font-bold mb-1">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-300 space-x-2">
                      <span>@{username}</span>
                      <span>•</span>
                      <span>Joined {dateJoined}</span>
                    </div>
                  </div>

                  {/* More Info */}
                  <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center text-sm text-gray-400">
                    {/* Watch stats */}
                    <div className="flex gap-5 py-2">
                      <span className="cursor-pointer">
                        <strong className="text-white mr-1">
                          {reviewCount}
                        </strong>{' '}
                        Reviews
                      </span>
                      <span>|</span>
                      <span className="cursor-pointer">
                        <strong className="text-white mr-1">
                          {moviesWatched}
                        </strong>{' '}
                        Movies Watched
                      </span>
                      <span>|</span>
                      <span className="cursor-pointer">
                        <strong className="text-white mr-1">
                          {seriesWatched}
                        </strong>{' '}
                        Series Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
