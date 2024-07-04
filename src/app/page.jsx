'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { coming } from "./fonts";
import { Login } from './login';
import { getUser } from './dashboard/user';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      await getUser();
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) {
    return <main></main>;
  }

  return (
    <main className="relative min-h-screen text-black">
      <div className="relative min-h-screen">
        <Image
          src="/bg.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
          className="pointer-events-none"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <Login />
        </div>
      </div>
    </main>
  );
}
