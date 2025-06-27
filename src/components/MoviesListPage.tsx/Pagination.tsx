import React from 'react';
import SquaredButton from '../ui/SquaredButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  page,
  setPage,
  maxPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}) {
  return (
    <div className="flex justify-center items-center gap-4 my-6">
      <SquaredButton
        className={page === 1 ? 'invisible' : ''}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft />
      </SquaredButton>

      <span className="text-base font-medium">Page {page}</span>

      <SquaredButton
        className={page >= maxPage ? 'invisible' : ''}
        onClick={() => setPage(page + 1)}
        disabled={page >= maxPage}
      >
        <ChevronRight />
      </SquaredButton>
    </div>
  );
}
