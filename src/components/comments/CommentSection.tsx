import React from 'react';
import Comment from './Comment';
import SquaredButton from '../ui/SquaredButton';

export default function CommentSection() {
  return (
    <div className="border-t border-zinc-800 p-6 space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-xl">Comments (20)</h2>
      </div>

      {/* Textbox */}
      <div className="flex flex-col gap-2">
        <div>
          <textarea
            className="p-5 w-full bg-zinc-800/30 border border-zinc-700 rounded-xl outline-0"
            placeholder="Type in your comment here..."
          />
        </div>
        <div className="self-end">
          <SquaredButton>Post Comment</SquaredButton>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-5">
        {[1, 2, 3, 4].map(() => (
          <Comment />
        ))}
      </div>
    </div>
  );
}
