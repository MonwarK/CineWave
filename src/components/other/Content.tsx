import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return (
    <div className="pt-[7rem] container max-w-screen-xl mx-auto px-6">
      {children}
    </div>
  );
}
