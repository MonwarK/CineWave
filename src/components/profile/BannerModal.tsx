import { Dispatch, ReactNode, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { noOpacity, visibleOpacity } from '@/motion/variants/opacity';
import SquaredButton from '../ui/SquaredButton';
import clsx from 'clsx';

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  bannerPreview: string;
  setBannerPreview: Dispatch<string>;
  onBannerSave: (banner: string) => void;
}

const bannerImagesOptions = [
  'https://image.tmdb.org/t/p/w1920/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
  'https://image.tmdb.org/t/p/w1920/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg',
  'https://image.tmdb.org/t/p/w1920/kU98MbVVgi72wzceyrEbClZmMFe.jpg',
  'https://image.tmdb.org/t/p/w1920/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg',
  'https://image.tmdb.org/t/p/w1920/2w8FaLwwJTWr6ExUMeVgT2Th5YT.jpg',
  'https://image.tmdb.org/t/p/w1920/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg',
];

export default function BannerModal({
  title,
  isOpen,
  onClose,
  bannerPreview,
  setBannerPreview,
  onBannerSave,
}: Props) {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (!isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={noOpacity}
          animate={visibleOpacity}
          exit={noOpacity}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            layout
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="bg-neutral-900 border-orange-600/50 border p-6 rounded-lg shadow-lg relative max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2
                className="text-xl text-center font-bold text-white mb-2"
                id="modal-title"
              >
                {title || 'Modal Title'}
              </h2>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-300">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {bannerImagesOptions.map((image, idx) => (
                  <div
                    className={clsx(
                      'border-2 border-transparent p-0.5 rounded-lg cursor-pointer hover:border-white transition duration-100',
                      image === bannerPreview && 'border-white'
                    )}
                  >
                    <img
                      src={image}
                      onClick={() => setBannerPreview(image)}
                      className={'h-[100px] mx-auto object-fill rounded-lg'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-1 pt-5 space-y-3">
              <SquaredButton
                className="w-full"
                onClick={() => onBannerSave(bannerPreview)}
              >
                Save
              </SquaredButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
