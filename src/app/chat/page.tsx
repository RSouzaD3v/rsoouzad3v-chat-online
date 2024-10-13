'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserAuth {
    id: string;
    data: {id: string, token: string}; // Inclua outros campos se necessário
}

const Chat = () => {
    const [user, setUser] = useState<UserAuth | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('user_auth') : null;
        const storedData = user ? JSON.parse(user) : null;

        // Verifica se os dados estão disponíveis e tenta analisar
        if (storedData) {
            try {
                const parsedData: UserAuth = JSON.parse(storedData);
                setUser(parsedData); // Armazena os dados do usuário no estado
            } catch (error) {
                console.error("Erro ao analisar dados do usuário:", error);
                localStorage.removeItem("user_auth"); // Limpa o localStorage se houver erro
                router.push("sign-in");
            }
        } else {
            router.push("sign-in");
        }
    }, [router]);

    // Se o usuário não estiver autenticado, você pode mostrar um carregamento ou nada
    if (!user) {
        return <div>Carregando...</div>;
    }
};

export default Chat;
