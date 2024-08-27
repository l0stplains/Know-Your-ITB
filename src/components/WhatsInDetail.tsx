"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlArrowLeft } from 'react-icons/sl';

interface WhatsInDetailProps {
  params: {
    theme: 'ukm' | 'hmif';
    slug: string;
  };
}

interface TextsData {
  title: string;
  description: string;
  texts: { text: string; slug: string }[];
}

interface DescriptionData {
  [key: string]: {
    [slug: string]: string;
  };
}

const WhatsInDetail: React.FC<WhatsInDetailProps> = ({ params }) => {
  const { theme, slug } = params;
  const [data, setData] = useState<TextsData | null>(null);
  const [descriptions, setDescriptions] = useState<DescriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch('/ukmhmif.json');
        const jsonData: { [key: string]: TextsData } = await responseData.json();
        setData(jsonData[theme]);

        const responseDesc = await fetch('/descriptions.json');
        const descData: DescriptionData = await responseDesc.json();
        setDescriptions(descData);
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, theme]);

  if (loading) return <div>Loading...</div>;

  if (!data || !descriptions) {
    return <div>Page not found</div>;
  }

  const item = data.texts.find(item => item.slug === slug);
  const itemDescription = descriptions[theme]?.[slug];
  const title = item ? item.text : "Title not found";

  const themeColors = {
    ukm: {
      titleBoxBgColor: 'bg-blue-25',
      titleTextColor: 'text-blue-200',
      descriptionTextColor: 'text-blue-100',
      circleBgColor: 'bg-blue-400'
    },
    hmif: {
      titleBoxBgColor: 'bg-green-25',
      titleTextColor: 'text-green-200',
      descriptionTextColor: 'text-green-100',
      circleBgColor: 'bg-green-400',
    },
  };

  const { titleBoxBgColor, titleTextColor, descriptionTextColor, circleBgColor } = themeColors[theme];

  const backUrl = `/${theme}`;
  const divisionUrl = `/${theme}/${slug}/divisions`;

  return (
    <div className="min-h-screen flex flex-col items-center pt-16">
      <div className="absolute top-24 left-2">
        <button
          onClick={() => router.push(backUrl)}
          className={`flex items-center ${descriptionTextColor} hover:underline`}
          style={{ fontSize: '1.25rem', fontWeight: '700', padding: '0.5rem 1.5rem' }}
        >
          <SlArrowLeft className="text-2xl mr-4" />
          <span className="font-bold">Back to {theme.toUpperCase()}</span>
        </button>
      </div>

      <div className="flex flex-col items-center mb-12 mt-2">
        <div className={`p-6 rounded-full text-center ${titleBoxBgColor}`}>
          <h1 className={`text-5xl font-bold ${titleTextColor} whitespace-nowrap`}>
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-16">
        <div className={`w-72 h-72 rounded-full ${circleBgColor}`}></div>
        <div className="max-w-[500px]">
          <p className={`text-lg font-bold ${descriptionTextColor} whitespace-pre-line`}>
            {itemDescription}
          </p>
        </div>
      </div>

      {theme === 'hmif' && (
        <div className="flex justify-center mt-16 mb-16">
          <button
            onClick={() => router.push(divisionUrl)}
            className={`p-4 rounded-full text-center bg-green-200 text-green-25 font-medium text-xl hover:opacity-80 transition w-[900px]`}
          >
            Take a look at the divisions available
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsInDetail;
