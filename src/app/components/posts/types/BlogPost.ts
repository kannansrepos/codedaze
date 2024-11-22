import { Language } from './Language';

export type BlogPost = {
  id: string;
  language: Language;
  shortTitle: string;
  title: string;
  description: string;
  category: string;
  date?: Date;
  readMin: number;
  section: BlogPostSection[];
};

export type BlogPostSection = {
  title: string;
  content: string;
  code?: string;
  image?: string;
  imageAlt?: string;
  video?: {
    url: string;
    title: string;
  };
};
