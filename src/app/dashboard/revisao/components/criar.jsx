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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useDropzone } from 'react-dropzone';
import { ScrollArea } from "@/components/ui/scroll-area"

export function NewRevision({ k }) {
    const { toast } = useToast();
    const formSchema = z.object({
        staffName: z.string().max(20),
        about: z.string().max(10),
        desc: z.string().max(100)
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    });
    const [images, setImages] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg, image/pjpeg',
        multiple: true,
        onDrop: acceptedFiles => {
            const newImages = acceptedFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        },
    });

    const convertToBase64 = async (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    async function onSubmit(data) {
        try {
            const { staffName, about, desc } = data;

            const base64Images = await Promise.all(images.map(image => convertToBase64(image.file)));

            const res = await fetch('/api/revisao/create-revision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reason: about,
                    images: base64Images,
                    accused: staffName,
                    description: desc,
                })
            });
            k(false);
            if (res.status === 200) {
                toast({
                    title: "Revisão enviada com sucesso!",
                    description: "Sua Revisão foi registrada e enviada a nossa equipe, em breve iremos retornar com uma resposta"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }

        } catch (error) {
            console.error('Erro ao enviar Revisão:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao enviar Revisão. Tente novamente mais tarde."
            });
        }
    }
    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="staffName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nick de quem aplicou a punição</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className="bg-gray-900 rounded-md" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motivo</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className="bg-gray-900 rounded-md" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Descreva o ocorrido em poucas palavras"
                                        className="resize-none bg-gray-900 rounded-md"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div>
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed border-gray-400 rounded-md p-4 cursor-pointer transition duration-300"
                        >
                            <input {...getInputProps()} />
                            <p>Solte as imagens aqui ou clique para selecionar.</p>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img src={image.preview} alt={`Imagem ${index + 1}`} className="w-24 h-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button type="submit" className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md">
                        Enviar</Button>
                </form>
            </Form>
        </div>
    );
}