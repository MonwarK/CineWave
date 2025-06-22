import React from 'react';
import { fetchMovieById } from '@/utils/api';
import { Movie } from '@/types/Movie';
import WatchMoviePage from '@/components/watch-movie/WatchMoviePage';
import SubscriptionLocked from '@/components/subscription-locked/SubscriptionLocked';
import Header from '@/components/landing/Header';
import { getCurrentPlan } from '@/utils/getCurrentPlan';
import { auth } from '@clerk/nextjs/server';

type Params = Promise<{ id: string }>;

export default async function MovieWatchPage({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);
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

  return <WatchMoviePage movie={movie} isMovie={true} />;
}
