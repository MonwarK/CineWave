import { User } from './User';

export type Comment = {
  id: number;
  user_id: string;
  comment: string;
  created_at: string;
  updated_at?: string | null;
  season?: number | null;
  episode?: number | null;
  users: User;
};
