export type Profile = {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
  joined_at: string;
  avatar_url?: string | null;
  description?: string | null;
};