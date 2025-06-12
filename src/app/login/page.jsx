'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setIsError(true);
                setMessage(data.error || 'Error al iniciar sesión.');
                return;
            }

            // LOGIN: Success
            setMessage('Inicio de sesión exitoso. Redirigiendo...');
            setIsError(false);

            // JSON Web Token (JWT)
            // --

            setTimeout(() => {
                router.push('/'); // Redirige a la página de inicio
            })
        }
    }
}