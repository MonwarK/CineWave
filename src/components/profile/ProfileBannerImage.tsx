import React from 'react';
import SquaredButton from '../ui/SquaredButton';

interface Props {
  bannerPreview: string;
  isUser: boolean;
  openModal: () => void;
}

export default function ProfileBannerImage({
  bannerPreview,
  isUser,
  openModal,
}: Props) {
  return (
    <div className="absolute z-0 inset-0 h-full group">
      <img
        className="h-full w-full object-none object-center absolute top-0 left-0 brightness-50 -z-10"
        src={bannerPreview}
        alt="user-banner"
      />
      <img
        className="h-full w-full object-cover object-center absolute top-0 left-0 brightness-30 blur-sm -z-20"
        src={bannerPreview}
        alt="user-banner"
      />
      {isUser && (
        <>
          {/* Modal Button */}
          <SquaredButton
            onClick={() => openModal()}
            variant="primary"
            className="absolute right-5 top-20 z-10 opacity-0 group-hover:opacity-100 ease-out duration-300 transition-all"
          >
            Choose Banner
          </SquaredButton>
        </>
      )}
    </div>
  );
}
