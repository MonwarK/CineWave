'use client';

import React from 'react';

export default function TextBox({ ...props }) {
  return (
    <input
      {...props}
      className="w-full rounded bg-zinc-800/70 border border-zinc-700 p-3 font-semibold outline-0"
    />
  );
}
