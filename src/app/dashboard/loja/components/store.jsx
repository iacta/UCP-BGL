'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import { IMaskInput } from 'react-imask';





const PromoBox = ({ title, description1, description2 }) => {
    return (
        <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-10">
            <h1>{title}</h1>
            <p>{description1}</p>
            <p className="text-green-400">{description2}</p>
        </div>
    );
};


const StoreSection = ({ children, title, imgSrc }) => {
    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white relative">
            <h2 className="text-lg font-bold">{title}</h2>
            {imgSrc && <img src={imgSrc} alt="offer" className="w-44 h-44 absolute top-0 right-0 -mt-20 -mr-4" />}
            <div className="pt-5 space-y-3 shadow-xl">{children}</div>
        </div>
    );
};

export function Store() {
    const [idCompra, setID] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    const formSchema = z.object({
        value: z.number().int().min(1000),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: 0,
        },
    });

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    async function onSubmit(data) {
        try {
            const { value } = data;

            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: "Moedas Vip's",
                    value: value,
                })
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setID(data);
                console.log('Teste ID COMPRA ', idCompra);
                setDialogOpen(true);
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente",
                });
            }

        } catch (error) {
            console.error('Erro ao registrar compra:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao registrar compra. Tente novamente mais tarde.",
            });
        }
    }

    useEffect(() => {
        initMercadoPago('TEST-f547d93f-3fe0-4fa8-9cb6-2d7e20bafe6e', { locale: 'pt-BR' });
    }, []);

    return (
        <div className="px-4 py-10">
            <div className="flex flex-col space-y-10">
                <StoreSection title="Promoções" imgSrc="/offer.png">
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
                        <PromoBox
                            title="PROMOÇÃO DE MOEDAS VIPS - FESTA JUNINA"
                            description1="DOAÇÕES ACIMA DE 15,00 RECEBA 35% DE BÔNUS"
                            description2="50,00 = 50.000 + 35% = 67.500 MV"
                        />
                        <PromoBox
                            title="PROMOÇÃO DE CRÉDITOS - VERÃO"
                            description1="COMPRE 2.000 CRÉDITOS E GANHE +500 CRÉDITOS DE BÔNUS"
                            description2="2.000 CRÉDITOS + 500 CRÉDITOS = 2.500 CRÉDITOS"
                        />
                    </div>
                </StoreSection>

                <StoreSection title="Loja">
                    <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
                        <div className="bg-gray-950 font-bold text-white rounded-md p-4 w-full h-full lg:w-auto">
                            <div className="flex justify-center items-center">
                                <h1>Moedas Vips</h1>
                            </div>
                            <div className="flex justify-center pt-2 space-x-3">
                                <Dialog>
                                    <DialogTrigger className={`bg-green-500 font-bold p-3 rounded-md`}>
                                        Saiba Mais
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                                        <DialogHeader>
                                            <DialogTitle className={`text-green-400`}>Moedas Vip's</DialogTitle>
                                            <DialogDescription>Saiba quais são os benefícios desse plano!</DialogDescription>
                                        </DialogHeader>
                                        <ScrollArea className="max-h-80">
                                            <div className="flex flex-wrap justify-between">
                                                <div className="w-full sm:w-auto">
                                                    <h2 className="text-lg font-bold">Benefícios ao ativar o plano por 30 dias:</h2>
                                                </div>
                                                <div className="w-full sm:w-auto">
                                                    <h2 className="text-lg font-bold">Outros Benefícios:</h2>
                                                </div>
                                            </div>
                                        </ScrollArea>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger className={`bg-green-500 font-bold p-3 rounded-md`}>
                                        Adquirir
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                                        <DialogHeader>
                                            <DialogTitle className={`text-green-400`}>Moedas Vip's</DialogTitle>
                                            <DialogDescription>
                                                <p>Digite a quantidade de moedas que deseja adquirir</p>
                                                <p className="font-bold text-yellow-500">Importante: 1R$ = 1.000MV'S</p>
                                                <p className="font-bold text-red-500">Min: 1.000</p>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-wrap justify-between">
                                            <div className="sm:w-auto">
                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="value"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="value">Informe a quantidade que deseja:</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder=""
                                                                            className="bg-gray-900 rounded-md"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                const formattedValue = formatNumber(e.target.value.replace(/\./g, ''));
                                                                                form.setValue('value', formattedValue);
                                                                                field.onChange(formattedValue);
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <DialogClose asChild>
                                                            <Button type="submit" className="bg-green-600 hover:bg-green-400 rounded-lg shadow-md">
                                                                Finalizar Compra
                                                            </Button>
                                                        </DialogClose>
                                                    </form>
                                                </Form>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <DialogTrigger className={`hidden`}>
                                        Finalizar
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                                        <DialogHeader>
                                            <DialogTitle className={`text-green-400`}>Moedas Vip's</DialogTitle>
                                            <DialogDescription>Finalizar Compra!</DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full sm:w-auto">
                                                <div id="wallet_container">
                                                    <Wallet initialization={{ preferenceId: idCompra }} customization={{ texts: { valueProp: 'smart_option' } }} />
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </StoreSection>
            </div>
        </div>
    );
}

