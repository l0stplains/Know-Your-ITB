'use client'

import React from 'react'
import {CommunityType, Theme} from '@/types/db'
import axios from 'axios';
import Link from 'next/link';

export default function Community({communities, theme}: {communities: CommunityType[], theme: Theme}) {
  const [newCommunity, setNewCommunity] = React.useState<string>("");
  const [newCommunityImage, setNewCommunityImage] = React.useState<string>("");
  const [newCommunityDescription, setNewCommunityDescription] = React.useState<string>("");


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommunity(e.target.value);
  };

  const handleNewCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCommunity === "") return;

    try {
      const res = await axios.post(`/api/data/community`, { name: newCommunity, themeId: theme.id, image: newCommunityImage, description: newCommunityDescription });

      if (res.status === 200) {
        console.log(`Community ${newCommunity} created`);
        // Reload the page
        location.reload();
      } else {
        console.error(`Failed to create community ${newCommunity}`);
      }
    } catch (error) {
      alert("Failed to create Community\nMaybe the community already exists");
    }
  };

  const handleDeleteCommunity = async (community:CommunityType) => {
    // Make sure if admin wants to delete the community
    if (
      !confirm(
        `WARNING! \nAny data related to this will be deleted\n\nAre you sure to delete community ${community.name}?`
      )
    )
      return;
    try {
      const res = await axios.delete(`/api/data/community`, {
        data: { id: community.id },
      });
      if (res.status === 200) {
        console.log(`Community ${community.name} deleted (id: ${community.id})`);
        // Reload the page
        location.reload();
      } else {
        console.error(`Failed to delete community ${community.name} (id: ${community.id})`);
      }
    } catch (error) {
      alert("Failed to delete community");
    }
  };

  return (
    <div className=" relative flex justify-center max-w-5xl items-center flex-col mx-auto px-4">
      <a
        href={`/dashboard/${theme.name}`}
        className="text-xl font-bold self-start absolute left-4 top-8"
      >
        {"< Back"}
      </a>
      <h1 className="text-3xl font-bold self-start mt-24">
        {theme.name.toUpperCase() + " Communities"}
      </h1>
      <div className="flex flex-col w-full mb-48">
        {communities.map((community: CommunityType) => (
          <div
            key={community.id}
            className="flex justify-between bg-gray-25 p-4 w-full  my-2 rounded-md border-2"
          >
            <h2 className="text-lg  line-clamp-1 text-ellipsis max-w-3/5">{community.name}</h2>
            <div className='w-2/5 flex justify-end'>
              <button
                onClick={() => handleDeleteCommunity(community)}
                className="bg-red-500 text-white rounded-md px-2 py-1 mx-2"
              >
                Delete
              </button>
              <Link href={`/dashboard/${theme.name}/community/${community.id}`}>
                <button className="bg-blue-100 text-white rounded-md px-2 py-1 mx-2">
                  Detail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <form
        className="fixed bottom-16 flex flex-wrap justify-center w-full max-w-5xl m-4 px-4 "
        onSubmit={handleNewCommunity}
      >
        <input
          type="text"
          placeholder="Community Name"
          className="bg-gray-25 p-2 rounded-md w-3/5 shadow-lg p-2"
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="bg-gray-25 p-2 rounded-md w-2/5 shadow-lg"
          onChange={(e) => setNewCommunityImage(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="bg-gray-25 p-2 rounded-md w-full shadow-lg resize-none mt-2" 
          onChange={(e) => setNewCommunityDescription(e.target.value)}
          required
        />


        <button
          className="bg-blue-100 text-white rounded-md px-2 py-1"
          type="submit"
        >
          Add Community
        </button>
      </form>
    </div>
  );
}
