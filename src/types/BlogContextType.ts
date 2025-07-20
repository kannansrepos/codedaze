import { PostIndex } from './BlogPost';

export type BlogContextType = {
  setPosts: (posts: PostIndex[]) => void;
  setNextPageToken: (nextPageToken: string) => void;
  setLoading: (loading: boolean) => void;
  setViewPost: (post: PostIndex) => void;

  posts: PostIndex[];
  nextPageToken: string;
  loading: boolean;
  viewPost: PostIndex | undefined;
};
