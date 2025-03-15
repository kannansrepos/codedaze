import { createContext, useContext } from 'react';
import { BlogContextType } from '../types/BlogContextType';

export const BlogContextDefaulrValue: BlogContextType = {
  loading: false,
  posts: [],
  nextPageToken: '',
  viewPost: undefined,

  setPosts: () => {},
  setNextPageToken: () => {},
  setLoading: () => {},
  setViewPost: () => {},
};

export const PostContext = createContext<BlogContextType>(
  BlogContextDefaulrValue
);

export const usePost = () => useContext(PostContext);
