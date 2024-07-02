'use client'
import { useState, useEffect } from 'react';
import { Nav } from "../../components/dash/nav"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Trash, Clock, CheckCircle, XCircle } from '@phosphor-icons/react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { NavHome } from './components/nav';

export async function getServerSideProps(context) {
    const res = await fetch('/api/getUserInfo', {
        headers: {
            Cookie: context.req.headers.cookie,
        },
    });
    const userInfo = await res.json();

    return {
        props: { userInfo }, 
    };
}

const SearchBar = ({ onChange }) => {
    return (
        <div className="mb-4">
            <Input
                type="text"
                placeholder="Procurar pelo nome do usuário"
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-950 rounded-lg w-full border-green-100"
            />
        </div>
    );
};  

const RevisaoList = ({ revisoes, type, func }) => {
    const [imagens, setImagens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDenuncias, setFilteredDenuncias] = useState(revisoes);
    const [loadingImages, setLoadingImages] = useState(false);

    async function fetchImagens(reporterId, revisionId) {
        try {
            setLoadingImages(true);
            const res = await fetch(`/api/revisao/images-revisions/${reporterId}/${revisionId}`);
            if (res.status === 404) {
                setImagens(['error']);
                setLoadingImages(false);
            }
            const data = await res.json();
            setImagens(data);
            setLoadingImages(false);
        } catch (error) {
            console.error(error);
            setLoadingImages(false);
        }
    }

    async function deleteRevision(id, reporterId) {
        try {
            const res = await fetch('/api/revisoes/delete-revision', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    revisionId: id,
                    reporterId: reporterId
                })
            });
            if (res.status === 200) {
                func();
                toast({
                    title: "revisão Deletada com sucesso!",
                    description: "A revisão foi deletada com sucesso!"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }

        } catch (error) {
            console.error('Erro ao deletar revisão:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao deletar revisão. Tente novamente mais tarde."
            });
        }
    }

    useEffect(() => {
        setFilteredDenuncias(
            revisoes.filter((revisao) =>
                revisao.relator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                revisao.accused.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, revisoes]);

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
                <SearchBar onChange={setSearchQuery} />
                {filteredDenuncias.length > 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        {filteredDenuncias.map((revisao) => (
                            <div key={revisao.id} className="mb-4">
                                <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
                                    <DialogTrigger onClick={() => fetchImagens(revisao.relator, revisao.id)}>
                                        <div className="border-none p-4 rounded-md shadow-lg cursor-pointer bg-gray-950 hover:bg-green-500 w-full sm:w-[300px]">
                                            <h3 className="text-lg font-bold">{revisao.title}</h3>
                                            <h4 className="text-base font-semibold text-gray-500">Motivo: {revisao.reason}</h4>
                                            {(type === "relator" || revisao.veredit === "none") && (
                                                <div className='flex flex-row-reverse'>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="bg-transparent hover:bg-red-500"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash size={24} weight="bold" />
                                                    </Button>
                                                </div>
                                            )}
                                            <div className='flex flex-row items-center space-x-2 text-base pt-2'>
                                                <h2 className='font-bold text-orange-500'>Status:</h2>
                                                {revisao.veredit === "none" ? (
                                                    <div className='flex items-center space-x-1 text-gray-400'>
                                                        <Clock size={24} weight="bold" />
                                                        <p className='font-semibold'>Em análise</p>
                                                    </div>
                                                ) : revisao.veredit === "approved" ? (
                                                    <div className='flex items-center space-x-1 text-green-500'>
                                                        <CheckCircle size={24} weight="bold" />
                                                        <p className='font-semibold'>Aprovada</p>
                                                    </div>
                                                ) : (
                                                    <div className='flex items-center space-x-1 text-red-500'>
                                                        <XCircle size={24} weight="bold" />
                                                        <p className='font-semibold'>Recusada</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                        <DialogHeader>
                                            <DialogTitle>{revisao.title}</DialogTitle>
                                            <DialogDescription>
                                                <h1 className='font-bold text-base'>Ocorrido:</h1>
                                                {revisao.description}
                                                <ScrollArea className="h-48 pt-2">
                                                    <h1 className='font-bold text-base'>Provas:</h1>
                                                    <div className="flex space-x-4">
                                                        {loadingImages ? (
                                                            <>
                                                                <Skeleton className="h-24 w-24 rounded-md" />
                                                                <Skeleton className="h-24 w-24 rounded-md" />
                                                                <Skeleton className="h-24 w-24 rounded-md" />
                                                            </>
                                                        ) : (
                                                            imagens.includes('error') ? (
                                                                <h1>Sem imagens</h1>
                                                            ) : (
                                                                imagens.map((imagem, idx) => (
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
                                                                ))
                                                            )
                                                        )}
                                                    </div>
                                                    <div className='flex flex-row space-x-2 text-base pt-2'>
                                                        <h2 className='font-bold text-orange-500'>Status:</h2>
                                                        {revisao.veredit === "none" ? (
                                                            <p className='font-semibold'>Em análise</p>
                                                        ) : revisao.veredit === "approved" ? (
                                                            <p className='font-semibold text-green-500'>Aprovada</p>
                                                        ) : (
                                                            <p className='font-semibold text-red-500'>Recusada</p>
                                                        )}
                                                    </div>
                                                    {revisao.veredit !== "none" && (
                                                        <div className='flex flex-row space-x-2 text-base pt-2'>
                                                            <h2 className='font-bold text-red-600'>Veredito:</h2>
                                                            <p className='font-semibold'><span className="text-rose-500">Admin [ {revisao.adminReply} ]:</span> {revisao.vereditDescription}</p>
                                                        </div>
                                                    )}
                                                </ScrollArea>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                    <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                        <DialogHeader>
                                            <DialogTitle>Deletar revisão!</DialogTitle>
                                            <DialogDescription>
                                                <h1 className='font-bold text-base'>Você tem certeza que deseja deletar essa revisão? Esta ação não pode ser desfeita!</h1>
                                            </DialogDescription>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button className="bg-green-500">
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>
                                                <Button className="bg-red-500" onClick={() => deleteRevision(revisao.id, revisao.relator)}>
                                                    Deletar
                                                </Button>
                                            </DialogFooter>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white">Nenhuma revisão encontrada.</p>
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


export default function MinhasRevisoes() {
    const [revisoes, setDenuncias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('relator');

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/revisao/getUser-revisions`);
            const data = await res.json();
            console.log(data);
            setDenuncias(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar revisãos:', error);
            setLoading(false);
        }
    };
    const loader = async () => {
        setLoading(true);
        await fetchData();
    }
    useEffect(() => {
        fetchData();
    }, [activeTab]);

    if (loading) {
        return (
            <main className="text-white">
                <Nav userInfo={userInfo} />
                <div className="flex justify-center items-center">
                    <div className="flex flex-col space-y-3">
                        <div className="space-y-2">
                            <Skeleton className="h-[125px] w-[200px] sm:w-[250px] rounded-xl" />
                            <Skeleton className="h-[125px] w-[200px] sm:w-[250px] rounded-xl" />
                            <Skeleton className="h-[125px] w-[200px] sm:w-[250px] rounded-xl" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="text-white">
            <Nav userInfo={userInfo} />
            <div className="pl-4 sm:pl-10 pt-5">
                <NavHome />
                <div className="flex justify-center items-center -mt-10">

                    <Card className="bg-gray-900 text-white border-none shadow-lg">
                        <CardHeader>
                            <CardTitle>Minhas Revisões</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <RevisaoList revisoes={revisoes} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
