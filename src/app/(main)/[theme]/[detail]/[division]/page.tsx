import React from 'react';
import Division from '@/components/Division'; // Adjust import path as needed

interface PageProps {
  params: {
    theme: 'hmif';
    detail: string; // Use detail as slug
    division: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { theme, detail } = params;

  // Ensure the theme is 'hmif' for division details
  if (theme !== 'hmif') {
    return <div>404 - Not Found</div>;
  }

  return <Division theme={theme} slug={detail} />;
};

export default Page;
