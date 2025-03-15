'use client';
import { ReactNode, useEffect, useState } from 'react';
import { BlogContextDefaulrValue, PostContext } from '../context/PostContext';
import { BlogPost } from '../types/BlogPost';
import { toast } from 'react-toastify';

type Props = {
  children: ReactNode;
};

const PostContextProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPosts([]);
    const GetAllPosts = async () => {
      let url = '/api/blogpost?pageSize=10';
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      return [];
    };

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const posts = await GetAllPosts();
        setPosts(posts.data);
        setNextPageToken(posts.nextPageToken);
      } catch (error) {
        toast.error('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const value = {
    loading,
    posts,
    viewPost: post,
    nextPageToken,
    setNextPageToken,
    setLoading,
    setPosts,
    setViewPost: setPost,
  };
  return (
    <>
      <PostContext.Provider value={value}>
        {loading ? (
          <div className="flex justify-center items-center content-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>{children}</>
        )}
      </PostContext.Provider>
    </>
  );
};
export default PostContextProvider;
