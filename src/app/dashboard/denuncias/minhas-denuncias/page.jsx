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
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Trash } from '@phosphor-icons/react';
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
                placeholder="Procurar pelo nome do denunciante ou do acusado"
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-950 rounded-lg w-full border-green-100"
            />
        </div>
    );
};

const DenunciasList = ({ denuncias, type, func }) => {
    const [imagens, setImagens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDenuncias, setFilteredDenuncias] = useState(denuncias);
    const [loadingImages, setLoadingImages] = useState(false);

    async function fetchImagens(reporterId, delationId) {
        try {
            setLoadingImages(true);
            const res = await fetch(`/api/denuncias/images-delations/${reporterId}/${delationId}`);
            const data = await res.json();
            setImagens(data);
            setLoadingImages(false);
        } catch (error) {
            console.error(error);
            setLoadingImages(false);
        }
    }

    async function deleteDelation(id, reporterId) {
        try {
            const res = await fetch('/api/denuncias/delete-delation', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    delationId: id,
                    reporterId: reporterId
                })
            });
            if (res.status === 200) {
                func();
                toast({
                    title: "Denúncia Deletada com sucesso!",
                    description: "A denúncia foi deletada com sucesso!"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }

        } catch (error) {
            console.error('Erro ao deletar denúncia:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao deletar denúncia. Tente novamente mais tarde."
            });
        }
    }

    useEffect(() => {
        setFilteredDenuncias(
            denuncias.filter((denuncia) =>
                denuncia.relator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                denuncia.accused.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, denuncias]);

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
                <SearchBar onChange={setSearchQuery} />
                {filteredDenuncias.length > 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        {filteredDenuncias.map((denuncia) => (
                            <div key={denuncia.id} className="mb-4">
                                <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
                                    <DialogTrigger onClick={() => fetchImagens(denuncia.relator, denuncia.id)}>
                                        <div className="border-none p-4 rounded-md shadow-lg cursor-pointer bg-gray-950 hover:bg-green-500 w-full sm:w-[300px]">
                                            <h3 className="text-lg font-bold">{denuncia.title}</h3>
                                            <p><span className="font-bold">De:</span> {denuncia.relator}</p>
                                            <p><span className="font-bold">Contra:</span> {denuncia.accused}</p>
                                            {type === "relator" || denuncia.veredit === "none" && (
                                                <div className='flex flex-row-reverse'>
                                                    <Button variant="outline" size="icon" className="bg-transparent hover:bg-red-500" onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsDeleteDialogOpen(true);
                                                    }}>
                                                        <Trash size={24} weight="bold" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                        <DialogHeader>
                                            <DialogTitle>{denuncia.relator} contra {denuncia.accused} - {denuncia.title}</DialogTitle>
                                            <DialogDescription>
                                                {denuncia.staff === false && (<>
                                                    <h1 className='font-bold text-base'>Org do Denunciante:</h1>
                                                    {denuncia.orgRelator}
                                                    <h1 className='font-bold text-base'>Org do Acusado:</h1>
                                                    {denuncia.orgAccused}
                                                </>
                                                )}
                                                <h1 className='font-bold text-base'>Ocorrido:</h1>
                                                {denuncia.description}
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
                                                        )}
                                                    </div>
                                                    <div className='flex flex-row space-x-2 text-base pt-2'>
                                                        <h2 className='font-bold text-orange-500'>Status:</h2>
                                                        {denuncia.veredit === "none" ? (
                                                            <p className='font-semibold'>Em análise</p>
                                                        ) : denuncia.veredit === "approved" ? (
                                                            <p className='font-semibold text-green-500'>Aprovada</p>
                                                        ) : (
                                                            <p className='font-semibold text-red-500'>Recusada</p>
                                                        )}
                                                    </div>
                                                    {denuncia.veredit !== "none" && (
                                                        <div className='flex flex-row space-x-2 text-base pt-2'>
                                                            <h2 className='font-bold text-red-600'>Veredito:</h2>
                                                            <p className='font-semibold'><span className="text-rose-500">Admin [ {denuncia.adminReply} ]:</span> {denuncia.vereditDescription}</p>
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
                                            <DialogTitle>Deletar denúncia!</DialogTitle>
                                            <DialogDescription>
                                                <h1 className='font-bold text-base'>Você tem certeza que deseja deletar essa denúncia? Esta ação não pode ser desfeita!</h1>
                                            </DialogDescription>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button className="bg-green-500">
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>
                                                <Button className="bg-red-500" onClick={() => deleteDelation(denuncia.id, denuncia.relator)}>
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


export default function MinhasDenuncias() {
    const [denuncias, setDenuncias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('relator');

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/denuncias/getUser-delations/${activeTab}`);
            const data = await res.json();
            console.log(data);
            setDenuncias(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar denúncias:', error);
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
                        <div className='flex flex-row space-x-1'>
                            <Skeleton className="h-4 w-[150px] sm:w-[250px]" />
                            <Skeleton className="h-4 w-[100px] sm:w-[200px]" />
                        </div>
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

    const handleTabChange = (value) => {
        setLoading(true);
        setActiveTab(value);
        fetchData();
    };

    return (
        <main className="text-white">
            <Nav userInfo={userInfo} />
            <div className="pl-4 sm:pl-10 pt-5">
                <NavHome />
                <div className="flex justify-center items-center -mt-10">
                    <Tabs defaultValue="relator" className="w-full sm:w-[400px]">
                        <TabsList className="p-2 bg-gray-900 text-white">
                            <TabsTrigger
                                value="relator"
                                data-state={activeTab === "relator" ? "active" : ""}
                                className="cursor-pointer"
                                onClick={() => handleTabChange("relator")}
                            >
                                Minhas denúncias
                            </TabsTrigger>
                            <TabsTrigger
                                value="accused"
                                data-state={activeTab === "accused" ? "active" : ""}
                                className="cursor-pointer"
                                onClick={() => handleTabChange("accused")}
                            >
                                Denúncias contra Mim
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="relator">
                            <Card className="bg-gray-900 text-white border-none shadow-lg">
                                <CardHeader>
                                    <CardTitle>Minhas denúncias</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <DenunciasList denuncias={denuncias} type={activeTab} func={() => loader()} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="accused">
                            <Card className="bg-gray-900 text-white border-none shadow-lg">
                                <CardHeader>
                                    <CardTitle>Denúncias contra Mim</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <DenunciasList denuncias={denuncias} type={activeTab} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </main>
    );
}
