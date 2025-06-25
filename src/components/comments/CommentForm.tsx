import React, { use, useState } from 'react';
import SquaredButton from '../ui/SquaredButton';

export default function CommentForm({
  handleSubmit,
}: {
  handleSubmit: (comment: string) => Promise<void>;
}) {
  const [comment, setComment] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(comment).then(() => setComment(''));
      }}
      className="flex flex-col gap-2"
    >
      <div>
        <textarea
          className="p-5 w-full bg-zinc-800/30 border border-zinc-700 rounded-xl outline-0"
          placeholder="Type in your comment here..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <div className="self-end">
        <SquaredButton>Post Comment</SquaredButton>
      </div>
    </form>
  );
}
