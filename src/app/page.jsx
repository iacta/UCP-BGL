'use client';
import React, { useState, useEffect } from 'react';
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
    return <main>

    </main>
  }

  return (
    <main className={`relative min-h-screen text-black ${coming.className}`}>
      <div className="relative z-10">
        <Login />
      </div>
    </main>
  );
}
