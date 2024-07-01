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
import { NewRevision } from "./criar";

export function Revision() {
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
                    <h1 className="text-2xl">Central de Revisões</h1>
                    <p className="break-words text-gray-400">
                        Acha que foi punido injustamente? Esse lugar é para você!
                    </p>
                    <div className="flex flex-row space-x-5 pt-10">
                        <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md" onClick={() => closeFirstDialogAndOpenSecond('Jogador')}>
                                    <PencilSimple size={24} weight="bold" />
                                    <span className="ml-2 font-bold">Criar Revisão</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                <DialogHeader>
                                    <DialogTitle>Revisão</DialogTitle>
                                    <DialogDescription>
                                        <NewRevision k={setIsSecondDialogOpen} />
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Button className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md" asChild>
                            <Link href="/dashboard/revisao/minhas-revisoes">
                                <Archive size={24} weight="bold" />
                                <span className="ml-2 font-bold">Minhas Revisões</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
