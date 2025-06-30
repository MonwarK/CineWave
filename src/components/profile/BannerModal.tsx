import { ReactNode, useEffect, useRef } from 'react';
import SquaredButton from '../ui/SquaredButton';

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BannerModal({ title, description, isOpen, onClose, children}: Props) {

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !(popupRef.current as HTMLElement).contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener("keydown", handleEscapeKey)
    } else {
      document.removeEventListener('mousedown', handleClick)
      document.addEventListener("keydown", handleEscapeKey)

    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.addEventListener("keydown", handleEscapeKey)

    };
  }, [isOpen, onClose]);


  if(!isOpen) return null;


  console.log(title)
  return (
    <div 
    role='dialog'
    aria-modal="true"
    aria-labelledby="modal-title"
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div ref={popupRef} className="bg-black border-orange-600/50 border p-6 rounded-lg shadow-lg  relative max-w-md w-full">
      <div className='flex justify-between items-center'>
      <h2 className='text-lg font-bold text-white mb-2' id='modal-title'>{title || "Modal Title"}</h2>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
      >
        ✕
      </button>
      </div>
      <div className='text-gray-300'>
      {children}

      </div>
      <div className='flex-1 flex justify-end mt-2'>
        <SquaredButton  onClick={onClose}>
          Close
        </SquaredButton>
      </div>
    </div>
  </div>
  )
}
