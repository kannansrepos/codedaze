/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDateWithIntl(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

export const GetPageTitle = (metadata?: Metadata): string => {
  if (!metadata?.title) return 'CodeDaze';

  if (typeof metadata.title === 'string') {
    return metadata.title;
  }

  if (metadata.title && typeof metadata.title === 'object') {
    return (
      (metadata.title as any).default ||
      (metadata.title as any).template ||
      'CodeDaze'
    );
  }

  return 'CodeDaze';
};

export const cleanYamlBlock = (data: string): string => {
  return data
    .replace(/^```yaml\s*/i, '') // Remove starting ```yaml (case-insensitive)
    .replace(/```$/, '') // Remove ending ```
    .trim(); // Trim whitespace
};
