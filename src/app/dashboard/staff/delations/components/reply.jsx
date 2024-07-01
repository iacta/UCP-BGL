'use client';
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ReplyReport({ delationId, k }) {
    const { toast } = useToast();
    const formSchema = z.object({
        reply: z.string().max(100),
        veredit: z.string({
            required_error: "Por favor selecione uma opção.",
        })
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reply: "",
        },
    });

    async function onSubmit(data) {
        try {
            const { reply, veredit } = data;

            const res = await fetch('/api/staffs/reply-delation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: delationId,
                    vereditDesc: reply,
                    veredit: veredit
                })
            });
            k(false);
            if (res.status === 200) {
                toast({
                    title: "Denúncia respondida com sucesso!",
                    description: "A denúncia foi registrada e enviada! Você deve realizar as punições cabiveis agora!"
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Algo deu errado!",
                    description: "Tente novamente"
                });
            }

        } catch (error) {
            console.error('Erro ao enviar denúncia:', error);
            toast({
                variant: "destructive",
                title: "Oops! Algo deu errado!",
                description: "Erro ao enviar denúncia. Tente novamente mais tarde."
            });
        }
    }
    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="reply"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resposta</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Descreva o veredito"
                                        className="resize-none bg-gray-900 rounded-md"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Antes de emitir o veredito final, analise atentamente as provas para evitar qualquer injustiça.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="veredit"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Veredito</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} className="">
                                    <FormControl>
                                        <SelectTrigger className="bg-gray-900">
                                            <SelectValue placeholder="Selecione um veredito" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-900 text-white">
                                        <SelectItem value="approved" className="focus:bg-green-500 focus:text-white">Aprovada</SelectItem>
                                        <SelectItem value="recused" className="focus:bg-red-500 focus:text-white">Recusada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-gray-900 hover:bg-gray-700 rounded-lg shadow-md">
                        Enviar</Button>
                </form>
            </Form>
        </div>
    );
}