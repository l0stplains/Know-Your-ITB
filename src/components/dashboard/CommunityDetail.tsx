'use client'

import React from 'react'
import {CommunityType, Theme} from '@/types/db'
import axios from 'axios';

export default function CommunityDetail({community, theme}: {community: CommunityType, theme: Theme}) {
  const [newCommunity, setNewCommunity] = React.useState<string>(community.name);
  const [newCommunityImage, setNewCommunityImage] = React.useState<string>(community.image);
  const [newCommunityDescription, setNewCommunityDescription] = React.useState<string>(community.description);


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommunity(e.target.value);
  };

  const handleNewCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCommunity === "" || newCommunityImage === "" || newCommunityDescription === "") return;

    try {
      const res = await axios.put(`/api/data/community`, {id: community.id, name: newCommunity, image: newCommunityImage, description: newCommunityDescription });

      if (res.status === 200) {
        console.log(`Community ${newCommunity} updated`);
        // Reload the page
        location.reload();
      } else {
        console.error(`Failed to update community ${newCommunity}`);
      }
    } catch (error) {
      alert("Failed to update Community\nMaybe the community already exists");
    }
  };

  return (
    <div className=" relative flex justify-center max-w-5xl items-center flex-col mx-auto px-4">
      <a
        href={`/dashboard/${theme.name}/community`}
        className="text-xl font-bold self-start absolute left-4 top-8"
      >
        {"< Back"}
      </a>
      <h1 className="text-3xl font-bold self-start mt-24">
        Community Detail
      </h1>
      <h2 className='self-start mt-4'>Edit community detail</h2>
      <form
        className="flex flex-wrap justify-center w-full "
        onSubmit={handleNewCommunity}
      >
        <input
          type="text"
          placeholder="Community Name"
          className="bg-gray-25 rounded-md w-3/5 shadow-lg p-2"
          onChange={handleFormChange}
          defaultValue={community.name}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="bg-gray-25 p-2 rounded-md w-2/5 shadow-lg"
          onChange={(e) => setNewCommunityImage(e.target.value)}
          defaultValue={community.image}
          required
        />
        <textarea
          placeholder="Description"
          className="bg-gray-25 p-2 rounded-md w-full shadow-lg resize-none mt-2" 
          onChange={(e) => setNewCommunityDescription(e.target.value)}
          defaultValue={community.description}
          required
        />


        <button
          className="bg-blue-100 text-white rounded-md px-2 py-1"
          type="submit"
        >
          Edit Community
        </button>
      </form>
    </div>
  );
}
