import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { content, senderId, receiverId } = await req.json();

        if (!content || !senderId || !receiverId) {
            return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
        }

        const chatRoom = await db.chatRoom.findFirst({
            where: {
                OR: [
                    { name: `${senderId}-${receiverId}` },
                    { name: `${receiverId}-${senderId}` }
                ]
            }
        });

        if (!chatRoom) {
            const createRoom = await db.chatRoom.create({
                data: {
                    name: `${senderId}-${receiverId}`
                }
            });

            console.log(createRoom);
        }

        // Criar uma nova mensagem no banco de dados
        const newMessage = await db.message.create({
            data: {
                content,
                senderId,
                roomId: chatRoom?.id as number,
            },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
    }
}
