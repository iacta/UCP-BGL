'use client'
import { useState, useEffect } from 'react';
import { Nav } from "../../components/dash/nav"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { NavHome } from '../components/nav';
import { Skeleton } from "@/components/ui/skeleton"
import { DenunciasList, DenunciasResolvedList } from "./components/list"

export default function Delations() {
    const [denuncias, setDenuncias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("none");

    // Função para buscar dados
    const fetchData = async (tab) => {
        try {
            const res = await fetch(`/api/denuncias/get-delations/${tab}`);
            const data = await res.json();
            setDenuncias(data);
        } catch (error) {
            console.error('Erro ao buscar denúncias:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para carregar dados, usada também externamente
    const loader = async () => {
        setLoading(true);
        await fetchData(activeTab);
    };

    // Atualiza os dados quando a aba ativa muda
    useEffect(() => {
        loader();
    }, [activeTab]);

    // Handle para mudar de aba
    const handleTabChange = (value) => {
        if (value !== activeTab) {
            setActiveTab(value);
        }
    };

    // Função para retornar o título da aba ativa
    const getTitle = () => {
        switch (activeTab) {
            case "none":
                return "Denúncias em Aberto";
            case "yes":
                return "Denúncias Resolvidas";
            case "revisions":
                return "Revisões";
            default:
                return "Denúncias";
        }
    };

    // Função para retornar o componente da aba ativa
    const getComponent = () => {
        switch (activeTab) {
            case "none":
                return <DenunciasList denuncias={denuncias} func={loader} />;
            case "yes":
                return <DenunciasResolvedList denuncias={denuncias} />;
            case "revisions":
                return;
            default:
                return null;
        }
    };

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <main className="text-white">
            <Nav />
            <div className="pl-4 sm:pl-10 pt-5">
                <NavHome />
                <div className="flex justify-center items-center mt-8 sm:-mt-64">
                    <TabsComponent activeTab={activeTab} handleTabChange={handleTabChange} />
                    <ContentComponent title={getTitle()} component={getComponent()} />
                </div>
            </div>
        </main>
    );
}

// Componente de carregamento
const LoadingComponent = () => (
    <main className="text-white">
        <Nav />
        <div className="pl-4 sm:pl-10 pt-5">
            <NavHome />
            <div className="flex justify-center items-center mt-8 sm:-mt-64">
                <div className="flex flex-col space-y-3">
                    <div className='flex flex-row space-x-1'>
                        <Skeleton className="h-4 w-[150px] sm:w-[250px]" />
                        <Skeleton className="h-4 w-[100px] sm:w-[200px]" />
                        <Skeleton className="h-4 w-[100px] sm:w-[200px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-[125px] w-[200px] sm:w-[250px] rounded-xl" />
                        <Skeleton className="h-[125px] w-[200px] sm:w-[250px] rounded-xl" />
                        <Skeleton className="h-[125px] w-[200px] sm:w-[250px] rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    </main>
);

// Componente de abas
const TabsComponent = ({ activeTab, handleTabChange }) => (
    <Tabs defaultValue="none" value={activeTab} className="w-full sm:w-[400px]">
        <TabsList className="p-2 bg-gray-900 text-white">
            <TabsTrigger
                value="none"
                data-state={activeTab === "none" ? "active" : ""}
                className="cursor-pointer"
                onClick={() => handleTabChange('none')}
            >
                Denúncias em Aberto
            </TabsTrigger>
            <TabsTrigger
                value="yes"
                data-state={activeTab === "yes" ? "active" : ""}
                className="cursor-pointer"
                onClick={() => handleTabChange('yes')}
            >
                Denúncias Resolvidas
            </TabsTrigger>
            <TabsTrigger
                value="revisions"
                data-state={activeTab === "revisions" ? "active" : ""}
                className="cursor-pointer"
                onClick={() => handleTabChange('revisions')}
            >
                Revisões
            </TabsTrigger>
        </TabsList>
    </Tabs>
);

// Componente de conteúdo
const ContentComponent = ({ title, component }) => (
    <TabsContent value="none">
        <Card className="bg-gray-900 text-white border-none shadow-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {component}
            </CardContent>
        </Card>
    </TabsContent>
);