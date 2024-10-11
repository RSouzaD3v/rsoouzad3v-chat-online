import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { username, email, password } = await req.json();

    const existingUserByEmail = await db.user.findFirst({ where: { email: email } });
    const existingUserByUsername = await db.user.findFirst({ where: { username: username } });

    if (existingUserByEmail || existingUserByUsername) {
        return NextResponse.json({error: 500, message: "Usuário já criado com esse email!"});
    };

    async function encryptPassword(pass: string) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(pass, salt);
            return hash;
        } catch (e) {
            console.log(e);
        }
    };

    const hashedPassword = await encryptPassword(password).then(hash => {
        return hash
    }).catch(err => {
        console.log("Erro ao criptografar a senha", err);
    });

    if (username && email && password) {
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword?.toString() || ""
            }
        });
        
            
        return NextResponse.json({error: false, message: "Usúario criado com sucesso!", user: newUser});
    }
};