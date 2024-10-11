import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try{
        const { username, email, password } = await req.json();

        const user = await db.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
        }

        const passwordIsMatch = await bcrypt.compare(password, user.password);

        if (!passwordIsMatch) {
            return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, "SECRET", { expiresIn: '1h' });

        return NextResponse.json({message: "Login Bem Sucessedido!", data: {token: token, id: user.id}});
    } catch(e) {
        return NextResponse.json({ error: "Ocorreu um erro no login.", details: e }, { status: 500 });
    }
};