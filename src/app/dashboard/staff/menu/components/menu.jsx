'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShowStaffs } from "./stafflist";

export function MenuStaff() {
    return (
        <Card className="bg-gray-950 text-white">
            <CardHeader>
                <CardTitle>Menu Administrativo</CardTitle>
                <CardDescription className="font-semibold">Gerencie a equipe administrativa aqui.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <Tabs defaultValue="admins" className="w-full">
                    <TabsList className="bg-transparent flex justify-center mb-4">
                        <TabsTrigger value="admins">Administradores</TabsTrigger>
                        <TabsTrigger value="helpers">Helpers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="admins" className="w-full">
                        <ShowStaffs type="staff" />
                    </TabsContent>
                    <TabsContent value="helpers">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
}
