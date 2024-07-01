'use server'
import { cookies } from 'next/headers'
const bcrypt = require('bcrypt');

export async function GiveCodigo() {
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('infoProduct')
    if (hasCookie) {
        const info = cookieStore.get('infoProduct')
        console.log(info)
        const data = JSON.parse(info.value);
        console.log(data);
        console.log('teste')
        const genCod =  `ATIVAR-${data.id}-${data.time}`
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(genCod, salt);
        return hash;
    } else{
        console.log("teste")
        return ""
    }
}