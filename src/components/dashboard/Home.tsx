"use client";

import React from "react";
import { Theme } from "@/types/db";
import Link from "next/link";
import axios from "axios";

export default function Home({ themes }: { themes: Theme[] }) {
  // const [newTheme, setNewTheme] = React.useState<string>("");

  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTheme(e.target.value);
  // };

  // const handleNewTheme = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (newTheme === "") return;

  //   try {
  //     const res = await axios.post(`/api/data/theme`, { name: newTheme });

  //     if (res.status === 200) {
  //       console.log(`Theme ${newTheme} created`);
  //       // Reload the page
  //       location.reload();
  //     } else {
  //       console.error(`Failed to create theme ${newTheme}`);
  //     }
  //   } catch (error) {
  //     alert("Failed to create theme\nMaybe the theme already exists");
  //   }
  // };

  // const handleDeleteTheme = async (theme: Theme) => {
  //   // Make sure if admin wants to delete the theme
  //   if (
  //     !confirm(
  //       `WARNING! \nAny data related to this will be deleted\n\nAre you sure to delete theme ${theme.name}?`
  //     )
  //   )
  //     return;
  //   try {
  //     const res = await axios.delete(`/api/data/theme`, {
  //       data: { id: theme.id },
  //     });
  //     if (res.status === 200) {
  //       console.log(`Theme ${theme.name} deleted (id: ${theme.id})`);
  //       // Reload the page
  //       location.reload();
  //     } else {
  //       console.error(`Failed to delete theme ${theme.name} (id: ${theme.id})`);
  //     }
  //   } catch (error) {
  //     alert("Failed to delete theme");
  //   }
  // };

  return (
    <div className="flex justify-center max-w-5xl items-center flex-col mt-24 mx-auto px-4">
      <h1 className="text-3xl font-bold self-start">Dashboard Home</h1>
      <div className="flex flex-col w-full mb-48">
        {themes.map((theme: Theme) => (
          <div
            key={theme.id}
            className="flex justify-between bg-gray-25 p-4 w-full  my-2 rounded-md border-2"
          >
            <h2 className="text-lg">{theme.name}</h2>
            <div>
              {/* <button
                onClick={() => handleDeleteTheme(theme)}
                className="bg-red-500 text-white rounded-md px-2 py-1 mx-2"
              >
                Delete
              </button> */}
              <Link href={`/dashboard/${theme.name}`}>
                <button className="bg-blue-100 text-white rounded-md px-2 py-1 mx-2">
                  Detail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <form
        className="fixed bottom-16 flex justify-center w-full max-w-5xl m-4 px-4 "
        onSubmit={handleNewTheme}
      >
        <input
          type="text"
          placeholder="Theme Name"
          className="bg-gray-25 p-2 rounded-md w-full shadow-lg"
          onChange={handleFormChange}
          required
        />
        <button
          className="bg-blue-100 text-white rounded-md px-2 py-1 ml-2"
          type="submit"
        >
          Add Theme
        </button>
      </form> */}
    </div>
  );
}
