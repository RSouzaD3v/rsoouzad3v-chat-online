import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(req: Request) {
    const url = new URL(req.url);
    
    // Obtendo senderId e receiverId da query string
    const senderId = Number(url.searchParams.get('senderId')); // Convertendo para Number
    const receiverId = Number(url.searchParams.get('receiverId')); // Convertendo para Number

    // Verificando se os IDs são válidos
    if (!senderId || !receiverId) {
        return NextResponse.json({ error: "Sender ID ou Receiver ID inválido" }, { status: 400 });
    };

    const room = await db.chatRoom.findFirst({
        where: {
            OR: [
                {name: `${senderId}-${receiverId}`},
                {name: `${receiverId}-${senderId}`}
            ]
        }
    })

    try {
        // Buscar todas as mensagens entre o usuário atual e o outro usuário
        const messages = await db.message.findMany({
            where: {
                roomId: room?.id || 0
            }
        });

        return NextResponse.json({ messages: messages }, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        return NextResponse.json({ error: "Erro ao buscar mensagens" }, { status: 500 });
    }
}
