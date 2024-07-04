'use client'
import { useState, useEffect } from "react"
import { Warning, Question, AddressBookTabs, AddressBook } from "@phosphor-icons/react"
import { Skeleton } from "@/components/ui/skeleton";

export function Perfil() {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("/api/staffs/get-staff");
                const data = await response.json();
                console.log(data);
                setInfo(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center bg-gray-900 w-[500px] p-4 space-y-2 -mt-5">
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
                <Skeleton className="w-full h-56" />
            </div>
        )
    }

    return (
        <>
            <div className="w-full md:w-2/3 flex flex-col space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg shadow-md shadow-gray-400 text-white">
                    <h2 className="text-lg font-bold">Meu Perfil Staff</h2>
                    <div className="pt-4 space-y-3">
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <AddressBookTabs size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Meu Cargo:</p>
                            </div>
                            <p>{info.cargo}</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <AddressBook size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Minha Função:</p>
                            </div>
                            <p>{info.funcao}</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <Warning size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Meus avisos:</p>
                            </div>
                            <p>{info.warns}/3</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <Question size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Atendimentos Realizados:</p>
                            </div>
                            <p>{info.atendimentos}</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <Question size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Horas Trabalhadas:</p>
                            </div>
                            <div className="flex flex-col text-green-100">
                                <p>Hoje: </p>
                                <p>Total semanal: </p>
                                <p>Total mensal: </p>
                            </div>
                            <div className="flex flex-col">
                                <p>{info.horasHoje}H</p>
                                <p>{info.horasSemanal}H</p>
                                <p>{info.horasTotal}H</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}