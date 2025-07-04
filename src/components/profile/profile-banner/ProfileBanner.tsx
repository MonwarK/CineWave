'use client';

import { User } from '@/types/User';
import { updateUserBanner } from '@/utils/updateUserBanner';
import { useState } from 'react';
import BannerModal from './BannerModal';
import ProfileBannerImage from './ProfileBannerImage';
import ProfileBannerInfo from './ProfileBannerInfo';

export default function ProfileBanner({
  user,
  userId,
  reviewCount,
  moviesWatched,
  seriesWatched,
  episodesWatched
}: {
  user: User;
  userId?: string;
  reviewCount: number;
  moviesWatched: number;
  seriesWatched: number;
  episodesWatched: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(
    user.banner ||
      'https://image.tmdb.org/t/p/w1920/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg'
  );
  const [bannerPreview, setBannerPreview] = useState(currentBanner);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setBannerPreview(currentBanner);
    setIsOpen(false);
  };

  const onBannerSave = (banner: string) => {
    updateUserBanner(banner);
    setCurrentBanner(banner);
    setBannerPreview(banner);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center p-0">
      <div className="relative w-full overflow-hidden min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh] text-white flex flex-col justify-end">
        <ProfileBannerImage
          bannerPreview={bannerPreview}
          isUser={userId === user.id}
          openModal={openModal}
        />

        <BannerModal
          title="Choose your banner"
          isOpen={isOpen}
          onClose={() => closeModal()}
          bannerPreview={bannerPreview}
          setBannerPreview={setBannerPreview}
          onBannerSave={onBannerSave}
        />

        <ProfileBannerInfo
          user={user}
          reviewCount={reviewCount}
          moviesWatched={moviesWatched}
          seriesWatched={seriesWatched}
          episodesWatched={episodesWatched}
        />
      </div>
    </div>
  );
}
