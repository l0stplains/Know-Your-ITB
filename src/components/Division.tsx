"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlArrowLeft } from 'react-icons/sl'; // Import the SlArrowLeft icon

interface DivisionComponent {
  name: string;
}

interface DivisionData {
  title: string;
  description: string;
  components: DivisionComponent[];
}

interface DivisionProps {
  theme: 'hmif';
  slug: string; // The slug to fetch the JSON file
}

const Division: React.FC<DivisionProps> = ({ theme, slug }) => {
  const [data, setData] = useState<DivisionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const url = `/hmifdivisions/${slug}.json`;
      console.log(`Fetching data from ${url}`); // Debugging statement

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        if (jsonData) {
          setData(jsonData);
        } else {
          setError('Division not found');
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, router]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!data) return <div>Page not found</div>;

  // Define theme colors
  const themeColors = {
    hmif: {
      circleBgColor: 'bg-green-200',
      descriptionTextColor: 'text-green-100'
    },
  };

  const { circleBgColor, descriptionTextColor } = themeColors[theme];

  // Get the previous URL from the history
  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4">
      <div className="absolute top-24 left-2">
        <button
          onClick={handleBackClick}
          className={`flex items-center ${descriptionTextColor} hover:underline`}
          style={{ fontSize: '1.25rem', fontWeight: '700', padding: '0.5rem 1.5rem' }}
        >
          <SlArrowLeft className="text-2xl mr-4" /> {/* Back arrow icon */}
          <span className="font-bold">Back to department information</span>
        </button>
      </div>

      <div className="flex flex-col items-center mb-8 mt-16">
        <h1 className="text-4xl font-bold text-green-900">{data.title}</h1> {/* Title without box */}
        <p className={`text-l font-bold ${descriptionTextColor} text-center mt-2 mb-4`}>{data.description}</p> {/* Subtitle */}
      </div>

      <div className="flex flex-wrap items-start justify-center space-x-8">
        <div className={`w-80 h-72 rounded-xl ${circleBgColor}`}></div> {/* Increased logo size with 4:3 ratio */}
        <div className="flex-grow max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {data.components.map((component, index) => (
              <div 
                key={index} 
                className="p-6 bg-green-25 border border-gray-300 rounded-lg shadow-md flex items-center justify-center hover:bg-opacity-70 transition cursor-pointer"
              >
                <h2 className="text-lg text-green-400 font-semibold text-center">{component.name}</h2> {/* Centered text */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Division;
