'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    // Reset to primary when `src` changes
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
}
