import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
//import { getPlayers } from "@/app/api/util/players";
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { NextResponse } from 'next/server';
export function CardPlayers() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function fetchPlayers() {
            const response = await fetch('/api/players');
            let responsef = NextResponse.next()
            const data = responsef.cookies.get('players')

            if (data.error) {
                console.error('Error fetching players:', data.error);
                return;
            }

            setPlayers(data);
        }

        fetchPlayers();
    }, []);

    if (!players.length) {
        return <h1>Carregando...</h1>;
    }


    return (
        <div className="flex justify-end">
            <Card className="w-full max-w-md p-4 m-4 bg-gray-800 text-white">
                <CardHeader>
                    <CardTitle>Veja quem está on-line</CardTitle>
                    <CardDescription>IP: ip.brasilgamerlife.com.br:7777</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-64">
                        <Table>
                            <TableCaption>Lista de jogadores online</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>NICK</TableHead>
                                    <TableHead>SCORE</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.map((player, index) => (
                                    <TableRow key={index} className="">
                                        <TableCell className="">{player.id}</TableCell>
                                        <TableCell className="">{player.name}</TableCell>
                                        <TableCell className="">{player.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>


                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <p>Total de Jogadores ON-LINE: {players.length}</p>
                </CardFooter>
            </Card>
        </div>
    );
}
