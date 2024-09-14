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
  texts: { text: string; slug: string; image: string }[]; // Include image property
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
      circleBgColor: 'bg-blue-200'
    },
    hmif: {
      titleBoxBgColor: 'bg-green-25',
      titleTextColor: 'text-green-200',
      descriptionTextColor: 'text-green-100',
      circleBgColor: 'bg-green-200',
    },
  };

  const { titleBoxBgColor, titleTextColor, descriptionTextColor, circleBgColor } = themeColors[theme];

  const backUrl = `/${theme}`;
  const divisionUrl = `/${theme}/${slug}/divisions`;

  return (
    <div className="min-h-screen flex flex-col items-center pt-16">
      <div className="absolute top-20 left-2">
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
        <div className={`px-16 py-6 rounded-full border border-gray-300 text-center ${titleBoxBgColor}`}>
          <h1 className={`text-5xl max-md:text-xl max-sm:text-lg font-bold ${titleTextColor}`}>
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-start space-x-16 max-md:space-x-0 max-md:flex-col max-md:items-center mx-12">
        <div className={`relative w-80 h-72 max-md:w-40 max-md:h-36 rounded-xl overflow-hidden ${circleBgColor}`}>
          {item && (
            <img
              src={item.image}
              alt={item.text}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="max-w-[400px] flex flex-col">
          <p className={`text-lg max-md:text-base max-sm:text-sm font-bold ${descriptionTextColor} whitespace-pre-line mt-4`}>
            {itemDescription}
          </p>
        </div>
      </div>

      {theme === 'hmif' && slug !== 'senatorial' && (
        <div className="flex justify-center mt-16 mb-16">
          <button
            onClick={() => router.push(divisionUrl)}
            className={`py-4 px-8 rounded-full text-center bg-green-200 text-green-25 font-medium text-xl max-md:text-base max-sm:text-sm hover:opacity-80 transition max-w-[900px]`}
          >
            Take a look at the divisions available
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsInDetail;
