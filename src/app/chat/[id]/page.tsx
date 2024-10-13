'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Params {
  id: string;
}

interface ChatProps {
  params: Params;
}

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
}

const ChatId = ({ params }: ChatProps) => {
  const { id } = params; // O id do outro usuário
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState("Carregando...");

  const router = useRouter();

  // Recupera os dados do usuário logado uma vez no início
  const storedData: string | null = typeof window !== "undefined" ? localStorage.getItem("user_auth") : null;
  const pStData = storedData ? JSON.parse(storedData) : null;

  // Se o usuário não estiver autenticado, redireciona para a página de login
  useEffect(() => {
    if (!storedData) {
      router.push('/sign-in');
    }
  }, [storedData, router]);

  // Pega o id do usuário logado
  const idLogado = pStData?.data.id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?senderId=${idLogado}&receiverId=${id}`);
        const fetchedMessages = await response.json();
        console.log(fetchedMessages.messages);

        setMessages(fetchedMessages.messages);
        setLoading(""); // Limpa a mensagem de carregamento
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
        setLoading("Erro ao carregar as mensagens.");
      }
    };

    if (idLogado) {
      fetchMessages();
    }
  }, [id, idLogado]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("/api/chat/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          senderId: idLogado,
          receiverId: id,
        }),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setNewMessage(""); // Limpa o campo de input
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-[1000px] h-screen bg-gray-900"></div>

      <main className="flex flex-col w-full">
        <h1>Chat com usuário {id}</h1>
        <div className="flex flex-col gap-2 bg-white p-5 rounded-lg overflow-y-auto h-[80vh]">
          {messages?.length === 0 && loading}

          {messages?.length > 0 && messages.map((item) => (
            <div
              key={item.id}
              className={`flex ${item.senderId === idLogado ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  item.senderId === idLogado ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p>{item.content}</p>
                <p>{item.createdAt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-2">
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
          />
          <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatId;
