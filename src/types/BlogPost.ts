export type BlogPost = {
  id: string;
  url: string;
  metadata: string;
  language: string;
  shortTitle: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  readMin: number;
  section: BlogPostSection[];
};

export type BlogPostSection = {
  title: string;
  content: string;
  code?: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoTitle?: string;
};

export type PostIndex = {
  postId: string;
};

export type Slag = {
  SEO_Keywords_List: string;
  title: string;
  date: string;
  language: string;
  meta_description: string;
  readTime: string;
  subtitle: string;
};
