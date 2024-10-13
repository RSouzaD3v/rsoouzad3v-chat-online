'use client'
import { useEffect, useState } from "react";

type Contato = {
    id: number;
    ownerId: number;
    name: string;
    status: string;
    userOwner: string;
};

const Sidebar = () => {
    const [contatos, setContatos] = useState<Contato[]>([]);
    const [loading, setLoading] = useState("Carregando...");

    const user = localStorage.getItem('user_auth');
    const parserUser = JSON.parse(user as string);

    useEffect(() => {
        const loadingContacts = async () => {
            try {
                const response = await fetch(`/api/contacts?userId=${parserUser.data.id}`);
                const fetchedContatos = await response.json();

                if (fetchedContatos.length > 0) {
                    setContatos(fetchedContatos);
                    setLoading(""); // Limpa a mensagem de carregamento
                } else {
                    setLoading("Não tem nenhum contato registrado!");
                }
            } catch (error) {
                console.error("Erro ao carregar contatos: ", error);
                setLoading("Erro ao carregar os contatos.");
            }
        };

        loadingContacts();
    }, [parserUser.data.id]);

    return (
        <div className="fixed w-[500px] p-5 h-screen bg-black text-white overflow-x-hidden overflow-y-auto">
            <div>
                <input className="w-full p-2 text-black h-[30px] rounded-md" type="search" name="search" placeholder="Procurar"/>
            </div>

            {loading ? (
                <p>{loading}</p> // Exibe o estado de carregamento ou mensagem de erro
            ) : (
                <div>
                    {contatos.map((contato) => (
                        <a  key={contato.id} href={`chat/${contato.id}`}>
                            <div className="flex items-center bg-blue-500 gap-2 p-5 rounded-lg my-1">
                                <div className="bg-red-500 text-white flex items-center justify-center p-5 rounded-full w-[20px] h-[20px]">
                                    {contato.name[0]} {/* Mostra a primeira letra do nome do contato */}
                                </div>
                                <div>
                                    <h1>{contato.name}</h1>
                                    <h2>{contato.status}</h2> {/* Mostra o status do contato */}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
