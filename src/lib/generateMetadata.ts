import type { Metadata } from 'next';

type GenerateMetadataProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  siteName?: string;
  keywords?: string;
};

const generate_Metadata = ({
  title,
  description,
  url,
  image = 'https://www.codedaze.tech/img/default.png',
  type = 'website',
  locale = 'en_US',
  siteName = 'Code Daze',
  keywords,
}: GenerateMetadataProps): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      siteName,
      locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      site: siteName,
      creator: 'https://x.com/KannansMca',
    },
    keywords,
    icons: {
      icon: '/favicon.ico',
    },
    ...(url && {
      alternates: {
        canonical: url,
      },
    }),
  };
};

export default generate_Metadata;
