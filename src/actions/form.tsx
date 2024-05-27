'use server'

import { z } from 'zod';

export async function subscribeNewsletter(prevState: any, formData: FormData) {

    const rawFormData = {
        email: formData.get('email'),
        "groups":["121248322928247905"]
    }

    const resData = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`
        },
        body: JSON.stringify(rawFormData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.errors) {
            return data;
        }else{
            data.success = 'Thank you for subscribing! 🎉';
            return data;
        }
    })
    .catch((error) => console.error(error))
    console.log(resData);

    return resData;
}
