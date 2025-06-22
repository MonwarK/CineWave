import React from 'react';
import { fetchTVById } from '@/utils/api';
import { Movie } from '@/types/Movie';
import WatchMoviePage from '@/components/watch-movie/WatchMoviePage';
import { getCurrentPlan } from '@/utils/getCurrentPlan';
import { auth } from '@clerk/nextjs/server';
import SubscriptionLocked from '@/components/subscription-locked/SubscriptionLocked';

type Params = Promise<{ id: string }>;

export default async function MovieWatchPage({ params }: { params: Params }) {
  const { id } = await params;
  const show: Movie = await fetchTVById(id);
  const { has } = await auth();

  const hasStarterPlan = has({ plan: 'starter' });
  const hasStandardPlan = has({ plan: 'standard_plan' });
  const hasPremiumPlan = has({ plan: 'premium' });

  const currentPlan = getCurrentPlan(
    hasStarterPlan,
    hasStandardPlan,
    hasPremiumPlan
  );

  if (!currentPlan) {
    return <SubscriptionLocked />;
  }

  return <WatchMoviePage movie={show} isMovie={false} />;
}
