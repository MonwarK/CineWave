import ProfileSubscriptionPage from '@/components/profile/ProfileSubscriptionPage';
import { getCurrentPlan } from '@/utils/getCurrentPlan';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'Profile | Cinewave',
};

export default async function CustomProfilePage() {
  const { has } = await auth();

  const hasStarterPlan = has({ plan: 'starter' });
  const hasStandardPlan = has({ plan: 'standard_plan' });
  const hasPremiumPlan = has({ plan: 'premium' });

  const currentPlan = getCurrentPlan(
    hasStarterPlan,
    hasStandardPlan,
    hasPremiumPlan
  );

  return <ProfileSubscriptionPage currentPlan={currentPlan} />;
}
