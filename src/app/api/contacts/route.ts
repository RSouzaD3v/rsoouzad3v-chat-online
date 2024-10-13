import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
    
  // Obtendo senderId e receiverId da query string
  const userLogado = Number(url.searchParams.get('userId')); // Convertendo para Number
  const userLogadoStr = userLogado?.toString();

  try {
    const contatos = await db.contacts.findMany({
      where: {
        userOwner: userLogadoStr // Você pode obter o ID do usuário logado aqui
      }
    });

    return NextResponse.json(contatos);
  } catch (error) {
    console.error("Erro ao carregar contatos: ", error);
    return NextResponse.json({message: "Erro ao carregar contatos"});
  }
}
