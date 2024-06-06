'use client'
import { useState, useEffect } from 'react';
import { Nav } from "../../components/dash/nav"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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
import { ArrowLeft } from "@phosphor-icons/react";
import { ReplyReport } from './components/reply';
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
const SearchBar = ({ onChange }) => {
    return (
        <div className="mb-4">
            <Input
                type="text"
                placeholder="Search by reporter ID..."
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-950 rounded-md w-full"
            />
        </div>
    );
};

const DenunciasList = ({ denuncias }) => {
    const [imagens, setImagens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDenuncias, setFilteredDenuncias] = useState(denuncias);

    async function fetchImagens(reporterId, delationId) {
        try {
            const res = await fetch(`/api/images-delations/${reporterId}/${delationId}`);
            const data = await res.json();
            setImagens(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setFilteredDenuncias(
            denuncias.filter((denuncia) =>
                denuncia.relator.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, denuncias]);

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
                <SearchBar onChange={setSearchQuery} />
                {denuncias.length > 0 ? (

                    <div className="flex flex-wrap justify-between">
                        {filteredDenuncias.map((denuncia, index) => (
                            <div key={index} className="mb-4">
                                <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
                                    <DialogTrigger onClick={() => fetchImagens(denuncia.relator, '16')}>
                                        <div className="border-none p-4 rounded-md shadow-lg cursor-pointer bg-gray-950 hover:bg-red-500">
                                            <h3 className="text-lg font-bold">{denuncia.title}</h3>
                                            <p><span className="font-bold">De:</span> {denuncia.relator}</p>
                                            <p><span className="font-bold">Contra:</span> {denuncia.accused}</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                        <DialogHeader>
                                            <DialogTitle>{denuncia.relator} contra {denuncia.accused} - {denuncia.title}</DialogTitle>
                                            <DialogDescription>
                                                <h1 className='font-bold text-base'>Ocorrido:</h1>
                                                {denuncia.description}
                                                <ScrollArea className="h-48 pt-2">
                                                    <h1 className='font-bold text-base'>Provas:</h1>
                                                    <div className="flex space-x-4">
                                                        {imagens.map((imagem, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={imagem.url}
                                                                alt={imagem.nome}
                                                                className="h-24 w-24 cursor-pointer object-cover"
                                                                onClick={() => {
                                                                    setSelectedImage(imagem);
                                                                    setIsImageDialogOpen(true);
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                                <ReplyReport />
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))
                        }
                    </div>
                ) : (
                    <p className="text-white">Nenhuma denúncia encontrada.</p>

                )}
                {selectedImage && (
                    <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                        <DialogContent className="flex items-center justify-center bg-opacity-90 backdrop-blur-sm bg-gray-950 border-none text-white rounded-md max-w-screen-lg w-full">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.nome}
                                className="max-h-[80vh] max-w-[80vw] object-contain"
                            />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default function Delations() {
    const [denuncias, setDenuncias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("account"); // Estado para armazenar a aba ativa

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/get-delations/${activeTab}`);
                const data = await res.json();
                setDenuncias(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar denúncias:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    return (
        <main className="text-white">
            <Nav />
            <div className="flex justify-center items-center pt-10">
                <Tabs defaultValue="account" className="w-[400px]" onChange={handleTabChange}>
                    <TabsList className="p-2 bg-gray-900 text-white">
                        <TabsTrigger value="account">Denúncias em Aberto</TabsTrigger>
                        <TabsTrigger value="resolved">Denúncias Resolvidas</TabsTrigger>
                        <TabsTrigger value="revisions">Revisões</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card className="bg-gray-900 text-white border-none shadow-lg">
                            <CardHeader>
                                <CardTitle>Denúncias em Aberto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <DenunciasList denuncias={denuncias} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="resolved">
                        <Card className="bg-gray-900 text-white border-none shadow-lg">
                            <CardHeader>
                                <CardTitle>Denúncias Resolvidas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <DenunciasList denuncias={denuncias} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="revisions">
                        <Card className="bg-gray-900 text-white border-none shadow-lg">
                            <CardHeader>
                                <CardTitle>Revisões</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <DenunciasList denuncias={denuncias} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}   
