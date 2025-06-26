import React from 'react';
import { fetchTVById } from '@/utils/api';
import { Movie } from '@/types/Movie';
import WatchMoviePage from '@/components/watch-movie/WatchMoviePage';
import { getCurrentPlan } from '@/utils/getCurrentPlan';
import { auth } from '@clerk/nextjs/server';
import SubscriptionLocked from '@/components/subscription-locked/SubscriptionLocked';
import { supabase } from '@/libs/supabaseClient';

type Params = Promise<{ id: string }>;

export default async function MovieWatchPage({ params }: { params: Params }) {
  const { userId } = await auth();
  const { id } = await params;
  const show: Movie = await fetchTVById(id);
  const { has } = await auth();

  const hasStarterPlan = has({ plan: 'starter' });
  const hasStandardPlan = has({ plan: 'standard_plan' });
  const hasPremiumPlan = has({ plan: 'premium' });

  const { data: seriesProgress, error: seriesProgressError } = await supabase
    .from('series_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('show_id', id);

  const currentPlan = getCurrentPlan(
    hasStarterPlan,
    hasStandardPlan,
    hasPremiumPlan
  );

  const currentEpisode = {
    season: seriesProgress?.[0]?.season || 1,
    episode: seriesProgress?.[0]?.episode || 1,
  };

  if (!currentPlan) {
    return <SubscriptionLocked />;
  }

  return (
    <WatchMoviePage
      movie={show}
      isMovie={false}
      currentEpisode={currentEpisode}
    />
  );
}
