'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

export function Login() {
  const [error, setError] = useState(false)
  const router = useRouter();
  const formSchema = z.object({
    username: z.string().max(20),
    password: z.string().max(8)
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
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
      setError(true);
      console.log(await res.json());
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] border-none opacity-100 bg-black text-white shadow-lg rounded-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre com suas credenciais</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nickname</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Seu nickname" className="bg-gray-950 rounded-md" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Sua senha" className="bg-gray-950 rounded-md" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-gray-900 rounded-3xl p-2 w-full hover:bg-gray-800">Entrar</Button>
            </form>
          </Form>
          <div className="pt-5">
            <Button type="submit" className="bg-transparent rounded-lg p-2 w-full hover:text-green-500 hover:bg-gray-950">Esqueci minha senha</Button>
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      <Dialog open={error} onOpenChange={setError}>
        <DialogTrigger className={`hidden`}>Open</DialogTrigger>
        <DialogContent className="bg-gray-950">
          <DialogHeader>
            <DialogTitle>Usuário ou senha incorretos!</DialogTitle>
            <DialogDescription>
              Você digitou seu usuário ou senha incorretamente, tente novamente!
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md">
              <span className="">Tentar Novamente</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}  