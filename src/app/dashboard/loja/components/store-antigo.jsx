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



const plans = [
    {
        name: 'VIP COMUM',
        benefits: [
            '+2 Níveis',
            '+1KK (1.000.000) Em dinheiro in-game',
            'Dinheiro por PAYDAY',
            '1.35% em juros sob o dinheiro no banco',
        ],
        otherBenefits: [
            '- Direito a usar KIT-VIP',
            '- Direito a usar o Chat-VIP',
            '- Direito de desligar o celular',
            '- Direito a possuir mais carros',
            '- Direito a anunciar mais itens/cash',
            '- Não precisa ter Nivel para comprar uma casa',
            '- Pode se equipar com ORGVIP na organização mesmo se ela não tiver',
            '- Direito a usar o título de VIP-COMUM',
            '- Desconto de (5%) na compra de (Casas, Empresas, Veículos e Propriedades)',
            '- Receberá mais 3 páginas no inventário'
        ]
    },
    {
        name: 'SÓCIO COMUM',
        benefits: [
            '+3 Níveis',
            '+2KK (2.000.000) Em dinheiro in-game',
            '2x Dinheiro por PAYDAY',
            '1.50% em juros sob o dinheiro no banco',
        ],
        otherBenefits: [
            '(Todos os benefícios do plano anterior se aplicam a este plano)',
            '- Direito a comprar Fábrica',
            '- Direito a usar o Chat-SÓCIO',
            '- Direito a usar o título de SÓCIO-COMUM',
            '- Desconto de (10%) na compra de (Casas, Empresas, Veículos e Propriedades)'
        ]
    },
    {
        name: 'SÓCIO POWER',
        benefits: [
            '+4 Níveis',
            '+4KK (4.000.000) Em dinheiro in-game',
            '3x Dinheiro por PAYDAY',
            '1.65% em juros sob o dinheiro no banco'
        ],
        otherBenefits: [
            '(Todos os benefícios do plano anterior se aplicam a este plano)',
            '- Direito a comprar Empresa',
            '- Direito a comprar mais carros (3)',
            '- Direito a comprar mais casas (3)',
            '- Direito a comprar mais propriedades (2)',
            '- Direito a colocar mais caixa de itens (3)',
            '- Direito a anunciar mais itens/cash (4)',
            '- Direito a usar o jetpack sem ter o item',
            '- Direito a entrar em organizações (/entrarorg)',
            '- Desconto de (15%) na compra de (Casas, Empresas, Veículos e Propriedades)',
            '- Direito a ter mais páginas no inventário (4)',
            '- Direito a usar 150% de blindagem em veículos (/blindarvip)'
        ]
    },
    {
        name: 'SÓCIO GOLD',
        benefits: [
            '+5 Níveis',
            '+6KK (6.000.000) Em dinheiro in-game',
            '4x Dinheiro por PAYDAY',
            '1.80% em juros sob o dinheiro no banco'
        ],
        otherBenefits: [
            '(Todos os benefícios do plano anterior se aplicam a este plano)',
            '- Direito a comprar mais carros (4)',
            '- Direito a comprar mais casas (4)',
            '- Direito a comprar mais propriedades (3)',
            '- Direito a colocar mais caixa de itens (4)',
            '- Direito a anunciar mais itens/cash (5)',
            '- Direito a usar o título de SÓCIO-GOLD',
            '- Desconto de (20%) na compra de (Casas, Empresas, Veículos e Propriedades)',
            '- Ao digitar no chat a fala é com cor diferente',
            '- Direito a usar 200% de blindagem em veículos (/blindarvip)',
            '- Direito a mandar um anúncio na tela dos jogadores (/antela)',
            '- Não será cobrado o imposto no PAYDAY'
        ]
    },
    {
        name: 'SÓCIO PLATINA',
        benefits: [
            '+6 Níveis',
            '+7KK (7.000.000) Em dinheiro in-game',
            '5x Dinheiro por PAYDAY',
            '1.95% em juros sob o dinheiro no banco'
        ],
        otherBenefits: [
            '(Todos os benefícios do plano anterior se aplicam a este plano)',
            '- Direito a comprar mais carros (5)',
            '- Direito a comprar mais casas (5)',
            '- Direito a comprar mais propriedades (4)',
            '- Direito a colocar mais caixa de itens (5)',
            '- Direito a anunciar mais itens/cash (6)',
            '- Direito a reparar seu veículo em qualquer lugar (/repararvip)',
            '- Direito a abastecer seu veículo em qualquer lugar (/abastecervip)',
            '- Direito a pegar a caixinha em qualquer lugar (/caixinha)',
            '- Direito a usar o anúncio diferente e mais rápido (/an)',
            '- Direito a usar o título de SÓCIO-PLATINA',
            '- Direito a entrar em organizações (/entrarorg)',
            '- Desconto de (25%) na compra de (Casas, Empresas, Veículos e Propriedades)',
            '- Não precisa ter nível para comprar casa',
            '- Ao digitar no chat a fala é com cor diferente',
            '- Direito a usar 300% de blindagem em veículos (/blindarvip)',
            '- Não será cobrado o imposto no PAYDAY',
            '- Poderá pegar 2 caixinhas por PAYDAY',
            '- Poderá receber a caixa rara no mês dos presentes',
            '- Poderá usar o título personalizado sem ter o item',
            '- Poderá usar o /tunar gratuitamente'
        ]
    }
];

