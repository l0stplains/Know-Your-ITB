'use client'

import React from 'react'
import { signOut } from "next-auth/react";
import router from "next/router";

export default function SignOutButton() {
  return (
  <div className="flex items-center">
        <button
          onClick={async () => {
            const res = await signOut();
            console.log(res);
            router.push("/");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Sign Out
        </button>
      </div>
    );
}
