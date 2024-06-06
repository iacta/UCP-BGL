'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
const formSchema = z.object({
    username: z.string().max(20),
    password: z.string().max(8)
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(data) {
    console.log(data.username)
    const username = data.username
    const password = data.password
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Login failed');
      console.log(await res.json());
    }
  }