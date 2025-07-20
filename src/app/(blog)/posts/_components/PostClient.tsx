'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { PostMetadata } from '@/types/PostMetadata';

type PostClientProps = {
  allPosts: PostMetadata[];
};
const POSTS_PER_PAGE = 9;

const PostClientContent = ({ allPosts }: PostClientProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') ?? '1');
  const selectedLanguage = searchParams.get('category');
  const headingRef = useRef<HTMLDivElement | null>(null);

  const [currentPosts, setCurrentPosts] = useState<PostMetadata[]>([]);

  useEffect(() => {
    let posts = [...allPosts];
    if (selectedLanguage) {
      posts = posts.filter(
        (post) =>
          post.language != null &&
          post.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setCurrentPosts(posts.slice(startIndex, endIndex));
  }, [allPosts, page, selectedLanguage]);

  // Scroll to heading after filter/page change
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page, selectedLanguage]);

  const totalPosts = selectedLanguage
    ? allPosts.filter(
        (post) =>
          post.language != null &&
          post.language.toLowerCase() === selectedLanguage.toLowerCase()
      ).length
    : allPosts.length;

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/posts?${params.toString()}`, { scroll: false });
  };

  const changeLanguage = (newLanguage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newLanguage) {
      params.set('language', newLanguage);
    } else {
      params.delete('language');
    }
    params.set('page', '1');
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const uniqueLanguages = Array.from(
    new Set(allPosts.map((post) => post.language))
  ).filter(Boolean);

  return (
    <>
      <div className="row justify-content-center mt-4">
        {uniqueLanguages.map((language) => (
          <button
            key={language}
            className={`btn btn-outline-primary mx-1 ${
              selectedLanguage === language ? 'active' : ''
            }`}
            onClick={() => changeLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
      <section className="container mt-4">
        <div className="row justify-content-center">
          {currentPosts.map((post) => {
            return (
              <div key={post.title} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.subtitle}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {post.date} - {post.readTime}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* Pagination */}
      <div className="mt-4 text-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={`btn btn-sm m-1 ${
              page === i + 1 ? 'btn-warning' : 'btn-outline-secondary'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

const PostClient = ({ allPosts }: PostClientProps) => {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostClientContent allPosts={allPosts} />
    </Suspense>
  );
};

export default PostClient;
