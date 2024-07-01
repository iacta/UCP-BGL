import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
import { PencilSimple, Archive, User, Shield } from "@phosphor-icons/react"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';
import { NewDenuncia, NewDenunciaStaff } from "./criar-denuncia/criar"

export function Delation() {
    const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
    const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
    const [reportType, setReportType] = useState('');

    const openFirstDialog = () => setIsFirstDialogOpen(true);
    const closeFirstDialogAndOpenSecond = (type) => {
        setIsFirstDialogOpen(false);
        setReportType(type);
        setIsSecondDialogOpen(true);
    };

    return (
        <>
            <div className="flex justify-center items-center pt-20">
                <div className="flex flex-col max-w-[650px] w-full font-bold">
                    <h1 className="text-2xl">Central de Denúncias</h1>
                    <p className="break-words text-gray-400">
                        As denúncias desempenham um papel crucial na manutenção da ordem no servidor, assegurando que as regras sejam aplicadas de maneira justa. Os jogadores têm a oportunidade de relatar qualquer violação, apresentar evidências e ajudar a garantir que os infratores sejam devidamente punidos.
                    </p>
                    <div className="flex flex-row space-x-5 pt-10">
                        <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
                            <DialogTrigger className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md">
                                <div className="flex items-center p-2">
                                    <PencilSimple size={24} weight="bold" />
                                    <span className="ml-2">Criar nova Denúncia</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-950 border-none rounded-md">
                                <DialogHeader>
                                    <DialogTitle>Criar Denúncia</DialogTitle>
                                    <DialogDescription className="pt-5 space-x-3">
                                        <DialogClose asChild>
                                            <Button className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md" onClick={() => closeFirstDialogAndOpenSecond('Jogador')}>
                                                <User size={24} weight="bold" />
                                                <span className="ml-2 font-bold">Denunciar um Jogador</span>
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md" onClick={() => closeFirstDialogAndOpenSecond('Staff')}>
                                                <Shield size={24} weight="bold" />
                                                <span className="ml-2 font-bold">Denunciar um Staff</span>
                                            </Button>
                                        </DialogClose>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Button className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md">
                            <Link href="/dashboard/denuncias/minhas-denuncias" className="flex items-center">
                                <Archive size={24} weight="bold" />
                                <span className="ml-2">Minhas denúncias</span>
                            </Link>
                        </Button>
                        <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
                            <DialogTrigger asChild>
                                <Button style={{ display: 'none' }}>Nova denúncia</Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                <DialogHeader>
                                    <DialogTitle>Denunciar {reportType}</DialogTitle>
                                    <DialogDescription>
                                        {reportType === "Staff" ? <NewDenunciaStaff k={setIsSecondDialogOpen} /> : <NewDenuncia  k={setIsSecondDialogOpen}/>}
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
}
