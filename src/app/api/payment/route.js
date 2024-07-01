'use server'
import { cookies } from 'next/headers'
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from "next/server";
import 'dotenv/config'


export async function POST(request) {
    try {
        const { id, value } = await request.json();

        const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN });


        const response = await preference.create({
            body: {
                items: [
                    {
                        title: `Moedas Vip's`,
                        quantity: value,
                        unit_price: value / 1000
                    }
                ],
                back_urls: {
                    "success": "http://localhost:3000/payment/sucess",
                    /*  "failure": "http://localhost:8080/payment/sucess",
                     "pending": "http://localhost:8080/feedback" */
                },
                auto_return: "approved",
            }
        });

        console.log(response.id);
        const jsonData = {
            id: id,
            time: time
        }
        const fiftyMinutesInMilliseconds = 50 * 60 * 1000;
        const expires = new Date(Date.now() + fiftyMinutesInMilliseconds);

        cookies().set('infoProduct', JSON.stringify(jsonData), { expires });
        return NextResponse.json(response.id);

    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        return NextResponse.json({ success: false, error: 'Erro interno do servidor.' }, { status: 500 });
    }
}

