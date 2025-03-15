import { BlogPost } from './BlogPost';

export type BlogContextType = {
  posts: BlogPost[];
  setPosts: (posts: BlogPost[]) => void;
  nextPageToken: string;
  setNextPageToken: (nextPageToken: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  viewPost: BlogPost | undefined;
  setViewPost: (post: BlogPost) => void;
};
