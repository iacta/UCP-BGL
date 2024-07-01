import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Warning, Question, AddressBookTabs, AddressBook } from "@phosphor-icons/react"
export function Perfil() {
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
                            <p>Administrador</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <AddressBook size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Minha Função:</p>
                            </div>
                            <p>Atendimento</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <Warning size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Meus avisos:</p>
                            </div>
                            <p>0/3</p>
                        </div>
                        <div className="flex justify-between bg-gray-950 font-bold text-white p-4 rounded-md">
                            <div className="flex items-center">
                                <Question size={32} weight="bold" className="mr-2" />
                                <p className="text-green-400">Atendimentos Realizados:</p>
                            </div>
                            <p>150</p>
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
                                <p>5H</p>
                                <p>12H</p>
                                <p>35H</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}