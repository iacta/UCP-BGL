'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Bank,
    HandDeposit,
    Receipt,
    CurrencyCircleDollar,
    CurrencyDollar,
    Clock,
    Phone,
    Vault,
    Wallet,
    Factory,
    BuildingOffice,
    House,
    Skull,
    HeartHalf,
    Ranking,
    Sparkle,
    Cube,
    Lightning,
    Crown,
    SketchLogo
} from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";
const divTheme = ""
import { useState, useEffect } from "react";
export function Perfil() {
    const [infoUser, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/getUserInfo`);
                const data = await res.json();
                console.log(data);
                setInfo(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="text-white">
                <div className="px-4 md:px-10 py-10">
                    <div className="flex flex-col md:flex-row md:space-x-10">
                        <div className="w-full md:w-1/3 mb-10 md:mb-0 flex justify-center">
                            <div className="flex flex-col items-center space-y-4">
                                <Skeleton className="h-[900px] w-[200px] sm:w-[250px]" />
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 flex flex-col space-y-4">
                            <div className="space-y-3">
                                <Skeleton className="h-72 w-full" />
                                <Skeleton className="h-72 w-full" />
                                <Skeleton className="h-72 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }


    return (
        <div className="px-4 md:px-10 py-10">
            <div className="flex flex-col md:flex-row md:space-x-10">
                <div className="w-full md:w-1/3 mb-10 md:mb-0 flex justify-center">
                    <Card className="bg-gray-900  border-none shadow-md shadow-gray-400 text-white w-full md:w-auto">
                        <CardHeader className="text-center">
                            <div className="bg-gray-950 p-4 rounded-md">
                                <CardTitle>{infoUser.nick}</CardTitle>
                                <CardDescription>Novato</CardDescription>
                                <div className="flex justify-center items-center py-4">
                                    <div className="w-42 h-42 overflow-hidden border-none bg-transparent">
                                        <img src={`https://assets.open.mp/assets/images/skins/${infoUser.skinID}.png`} alt="Avatar" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center space-y-3">
                            <div className="flex flex-col items-center bg-gray-950 p-4 rounded-md space-y-4">
                                <div className="flex items-center bg-green-500 font-bold text-white p-2 rounded-md">
                                    <span className="mr-2">Nível</span>
                                    <span>{infoUser.nivel}</span>
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <div className="w-full bg-gray-800 rounded-full h-2.5 flex items-center">
                                        <div className="bg-green-400 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                                    </div>
                                    <div className="w-full flex justify-between text-gray-300 mt-2 text-sm">
                                        <span>Respeitos</span>
                                        <span>{infoUser.respeitos}/??</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-sky-400 font-bold text-white p-2 rounded-md">
                                <Sparkle size={32} weight="bold" /> <p className="pl-2">VIP COMUM</p>
                                <span className="pl-2"></span>
                            </div>
                            <div className="flex items-center justify-center bg-green-600 font-bold text-white p-2 rounded-md">
                                <CurrencyCircleDollar size={32} weight="bold" color="#0CFF00" className="" /> <p className="pl-2">Moedas VIP</p>
                                <span className="pl-2">{infoUser.moedas}</span>
                            </div>
                            <div className="flex items-center bg-gray-950 font-bold text-white p-4 rounded-md">
                                <Clock size={32} weight="bold" className="" /> <p className="pl-2">0</p>
                                <span className="pl-2 text-green-400">Horas Jogadas</span>
                            </div>
                            <div className="flex items-center bg-gray-950 font-bold text-white p-4 rounded-md">
                                <Phone size={32} weight="bold" className="" /> <p className="pl-2 text-green-400">Telefone</p>
                                {infoUser.telefone === 0 ? (<span className="pl-3">Nenhum</span>) : (<span className="pl-3">{infoUser.telefone}</span>)
                                }
                            </div>
                        </CardContent>
                        <CardFooter className="text-center">
                            <p className="font-bold text-gray-300">Último Login: {infoUser.uLogin}</p>
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-full md:w-2/3 flex flex-col space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white">
                        <h2 className="text-lg font-bold">Finanças</h2>
                        <div className="pt-4 space-y-3">
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <CurrencyDollar size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Dinheiro</p>
                                </div>
                                <p>${infoUser.money}</p>
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <Bank size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Banco</p>
                                </div>
                                <p>${infoUser.bank}</p>
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <Vault size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Ouros</p>
                                </div>
                                <p>${infoUser.ouros}</p>
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <Wallet size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Balanço Total</p>
                                </div>
                                <p>${infoUser.money + infoUser.bank}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white">
                        <h2 className="text-lg font-bold">Propriedades</h2>
                        <div className="pt-4 space-y-3">
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <Factory size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Fábrica</p>
                                </div>
                                {infoUser.fabrica === 0 ? (<p className="pl-3">Nenhuma</p>) : (<p className="pl-3">{infoUser.fabrica}</p>)}
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <BuildingOffice size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Empresa</p>
                                </div>
                                {infoUser.empresa === 0 ? (<p className="pl-3">Nenhuma</p>) : (<p className="pl-3">{infoUser.empresa}</p>)}
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <House size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Casa</p>
                                </div>
                                {infoUser.casa === 0 ? (<p className="pl-3">Nenhuma</p>) : (<p className="pl-3">{infoUser.casa}</p>)}
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <House size={32} weight="duotone" className="mr-2" />
                                    <p className="text-green-400">Casa Alugada</p>
                                </div>
                                {infoUser.casaAlugada === 0 ? (<p className="pl-3">Nenhuma</p>) : (<p className="pl-3">{infoUser.casaAlugada}</p>)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white">
                        <h2 className="text-lg font-bold">Estatísticas</h2>
                        <div className="pt-4 space-y-3">
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <HeartHalf size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Matou</p>
                                </div>
                                <p>{infoUser.matou}</p>
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <Skull size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">Morreu</p>
                                </div>
                                <p>{infoUser.morreu}</p>
                            </div>
                            <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                                <div className="flex items-center">
                                    <Ranking size={32} weight="bold" className="mr-2" />
                                    <p className="text-green-400">KD Geral</p>
                                </div>
                                <p>{infoUser.kd}%</p>
                            </div>
                        </div>
                    </div>

                    {/*   <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white">
                        <h2 className="text-lg font-bold">Itens</h2>
                        <div className="space-y-2">

                        </div>
                    </div> */}

                </div>
            </div>
        </div >
    );
}



export function BankBGL() {
    return (
        <div className="flex flex-row">
            <Card className="bg-gray-800 border-none shadow-md shadow-gray-400 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center"><Bank size={24} weight="bold" /> <h1 className="ml-2">Banco <span className="text-green-400">BGL</span></h1></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 font-semibold">
                        <p>Dinheiro no Banco: 0.000</p>
                        <p>Dinheiro em Mãos: 0.000</p>
                    </div>
                </CardContent>
                <CardFooter className="space-x-2">
                    <Button className="bg-green-600 hover:bg-green-400 rounded-lg shadow-md">
                        <Link target="_blank" href="https://discord.com/invite/bgl" className="flex items-center">
                            <HandDeposit size={24} weight="bold" />
                            <span className="ml-2">Transferência</span>
                        </Link>
                    </Button>
                    <Button className="bg-yellow-600 hover:bg-yellow-400 rounded-lg shadow-md">
                        <Link target="_blank" href="https://discord.com/invite/bgl" className="flex items-center">
                            <Receipt size={24} weight="bold" />
                            <span className="ml-2">Extrato</span>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
