"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface WhatsInProps {
  theme: 'ukm' | 'hmif';
}

interface TextsData {
  title: string;
  description: string;
  texts: { text: string; slug: string; image: string }[]; // Include image property
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

  // Define the division URL
  const testUrl = `${theme}/test/1`;

  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh] py-12 px-4">
      <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>{title}</h1>
      <p className={`text-l font-bold mb-10 text-center ${textColor}`}>{description}</p>
      <div className="relative overflow-y-auto h-[calc(170px*2)] w-full px-16 max-w-screen mx-auto">
        <div className={`grid grid-cols-3 gap-x-8 gap-y-6`}>
          {texts.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.slug)}
              className={`relative flex items-center ${boxBgColor} border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-opacity-70 transition`}
              style={{ height: '150px' }} // Fixed height for consistent box size
            >
              <div className="absolute w-16 h-16 rounded-full overflow-hidden">
                <div className={`w-full h-full ${logoColor} flex items-center justify-center`}>
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-12 h-12 object-cover"
                  />
                </div>
              </div>
              <div className="ml-20 flex-1 flex items-center"> {/* Ensures text aligns properly */}
                <div className="flex flex-col justify-center h-full">
                  <span className={`font-bold text-xl ${textInsideBoxColor}`}>{item.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-16 mb-16">
        <button
          onClick={() => router.push(testUrl)}
          className={`p-4 rounded-full text-center ${theme === 'ukm' ? 'bg-blue-200 text-blue-25' : 'bg-green-200 text-green-25'} font-semibold text-xl hover:opacity-80 transition w-[200px]`}
        >
          Start test!
        </button>
      </div>
    </div>
  );
};

export default WhatsIn;