const PromoBox = ({ title, description1, description2 }) => {
    return (
        <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-10">
            <h1>{title}</h1>
            <p>{description1}</p>
            <p className="text-green-400">{description2}</p>
        </div>
    );
};

const PlanCard = ({ title, borderColor, buttonColor, textcolor, linkHref }) => {
    const [idCompra, setID] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();
    const formSchema = z.object({
        time: z.number().int().min(15),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: 15,
        },
    });

    async function onSubmit(data) {
        try {
            const { time } = data;

            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: title,
                    time: time,
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

    const planinfo = plans.find(plan => plan.name === title);

    return (
        <div className={`bg-gray-900 border-r-4 ${borderColor} font-bold text-white p-4 rounded-md flex flex-col justify-between w-full`}>
            <div>
                <div className="flex justify-center items-center">
                    <h1>{title}</h1>
                </div>
                <div className="flex justify-center pt-2 space-x-5">
                    <Dialog>
                        <DialogTrigger className={`${buttonColor} font-bold p-3 rounded-md`}>
                            Saiba Mais
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                            <DialogHeader>
                                <DialogTitle className={`${textcolor}`}>{title}</DialogTitle>
                                <DialogDescription>Saiba quais são os benefícios desse plano!</DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-80">
                                <div className="flex flex-wrap justify-between">
                                    <div className="w-full sm:w-auto">
                                        <h2 className="text-lg font-bold">Benefícios ao ativar o plano por 30 dias:</h2>
                                        {planinfo.benefits.map((benefit, index) => (
                                            <div key={index} className="bg-gray-900 p-3 rounded-md shadow-sm mb-2">
                                                <p className="text-white">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <h2 className="text-lg font-bold">Outros Benefícios:</h2>
                                        {planinfo.otherBenefits.map((otherBenefit, index) => (
                                            <div key={index} className="bg-gray-900 p-3 rounded-md shadow-sm mb-2">
                                                <p className="text-white">{otherBenefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className={`${buttonColor} font-bold p-3 rounded-md`}>
                            Adquirir
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                            <DialogHeader>
                                <DialogTitle className={`${textcolor}`}>{title}</DialogTitle>
                                <DialogDescription>
                                    <p>Digite a quantidade de dias que deseja adquirir desse plano</p>
                                    <p className="font-bold text-red-500">Min: 15 dias</p>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-wrap justify-between">
                                <div className="sm:w-auto">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="time">Informe a quantidade que deseja:</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="" className="bg-gray-900 rounded-md" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogClose asChild>
                                                <Button type="submit" className="bg-green-600 hover:bg-green-400 rounded-lg shadow-md">
                                                    Finalizar Compra</Button>
                                            </DialogClose>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger className={`hidden`}>
                            Finaizar
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                            <DialogHeader>
                                <DialogTitle className={`${textcolor}`}>{title}</DialogTitle>
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
                                <Button asChild className="bg-green-500 font-bold p-4">
                                    <Link href="/payment">Saiba Mais</Link>
                                </Button>
                                <Button asChild className="bg-green-500 font-bold p-4">
                                    <Link href="/payment">Adquirir</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-5 w-full lg:w-auto">
                            <h1>Planos Vips</h1>
                            <div className="flex flex-col space-y-5">
                                <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                                    <PlanCard
                                        title="VIP COMUM"
                                        borderColor="border-sky-400"
                                        buttonColor="bg-sky-400"
                                        linkHref="/payment"
                                        textcolor="text-sky-400"
                                    />
                                    <PlanCard
                                        title="SÓCIO COMUM"
                                        borderColor="border-orange-900"
                                        buttonColor="bg-orange-900"
                                        linkHref="/payment"
                                        textcolor="text-orange-900"
                                    />
                                    <PlanCard
                                        title="SÓCIO POWER"
                                        borderColor="border-violet-600"
                                        buttonColor="bg-violet-600"
                                        linkHref="/payment"
                                        textcolor="text-violet-600"
                                    />
                                    <PlanCard
                                        title="SÓCIO GOLD"
                                        borderColor="border-yellow-600"
                                        buttonColor="bg-yellow-600"
                                        linkHref="/payment"
                                        textcolor="text-yellow-600"
                                    />
                                </div>
                                <PlanCard
                                    title="SÓCIO PLATINA"
                                    borderColor="border-teal-400"
                                    buttonColor="bg-teal-400"
                                    linkHref="/payment"
                                    textcolor="text-teal-400"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-5 w-full lg:w-auto">
                        <h1>Veículos de Inventário</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            <VehicleCard vehicleID={496} vehicleName="Blista" />
                            <VehicleCard vehicleID={545} vehicleName="Hustler" />
                            <VehicleCard vehicleID={535} vehicleName="Slamvan" />
                            <VehicleCard vehicleID={542} vehicleName="Clover" />
                            <VehicleCard vehicleID={522} vehicleName="NRG-500" />
                            <VehicleCard vehicleID={468} vehicleName="Sanchez" />
                            <VehicleCard vehicleID={487} vehicleName="Maverick" />
                            <VehicleCard vehicleID={482} vehicleName="Burrito" />
                        </div>

                    </div>
                    <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-5 w-full lg:w-auto">
                        <h1>Veículos Únicos de Inventário</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            <VehicleRCCard vehicleName="cow" />
                            <VehicleRCCard vehicleName="shark" />
                            <VehicleRCCard vehicleName="ufo" />
                        </div>
                    </div>
                    <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-5 w-full lg:w-auto">
                        <h1>Veículos Guerra de Inventário</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            <VehicleCard vehicleID={520} vehicleName="Hydra" />
                            <VehicleCard vehicleID={432} vehicleName="Rhino" />
                            <VehicleCard vehicleID={425} vehicleName="Hunter" />
                        </div>
                    </div>
                    <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-5 w-full lg:w-auto">
                        <h1>Adquirir Família</h1>
                        <div className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                                <FamilyCard
                                    plan="FAMÍLIA COMUM"
                                    borderColor="border-green-500"
                                    buttonColor="bg-green-500"
                                    linkHref="/payment"
                                    textcolor="text-green-500"
                                />
                                <FamilyCard
                                    plan="FAMÍLIA PREMIUM"
                                    borderColor="border-sky-400"
                                    buttonColor="bg-sky-400"
                                    linkHref="/payment"
                                    textcolor="text-sky-400"
                                />
                                <FamilyCard
                                    plan="FAMÍLIA PLUS"
                                    borderColor="border-rose-600"
                                    buttonColor="bg-rose-600"
                                    linkHref="/payment"
                                    textcolor="text-rose-600"
                                />
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



