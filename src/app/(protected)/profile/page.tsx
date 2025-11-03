import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Your Profile ',
};

export default async function UserProfilePage() {
  const { userId } = await auth();
  if (!userId) return;

  redirect(`/profile/${userId}`);
}
