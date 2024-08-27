"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface WhatsInProps {
  theme: 'ukm' | 'hmif';
}

interface TextsData {
  title: string;
  description: string;
  texts: { text: string; slug: string }[];
}

interface Data {
  [key: string]: TextsData;
}

const WhatsIn: React.FC<WhatsInProps> = ({ theme }) => {
  const [data, setData] = useState<TextsData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ukmhmif.json');
        const jsonData: Data = await response.json();
        setData(jsonData[theme]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [theme]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { title, description, texts } = data;
  const boxCount = theme === 'ukm' ? 9 : 8;

  // Define colors based on theme
  const themeColors = {
    ukm: {
      textColor: 'text-blue-100',
      boxBgColor: 'bg-blue-25',
      logoColor: 'bg-blue-400',
      textInsideBoxColor: 'text-blue-400',
    },
    hmif: {
      textColor: 'text-green-100',
      boxBgColor: 'bg-green-25',
      logoColor: 'bg-green-400',
      textInsideBoxColor: 'text-green-400',
    },
  };

  const { textColor, boxBgColor, logoColor, textInsideBoxColor } = themeColors[theme];

  const handleClick = (slug: string) => {
    router.push(`/${theme}/${slug}`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh] py-24 px-4">
      <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>{title}</h1>
      <p className={`text-xl font-bold mb-6 text-center ${textColor}`}>{description}</p>
      <div className={`grid ${theme === 'ukm' ? 'grid-cols-3 grid-rows-2' : 'grid-cols-4 grid-rows-2'} gap-x-8 gap-y-6`}>
        {texts.slice(0, boxCount).map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.slug)}
            className={`flex items-center ${boxBgColor} border border-gray-300 rounded-lg p-8 min-h-[75px] cursor-pointer hover:bg-opacity-70 transition`}
          >
            <div className={`w-12 h-12 ${logoColor} rounded-full mr-4`}></div>
            <span className={`font-bold ${textInsideBoxColor}`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsIn;
