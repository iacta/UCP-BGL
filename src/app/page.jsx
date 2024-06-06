'use client';


import React, { useState } from 'react';
import { coming } from "./fonts";
import { Login } from './login';
import { getUser } from './dashboard/user';

export default function Home() {
  getUser();
  return (
    <main className={`relative min-h-screen text-black ${coming.className}`}>
      <div className="relative z-10">
        <Login />
      </div>
    </main>
  );
}
