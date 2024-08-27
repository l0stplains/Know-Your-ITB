"use client";

import React from "react";
import Link from "next/link";

export default function Theme({ theme }: { theme: string }) {
  return (
    <div className="relative flex justify-center max-w-5xl items-center flex-col mx-auto px-4">
      <a
        href="/dashboard"
        className="text-xl font-bold self-start absolute left-4 top-8"
      >
        {"< Back"}
      </a>
      <h1 className="text-3xl font-bold self-start mt-24">
        {theme.toUpperCase()}
      </h1>
      <div className="flex flex-col w-full">
        
          <div
            className="flex justify-between bg-gray-25 p-4 w-full  my-2 rounded-md border-2"
          >
            <h2 className="text-lg">Communities</h2>
            <div>
              <Link href={`/dashboard/${theme}/community`}>
                <button className="bg-blue-100 text-white rounded-md px-2 py-1 mx-2">
                  Detail
                </button>
              </Link>
            </div>
          </div>

          <div
            className="flex justify-between bg-gray-25 p-4 w-full  my-2 rounded-md border-2"
          >
            <h2 className="text-lg">Questions</h2>
            <div>
              <Link href={`/dashboard/${theme}/question`}>
                <button className="bg-blue-100 text-white rounded-md px-2 py-1 mx-2">
                  Detail
                </button>
              </Link>
            </div>
          </div>

      </div>
    </div>
  );
}
