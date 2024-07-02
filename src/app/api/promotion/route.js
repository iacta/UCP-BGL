'use server';

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request) {
    const { title, description, price, expire } = await request.json();

    const promo = await prisma.promotion.findUnique({
        where: { title: title },
    });

    if (promo) {
        return NextResponse.json({ message: 'Promoção já existente' }, { status: 401 });
    } else {
        const [datePart, timePart] = expire.split(' - ');
        const [day, month, year] = datePart.split('/');
        
        const [hours, minutes] = timePart.split(':'); 
        
        const expirationString = `${year}-${month}-${day} ${hours}:${minutes}:00`; 
        const expirationDate = new Date(expirationString);   
        const date = moment(expirationDate).format('DD.MM.YYYY');
     
        const newPromo = await prisma.promotion.create({
            data: {
                title: title,
                description: description,
                price: price,
                expiresAt: ''
            }
        });

        console.log(newPromo);
        await prisma.$disconnect()
        return NextResponse.json({ message: 'Sucesso!' }, { status: 200 });
    }
}
