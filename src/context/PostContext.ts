import { createContext, useContext } from 'react';
import { BlogContextType } from '../types/BlogContextType';

export const BlogContextDefaultValue: BlogContextType = {
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
  BlogContextDefaultValue
);

export const usePost = () => useContext(PostContext);
