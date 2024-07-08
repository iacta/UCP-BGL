'use client'
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
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
import { ReplyReport, ReplyRevision } from './reply';
import { Skeleton } from "@/components/ui/skeleton"


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

export function DenunciasList ({ denuncias, func }) {
    const [imagens, setImagens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
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
                {denuncias.length > 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        {filteredDenuncias.map((denuncia, index) => (
                            <div key={index} className="mb-4">
                                <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
                                    <DialogTrigger onClick={() => fetchImagens(denuncia.relator, denuncia.id)}>
                                        <div className="border-none p-4 rounded-md shadow-lg cursor-pointer bg-gray-950 hover:bg-red-500 w-full sm:w-[300px]">
                                            <h3 className="text-lg font-bold">{denuncia.title}</h3>
                                            <p><span className="font-bold">De:</span> {denuncia.relator}</p>
                                            <p><span className="font-bold">Contra:</span> {denuncia.accused}</p>
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
                                                </ScrollArea>
                                                <ReplyReport delationId={denuncia.id} k={setIsMainDialogOpen}  func={() => func()}/>
                                            </DialogDescription>
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



export function DenunciasResolvedList ({ denuncias }) {
    const [imagens, setImagens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
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

export function RevisionList ({ revisoes, func }) {
    const [imagens, setImagens] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRevisoes, setFilteredRevisoes] = useState(revisoes);
    const [loadingImages, setLoadingImages] = useState(false);

    async function fetchImagens(reporterId, delationId) {
        try {
            setLoadingImages(true);
            const res = await fetch(`/api/revisoes/images-revisions/${reporterId}/${delationId}`);
            const data = await res.json();
            setImagens(data);
            setLoadingImages(false);
        } catch (error) {
            console.error(error);
            setLoadingImages(false);
        }
    }

    useEffect(() => {
        setFilteredRevisoes(
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
                {revisoes.length > 0 ? (
                    <div className="flex flex-col items-center justify-center">
                        {filteredRevisoes.map((revisao, index) => (
                            <div key={index} className="mb-4">
                                <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
                                    <DialogTrigger onClick={() => fetchImagens(revisao.relator, revisao.id)}>
                                        <div className="border-none p-4 rounded-md shadow-lg cursor-pointer bg-gray-950 hover:bg-red-500 w-full sm:w-[300px]">
                                            <h3 className="text-lg font-bold">{revisao.title}</h3>
                                            <p><span className="font-bold">De:</span> {revisao.relator}</p>
                                            <p><span className="font-bold">Contra:</span> {revisao.accused}</p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 border-none text-white rounded-md">
                                        <DialogHeader>
                                            <DialogTitle>Revisão: {revisao.relator}</DialogTitle>
                                            <DialogDescription>
                                                    <h1 className='font-bold text-base'>Staff Responsável pela punição:</h1>
                                                    {revisao.staff}
                                                    
                                                <h1 className='font-bold text-base'>Ocorrido:</h1>
                                                {revisao.reason}
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
                                                </ScrollArea>
                                                <ReplyRevision revisionID={revisao.id} k={setIsMainDialogOpen}  func={() => func()}/>
                                            </DialogDescription>
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
