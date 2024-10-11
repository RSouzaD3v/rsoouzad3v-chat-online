'use client'
import Image from "next/image";
import logowh from "@/assets/logo-white.png";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const router = useRouter();

    const createUser = async (e: FormEvent) => {
        e.preventDefault();

        if(!email || !password || !username) {
            alert("Precisa ser preenchido");
            return
        };

        try{
            const res = fetch("/api/login/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username })
            });

            console.log(res);
            router.push("sign-in");
        } catch (e) {
            console.log(e);
        };
    }

    return (
        <div className="w-full h-screen bg-blue-500 flex items-center justify-center flex-col">
            <form method="POST" className="bg-black text-white rounded-md p-6 flex items-center flex-col shadow-black shadow-md">
                <Image width={100} src={logowh} alt="logo" />
                <h1 className="font-bold text-xl my-2">Criando sua conta</h1>
                <div className="my-2">
                    <p>Username<b className="text-red-500">*</b></p>
                    <input onChange={(e) => setUsername(e.target.value)} className="bg-gray-400/20 p-2 rounded-sm" type="email" name="email" placeholder="Digite seu email..."/>
                </div>
                <div className="my-2">
                    <p>Email<b className="text-red-500">*</b></p>
                    <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-400/20 p-2 rounded-sm" type="email" name="email" placeholder="Digite seu email..."/>
                </div>
                <div className="my-2"> 
                    <p>Senha<b className="text-red-500">*</b></p>
                    <input onChange={(e) => setPassword(e.target.value)} className="bg-gray-400/20 p-2 rounded-sm" type="password" name="password" placeholder="Digite sua senha..."/>
                </div>

                <button onClick={createUser} className="p-1 rounded-sm text-white bg-blue-500" type="submit">Entrar</button>

                <hr className="w-full my-3 border border-white/20"/>

                <div className="flex flex-wrap items-center gap-1">
                    <h5 className="text-[15px]">Já tenho uma conta</h5>
                    <a className="text-blue-500" href="sign-in">Entrar na conta</a>
                </div>
            </form>
        </div>
    );
};

export default SignIn;