export function VehicleCard({ vehicleID, vehicleName }) {
    const [idCompra, setID] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    async function onSubmit() {
        try {

            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: vehicleName,
                })
            });
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setID(data);
                console.log('Teste ID COMPRA ', idCompra);
                setDialogOpen(true)

            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }

        } catch (error) {
            console.error('Erro ao registrar compra:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao registrar compra. Tente novamente mais tarde."
            });
        }
    }

    return (
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-md space-y-4">
            <div className="w-36 h-36 overflow-hidden rounded-md flex items-center justify-center">
                <img
                    src={`https://assets.open.mp/assets/images/vehiclePictures/Vehicle_${vehicleID.toString()}.jpg`}
                    alt="Vehicle"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex justify-center space-x-4">
                <Dialog>
                    <DialogTrigger className="bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                        Saiba Mais
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle className="text-white text-xl font-bold">Veículo {vehicleName}</DialogTitle>
                            <DialogDescription className="text-gray-300">Saiba mais sobre os benefícios deste veículo.</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-80 mt-4">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg text-white font-bold">Benefícios ao comprar o veículo </h2>
                                    <div className="bg-gray-900 p-3 rounded-md shadow-sm">
                                        <p className="text-gray-300">Ao comprar o veículo você podera spawnar o mesmo em qualquer lugar a qualquer hora</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger className={`bg-green-600 font-bold p-3 rounded-md`}>
                        Adquirir
                    </DialogTrigger>
                    <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle className={`text-green-500`}>{vehicleName}</DialogTitle>
                            <DialogDescription>
                                <p>Você está prestes a comprar um {vehicleName}!</p>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                            <Button onClick={() => onSubmit()} className="bg-green-600 hover:bg-green-400 rounded-lg shadow-md">
                                Finalizar Compra</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger className={`hidden`}>
                        Finaizar
                    </DialogTrigger>
                    <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle className={`text-green-500`}>{vehicleName}</DialogTitle>
                            <DialogDescription>Finalizar Compra!</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full sm:w-auto">
                                <div id="wallet_container">
                                    <Wallet initialization={{ preferenceId: idCompra }} customization={{ texts: { valueProp: 'smart_option' } }} />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export function VehicleRCCard({ vehicleID, vehicleName }) {
    const [idCompra, setID] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    async function onSubmit() {
        try {

            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: vehicleName,
                })
            });
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setID(data);
                console.log('Teste ID COMPRA ', idCompra);
                setDialogOpen(true)

            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }

        } catch (error) {
            console.error('Erro ao registrar compra:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao registrar compra. Tente novamente mais tarde."
            });
        }
    }

    return (
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-md space-y-4">
            <div className="w-36 h-36 overflow-hidden rounded-md flex items-center justify-center">
                <img
                    src={`/rc/${vehicleName}.png`}
                    alt="Vehicle"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex justify-center space-x-4">
                <Dialog>
                    <DialogTrigger className="bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                        Saiba Mais
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle className="text-white text-xl font-bold">Veículo</DialogTitle>
                            <DialogDescription className="text-gray-300">Saiba mais sobre os benefícios deste veículo.</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-80 mt-4">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg text-white font-bold">Benefícios ao ativar o plano por 30 dias:</h2>
                                    <div className="bg-gray-900 p-3 rounded-md shadow-sm">
                                        <p className="text-gray-300">Informações sobre o veículo:</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                <Button asChild className="bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                    <Link href="/">Adquirir</Link>
                </Button>
            </div>
        </div>
    )
}


export function FamilyCard({ plan, borderColor, buttonColor, textcolor, linkHref }) {

    return (
        <div className={`bg-gray-900 border-r-4 ${borderColor} font-bold text-white p-4 rounded-md flex flex-col justify-between w-full`}>
            <div>
                <div className="flex justify-center items-center">
                    <h1>{plan}</h1>
                </div>
                <div className="flex justify-center pt-2 space-x-5">
                    <Dialog>
                        <DialogTrigger className={`${buttonColor} font-bold p-3 rounded-md`}>
                            Saiba Mais
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                            <DialogHeader>
                                <DialogTitle className={`${textcolor}`}>{plan}</DialogTitle>
                                <DialogDescription>Saiba quais são os benefícios desse plano!</DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-80">
                                <div className="flex flex-wrap justify-between">
                                    <div className="w-full sm:w-auto">
                                        <h2 className="text-lg font-bold">Benefícios ao ativar o plano por 30 dias:</h2>

                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <h2 className="text-lg font-bold">Outros Benefícios:</h2>

                                    </div>
                                </div>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    <Button asChild className={`${buttonColor} font-bold p-6`}>
                        <Link href={linkHref}>Adquirir</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};



