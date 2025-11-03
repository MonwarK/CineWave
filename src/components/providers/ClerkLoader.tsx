'use client';
import { useUser } from '@clerk/nextjs';

export default function ClerkLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useUser();
  if (!isLoaded) return null; // wait for Clerk to initialize

  return children;
}
