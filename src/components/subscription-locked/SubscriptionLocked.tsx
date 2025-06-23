import React from 'react';
import Header from '../main/Header';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Subscription Required | CineWave',
};

export default function SubscriptionLocked() {
  return (
    <div>
      <Header />

      <div className="pt-28 px-5 min-h-[80vh] grid place-items-center">
        <div className="bg-zinc-800/50 border border-zinc-600 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <Lock />
            <div className="text-xl font-semibold uppercase">
              Content Locked
            </div>
          </div>
          <div className="text-gray-400">
            Unfortunately, you do not have access to this. Please visit the{' '}
            <Link className="text-white hover:underline" href="/profile">
              Subscriptions Page
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
