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

    const loader = async () => {
        setLoading(true);
        await fetchData(activeTab);
    };

    useEffect(() => {
        loader();
    }, [activeTab]);

    const handleTabChange = (value) => {
        if (value !== activeTab) {
            setActiveTab(value);
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
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-[400px]">
                        <TabsList className="p-2 bg-gray-900 text-white">
                            <TabsTrigger value="none" className="cursor-pointer">
                                Denúncias em Aberto
                            </TabsTrigger>
                            <TabsTrigger value="yes" className="cursor-pointer">
                                Denúncias Resolvidas
                            </TabsTrigger>
                            <TabsTrigger value="revisions" className="cursor-pointer">
                                Revisões
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="none">
                            <ContentComponent title="Denúncias em Aberto" component={<DenunciasList denuncias={denuncias} loader={loader} />} />
                        </TabsContent>
                        <TabsContent value="yes">
                            <ContentComponent title="Denúncias Resolvidas" component={<DenunciasResolvedList denuncias={denuncias} />} />
                        </TabsContent>
                        <TabsContent value="revisions">
                        </TabsContent>
                    </Tabs>
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

// Componente de conteúdo
const ContentComponent = ({ title, component }) => (
    <Card className="bg-gray-900 text-white border-none shadow-lg">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            {component}
        </CardContent>
    </Card>
)
