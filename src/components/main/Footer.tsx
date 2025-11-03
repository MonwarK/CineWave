'use client';

import { useAuth } from '@clerk/nextjs';
import { Star } from 'lucide-react';
import Link from 'next/link';

const links = [
  {
    name: 'Home',
    link: '/discover',
  },
  {
    name: 'Trending',
    link: '/trending',
  },
  {
    name: 'TV Shows',
    link: '/series',
  },
  {
    name: 'Movies',
    link: '/movies',
  },
  {
    name: 'My List',
    link: '/list',
  },
];

export default function Footer() {
  const { isSignedIn } = useAuth();

  return (
    <footer className="bg-black border-t-8 border-orange-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">
                CineWave
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your gateway to unlimited entertainment
              </p>
            </div>
          </div>

          {/* Links Section */}
          {isSignedIn && (
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {links?.map(link => (
                  <Link
                    key={`link-${link.name}`}
                    href={link.link}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-zinc-800 pt-8 mb-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              Important Notice
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Data provided by TMDb API. CineWave doesn't host movies or TV
              shows - we only share links to content hosted by third-party
              sites, over which we have no control. We take intellectual
              property rights seriously. If you believe a third party is
              infringing on your copyright, we recommend reaching out directly
              to the hosting provider or content source to address the issue. We
              do not host any content ourselves, we simply list links to
              external sources.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-zinc-400">
                © {new Date().getFullYear()} CineWave. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-xs text-zinc-500">
                <span>Powered by</span>
                <Star size={12} className="fill-blue-500 text-blue-500" />
                <span className="text-blue-400">TMDb</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-zinc-500">
              <Link
                href="/privacy"
                className="hover:text-zinc-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-zinc-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="/contact"
                className="hover:text-zinc-400 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
