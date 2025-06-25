'use client';

import React, { SetStateAction, useEffect, useState } from 'react';
import Comment from './Comment';
import LoadingSpinner from '../loading/LoadingSpinner';
import CommentForm from './CommentForm';
import { Comment as CommentType } from '@/types/Comment';

interface CommentsProps {
  movieId: number;
  isMovie: boolean;
  season?: number;
  episode?: number;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

export default function CommentSection({
  movieId,
  isMovie,
  season,
  episode,
  loading,
  setLoading,
}: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (!loading) return;

    async function fetchComments() {
      setLoading(true);

      const params = new URLSearchParams({
        movie_id: movieId.toString(),
        is_movie: isMovie.toString(),
      });

      if (season !== undefined) params.append('season', season.toString());
      if (episode !== undefined) params.append('episode', episode.toString());

      try {
        const res = await fetch(`/api/comments?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch comments');

        const data = await res.json();
        setComments(data.comments || []);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [movieId, isMovie, season, episode, loading]);

  const handleSubmit = async (comment: string) => {
    if (!comment.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movieId,
          is_movie: isMovie,
          comment,
          season,
          episode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post comment');
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-zinc-800 p-6 space-y-6">
      {loading ? (
        <div className="grid place-items-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <React.Fragment>
          {/* Heading */}
          <div>
            <h2 className="text-xl">Comments ({comments.length})</h2>
          </div>

          {/* Textbox */}
          <CommentForm handleSubmit={handleSubmit} />

          {/* Comments */}
          <div className="space-y-5">
            {comments.length > 0 ? (
              comments.map((comment: CommentType) => (
                <Comment comment={comment} />
              ))
            ) : (
              <div className="text-center text-zinc-500">
                There are no comments
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
