import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Warning, Backspace } from "@phosphor-icons/react";

const colors = {
    'Moderador': 'text-green-500',
    'Administrador': 'text-rose-600',
    'Coordenador': 'text-orange-300',
    'Gerente': 'text-orange-500',
    'Diretor': 'text-orange-600',
    'Fundador': 'text-red-700',
    'Desenvolvedor': 'text-orange-700'
};

export function ShowStaffs({ type }) {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [staffInfo, setStaffInfo] = useState([]);
    const { toast } = useToast();

    const formSchema = z.object({
        about: z.string().max(30),
        warns: z.number().int()
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            about: "",
            warns: 1
        },
    });

    async function removeWarn(data) {
        setLoading(true)
        try {
            const { warns, about } = data;
            const endpoint = '/api/staffs/remove-warn'

            const body = {
                value: warns,
                staff: staffInfo[0],
                staffID: staffInfo[1],
            };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                const res2 = await fetch(`/api/staffs/get-staffs/${type}`);
                const dataStaffs = await res2.json();
                setStaffs(dataStaffs);
                setLoading(false); toast({
                    title: "Aviso removido com sucesso!",
                    description: "O aviso do administrador foi removido com sucesso!"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }
        } catch (error) {
            console.error('Erro ao registrar aviso:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao registrar aviso. Tente novamente mais tarde."
            });
        }
    }
    async function newWarn(data) {
        setLoading(true)
        try {
            const { warns, about } = data;
            const endpoint = '/api/staffs/new-warn';

            const body = {
                value: warns,
                staff: staffInfo[0],
                staffID: staffInfo[1],
                about: about
            };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                const res2 = await fetch(`/api/staffs/get-staffs/${type}`);
                const dataStaffs = await res2.json();
                setStaffs(dataStaffs);
                setLoading(false); toast({
                    title: "Aviso registrado com sucesso!",
                    description: "O aviso ao administrador foi enviado com sucesso!"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }
        } catch (error) {
            console.error('Erro ao registrar aviso:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao registrar aviso. Tente novamente mais tarde."
            });
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/staffs/get-staffs/${type}`);
                const data = await res.json();
                setStaffs(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar staffs:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    if (loading) {
        return <Skeleton className="w-[300px] h-[200px] rounded-md" />;
    }
    if (staffs === []) {
        return <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-2xl font-bold">Nenhum administrador encontrado</p>
        </div>
    }
    const filteredStaffs = staffs.filter(staff => !["VrauZ", "MaluKo_Free", "zeet", "Zeet"].includes(staff.nick));

    return (
        <>
            {filteredStaffs.map((staff, i) => (
                <div className="flex flex-col w-full p-4 mb-4 bg-gray-900 rounded-md text-white" key={i}>
                    <div className="flex flex-row items-center">
                        <div className="w-32 h-32 overflow-hidden flex items-center justify-center">
                            <img
                                src={`https://assets.open.mp/assets/images/skins/${staff.User.skinID}.png`}
                                alt="Avatar"
                                className="object-cover w-24 h-24 rounded-md bg-gray-800"
                                style={{ marginTop: '-20%', objectPosition: 'center top' }}
                            />
                        </div>
                        <div className="flex flex-col justify-center ml-4 space-y-2">
                            <h1 className="text-lg font-semibold">Nome: <span>{staff.nick}</span></h1>
                            <p className="font-semibold">Cargo: <span className={colors[staff.cargo]}>{staff.cargo}</span></p>
                            <p className="font-semibold">Função:  <span className="text-rose-500">{staff.funcao}</span></p>
                            <p className="font-semibold">Avisos:  <span className="text-yellow-500">{staff.warns}</span></p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 bg-gray-950 p-2 rounded-md shadow-md space-y-3">
                        <h2 className="text-md font-semibold">Avisos Administrativos:</h2>

                        {staff.Warns.length > 0 ? (
                            staff.Warns.map((warn, j) => (
                                <div key={j} className="flex flex-col bg-gray-900 p-2 rounded-md mt-2">
                                    <p className="font-semibold">Motivo: {warn.reason}</p>
                                    <p className="font-semibold">Aplicado por: {warn.issuedBy}</p>
                                    <p className="font-semibold">Data: {new Date(warn.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="font-semibold text-gray-500">Nenhum aviso encontrado.</p>
                        )}

                        <div className="space-x-5">
                            <Dialog onOpenChange={(open) => open && setStaffInfo([staff.nick, staff.id])}>
                                <DialogTrigger className="bg-yellow-600 font-bold p-3 rounded-md">
                                    <div className="flex flex-row space-x-2">
                                        <Warning size={32} weight="bold" /> Novo Aviso
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-yellow-600">Novo aviso Administrativo</DialogTitle>
                                        <DialogDescription>
                                            <p>Digite a quantidade de avisos que deseja adicionar</p>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="sm:w-auto">
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(newWarn)} className="space-y-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="warns"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Informe a quantidade que deseja:</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder=""
                                                                        className="bg-gray-900 rounded-md"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="about"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Motivo:</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="" className="bg-gray-900 rounded-md" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogClose asChild>
                                                        <Button type="submit" className="bg-green-600 hover:bg-green-400 rounded-lg shadow-md">
                                                            Adicionar
                                                        </Button>
                                                    </DialogClose>
                                                </form>
                                            </Form>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Dialog onOpenChange={(open) => open && setStaffInfo([staff.nick, staff.id])}>
                                <DialogTrigger className="bg-green-500 font-bold p-3 rounded-md">
                                    <div className="flex flex-row space-x-2">
                                        <Backspace size={32} weight="bold" /> Remover Aviso
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-950 p-4 rounded-md shadow-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-green-500">Remover aviso Administrativo</DialogTitle>
                                        <DialogDescription>
                                            <p>Digite a quantidade de avisos que deseja remover</p>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="sm:w-auto">
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(removeWarn)} className="space-y-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="value"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="value">Informe a quantidade que deseja:</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder=""
                                                                        className="bg-gray-900 rounded-md"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogClose asChild>
                                                        <Button type="submit" className="bg-green-600 hover:bg-green-400 rounded-lg shadow-md">
                                                            Remover
                                                        </Button>
                                                    </DialogClose>
                                                </form>
                                            </Form>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
