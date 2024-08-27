import React from 'react';
import WhatsInDetail from '@/components/WhatsInDetail';

interface PageProps {
  params: {
    theme: 'ukm' | 'hmif'; // theme parameter
    detail: string; // detail parameter (mapped to slug in WhatsInDetail)
  };
}

const DetailPage: React.FC<PageProps> = ({ params }) => {
  // Renaming 'detail' to 'slug' to match the WhatsInDetailProps
  const { theme, detail: slug } = params;

  return (
    <div>
      <WhatsInDetail params={{ theme, slug }} />
    </div>
  );
};

export default DetailPage;
