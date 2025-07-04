import { BlogPost } from './BlogPost';

export type BlogContextType = {
  setPosts: (posts: BlogPost[]) => void;
  setNextPageToken: (nextPageToken: string) => void;
  setLoading: (loading: boolean) => void;
  setViewPost: (post: BlogPost) => void;

  posts: BlogPost[];
  nextPageToken: string;
  loading: boolean;
  viewPost: BlogPost | undefined;
};
