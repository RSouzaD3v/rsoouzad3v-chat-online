'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Siderbar from '@/components/Siderbar';

interface UserAuth {
    id: string;
    data: {id: string, token: string}; // Inclua outros campos se necessário
}

const Chat = () => {
    const [user, setUser] = useState<UserAuth | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedData = localStorage.getItem("user_auth");

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

    const handleLogout = () => {
        localStorage.removeItem("user_auth"); // Remove os dados do usuário do localStorage
        router.push("sign-in"); // Redireciona para a página de login
    };

    return (
        <div className='flex items-center justify-center'>
            <Siderbar />
            
            <main className='bg-red-500 w-full h-screen p-10'>
                
            </main>

        </div>
    );
};

export default Chat;
