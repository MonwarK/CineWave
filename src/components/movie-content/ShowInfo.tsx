import { Movie } from '@/types/Movie';
import React from 'react';

export default function ShowInfo({ show }: { show: Movie }) {
  const info = [
    {
      heading: 'First Air Date',
      content: new Date(show.first_air_date).toDateString(),
    },
    {
      heading: 'Last Air Date',
      content: new Date(show.last_air_date).toDateString(),
    },
    {
      heading: 'Episode Runtime',
      content:
        show.episode_run_time && show.episode_run_time > 0
          ? `${show.episode_run_time} Min`
          : 'Unknown',
    },
    {
      heading: 'Network',
      content: show.networks.map((x: any) => x.name).join(', '),
    },
    {
      heading: 'Seasons',
      content: show.number_of_seasons,
    },
    {
      heading: 'Episodes',
      content: show.number_of_episodes,
    },
    {
      heading: 'Created By',
      content:
        show.created_by.length > 0
          ? show.created_by?.map((x: any) => x.name).join(', ')
          : 'Unknown',
    },
    {
      heading: 'Language',
      content: show.spoken_languages?.[0]?.english_name || 'Not Found',
    },
  ];

  return (
    <div className="bg-zinc-900 px-8 py-10 rounded-lg border border-zinc-700">
      <div className="space-y-7">
        <h3 className="text-xl uppercase font-semibold">Show Info</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.map(item => (
            <div key={item.heading} className="flex gap-3 items-center">
              <div>
                <p className="text-sm text-muted-foreground">{item.heading}</p>
                <p className="font-medium">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
