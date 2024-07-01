'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { GiveCodigo } from './give';

export default function Sucess() {
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCodigo = async () => {
            try {
                const codigo = await GiveCodigo();
                setInfo(codigo);
                console.log(codigo)
            } catch (error) {
                setInfo("");
                console.error('Erro ao obter o código:', error);
            }
            setLoading(false);
        };
        fetchCodigo();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(info);
        alert('Código copiado para a área de transferência!');
    };

    return (
        <div className="flex flex-col items-center justify-center pt-20 px-4">
            {loading ? (
                <div className="skeleton w-full max-w-sm h-10 bg-gray-300 animate-pulse"></div>
            ) : (
                info === "" ? (
                    <h1>Oopsss Algo deu errado</h1>
                ) : (
                    <Card className="w-full max-w-lg bg-gray-900 border-none shadow-md text-white">
                        <CardHeader>
                            <CardTitle>Seu código de ativação foi gerado com sucesso!!</CardTitle>
                            <CardDescription className="font-semibold">
                                <p>Como utilizar?</p>
                                <p>Copie o código abaixo depois entre no servidor digite o comando (/loja) e vá em ativar código</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col space-y-3">
                            <p className="break-words bg-gray-800 text-gray-400 p-2 rounded-md ">{info}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleCopy} className="bg-green-600 hover:bg-green-400 p-5 text-white">Copiar Código</Button>
                        </CardFooter>
                    </Card>
                )
            )}
            <div className='pt-20'>
                <Button asChild className="bg-green-600 hover:bg-green-400 p-8">
                    <Link href="/dashboard/loja">Voltar a loja</Link>
                </Button>
            </div>
        </div>
    );
}
