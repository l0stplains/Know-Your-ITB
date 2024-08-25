"use client";

import React, { useEffect, useState } from 'react';

interface WhatsInProps {
  theme: 'ukm' | 'hmif';
}

interface TextsData {
  title: string;
  description: string;
  texts: string[];
}

const WhatsIn: React.FC<WhatsInProps> = ({ theme }) => {
  const [data, setData] = useState<TextsData | null>(null);

  useEffect(() => {
    // Fungsi untuk memuat data dari file JSON
    const fetchData = async () => {
      try {
        const response = await fetch('/ukmhmif.json');
        const jsonData = await response.json();
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

  // Judul dan deskripsi sesuai dengan tema
  const { title, description, texts } = data;

  // Tentukan jumlah kotak sesuai dengan tema
  const boxCount = theme === 'ukm' ? 9 : 8;

  // Warna tema
  const textColor = theme === 'ukm' ? 'text-blue-100' : 'text-green-100';
  const boxBgColor = theme === 'ukm' ? 'bg-blue-25' : 'bg-green-25';
  const logoColor = theme === 'ukm' ? 'bg-blue-400' : 'bg-green-400';
  const textInsideBoxColor = theme === 'ukm' ? 'text-blue-400' : 'text-green-400';

  // Gunakan Tailwind untuk menentukan grid layout
  const gridClasses = theme === 'ukm' ? 'grid-cols-3 grid-rows-3' : 'grid-cols-4 grid-rows-2';
  const colGap = theme === 'ukm' ? 'gap-x-8' : 'gap-x-10'; // Jarak antar kolom
  const rowGap = theme === 'ukm' ? 'gap-y-4' : 'gap-y-6'; // Jarak antar baris

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      {/* Judul */}
      <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>{title}</h1>
      {/* Deskripsi */}
      <p className={`text-xl font-bold mb-6 text-center ${textColor}`}>{description}</p>
      {/* Grid kotak */}
      <div className={`grid ${gridClasses} ${colGap} ${rowGap}`}>
        {texts.slice(0, boxCount).map((text, index) => (
          <div key={index} className={`flex items-center ${boxBgColor} border border-gray-300 rounded-lg p-4 min-h-[75px]`}>
            <div className={`w-12 h-12 ${logoColor} rounded-full mr-4`}></div>
            <span className={`font-bold ${textInsideBoxColor}`}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsIn;
