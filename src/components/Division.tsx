"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-lg mb-8">{data.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.components.map((component, index) => (
          <div key={index} className="p-6 bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{component.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Division;
