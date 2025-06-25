import { Comment as CommentType } from '@/types/Comment';
import React from 'react';

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="border-b border-zinc-800 flex py-10 space-x-5">
      <div>
        <img
          src={comment.users.profile_image_url}
          className="w-15 h-15 bg-zinc-800 rounded-full"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-center">
          {/* Name */}
          <div>
            {comment.users.first_name} {comment.users.last_name}
          </div>
          <div className="text-xs text-zinc-500">
            {new Date(comment.created_at).toUTCString()}
          </div>
        </div>

        {/* Message */}
        <div className="text-gray-400 text-sm">{comment.comment}</div>
      </div>
    </div>
  );
}
