import React from 'react';
import WhatsInDetailHmif from '@/components/WhatsInDetailHmif';
import WhatsInDetailUkm from '@/components/WhatsInDetailUkm';

interface PageProps {
  params: {
    theme: 'ukm' | 'hmif'; // theme parameter
    detail: string; // detail parameter (mapped to slug in WhatsInDetail)
  };
}

const DetailPage: React.FC<PageProps> = ({ params }) => {
  // Renaming 'detail' to 'slug' to match the WhatsInDetailProps
  const { theme, detail: slug } = params;

  if (params.theme === 'hmif') {
  return (
    <div>
      <WhatsInDetailHmif params={{ theme, slug }} />
    </div>
  )} else if (params.theme === 'ukm') {
  return (
    <div>
      <WhatsInDetailUkm params={{ theme, slug }} />
    </div>
  )} else {
    return <div>Page not found</div>;
  }
};

export default DetailPage;
