"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { FormData } from "@/types/login";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signInData = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (!signInData?.ok) {
      setError("Failed to sign in!");
    } else {
      setError(null);
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <form
            className="flex flex-col items-center p-8 rounded-md"
            action=""
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <Image alt="logo" src="/logo.png" height={50} width={50} />
            </div>
            <div className="mb-4 text-xl font-bold">LOGIN</div>
            <div className="flex flex-col items-center mb-4">
              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <span className="absolute left-4">
                    <Image
                      alt="username"
                      src="/username.png"
                      height={15}
                      width={15}
                    />
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <span className="absolute left-4">
                    <Image alt="pass" src="/pass.png" height={13} width={13} />
                  </span>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    placeholder="Password"
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-red-500 absolute -translate-x-1/2 -translate-y-1/2">{error}</p>
            </div>

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-400 to-blue-100 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
