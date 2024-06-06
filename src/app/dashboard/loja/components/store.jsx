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
    Ranking
} from "@phosphor-icons/react";
const divTheme = ""
export function Store() {
    return (
        <div className="px-4 md:px-10 py-10">
            <div className="flex flex-col space-y-10">
                <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white relative">
                    <h2 className="text-lg font-bold">Promoções</h2>
                    <img src="/offer.png" alt="offer" className="w-44 h-44 absolute top-0 right-0 -mt-20 -mr-10" />
                    <div className="pt-5 space-y-3 shadow-xl">
                        <div className="flex space-x-5">
                            <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-10">
                                <h1>PROMOÇÃO DE <span className="text-green-400">MOEDAS VIPS</span> - FESTA JUNINA</h1>
                                <p>DOAÇOES ACIMA DE 15,00 RECEBA 35% DE BÔNUS</p>
                                <p className="text-green-400">50,00 = 50.000 + 35% = 67.500 MV</p>
                            </div>
                            <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-10">
                                <h1>PROMOÇÃO DE <span className="text-green-400">CRÉDITOS</span> - VERÃO</h1>
                                <p>COMPRE 2.000 CRÉDITOS E GANHE +500 CRÉDITOS DE BÔNUS</p>
                                <p className="text-green-400">2.000 CRÉDITOS + 500 CRÉDITOS = 2.500 CRÉDITOS</p>
                            </div>
                            {/* Adicione mais quadros aqui, se necessário */}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white">
                    <h2 className="text-lg font-bold">Loja</h2>
                    <div className="pt-5 space-y-3 shadow-xl">
                        <div className="flex space-x-5">
                            <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-10">
                                <h1>Moedas Vips</h1>
                               <p>1 R$ = 1.000MV</p>
                            </div>
                            <div className="promo-box bg-gray-950 font-bold text-white p-4 rounded-md space-y-10">
                                <h1>Planos Vips</h1>
                                <p>COMPRE 2.000 CRÉDITOS E GANHE +500 CRÉDITOS DE BÔNUS</p>
                                <p className="text-green-400">2.000 CRÉDITOS + 500 CRÉDITOS = 2.500 CRÉDITOS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
