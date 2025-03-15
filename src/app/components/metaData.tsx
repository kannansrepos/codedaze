import React from 'react';
import { BlogPost } from '../../types/BlogPost';
import { Metadata } from 'next';
type PostProps = {
  postData: BlogPost;
};
let post: BlogPost;
// Generate dynamic metadata based on the page data
export async function generateMetadata(): Promise<Metadata> {
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Kannan S'],
      images: [
        {
          url: post.section[0]?.image || '/default-image.jpg',
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.section[0]?.image || '/default-image.jpg'],
    },
  };
}

const MetaDataComponent = ({ postData }: PostProps) => {
  post = postData;
  return <></>;
};

export default MetaDataComponent;
