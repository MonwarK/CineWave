import React from 'react';
import LoadingSpinner from '../loading/LoadingSpinner';

export default function Loader() {
  return (
    <div className="min-h-[90vh] grid place-items-center">
      <LoadingSpinner />
    </div>
  );
}
