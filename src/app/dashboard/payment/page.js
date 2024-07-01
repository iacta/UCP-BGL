'use client';

import { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export default function Payment() {
    useEffect(() => {
        initMercadoPago('TEST-f547d93f-3fe0-4fa8-9cb6-2d7e20bafe6e', { locale: 'pt-BR' });
    }, []);

    return (
        <div className=''>
            <Wallet initialization={{ preferenceId: '460186326-f4b47606-ad5c-48c8-93fa-f91dc3cef242' }} customization={{ texts: { valueProp: 'smart_option' } }} />
        </div>
    );
};
