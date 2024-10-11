'use client'
import Image from "next/image";
import logowh from "@/assets/logo-white.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPass, setShowPass] = useState<string>("password");

    const router = useRouter();

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(!email || !password) {
            alert("Precisa ser preenchido");
            return
        };

        try{
            const res = await fetch("/api/login/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const result = await res.json();
            const resultJson = JSON.stringify(result);

            if (res.ok) {
                localStorage.setItem('user_auth', resultJson);
                
                router.push('/chat');
            } else {
                alert('Login falhou');
            }

            console.log(res);
        } catch (e) {
            console.log(e);
        };
    }

    const showPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newPasswordType = showPass === "password" ? "text" : "password";
        setShowPass(newPasswordType);
    };

    return (
        <div className="w-full h-screen bg-blue-500 flex items-center justify-center flex-col">
            <form method="POST" className="bg-black text-white rounded-md p-6 flex items-center flex-col shadow-black shadow-md">
                <Image width={100} src={logowh} alt="logo" />
                <h1 className="font-bold text-xl my-2">Faça Login</h1>
                <div className="my-2">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-400/20 p-2 rounded-sm" type="email" name="email" placeholder="Digite seu email..."/>
                </div>
                <div className="my-2"> 
                    <div className="flex items-center justify-between">
                        <p>Senha</p>
                        <button onClick={showPassword} className="text-[12px] opacity-65 hover:opacity-100">{showPass === "password" ? "Mostrar Senha" : "Ocultar Senha"}</button>
                    </div>

                    <input onChange={(e) => setPassword(e.target.value)}  className="bg-gray-400/20 p-2 rounded-sm" type={showPass} name="password" placeholder="Digite sua senha..."/>
                </div>

                <button onClick={login} className="p-1 rounded-sm text-white bg-blue-500" type="submit">Entrar</button>

                <hr className="w-full my-3 border border-white/20"/>

                <div className="flex flex-wrap items-center gap-1">
                    <h5 className="text-[15px]">Não tenho uma conta.</h5>
                    <a className="text-blue-500" href="sign-up">Criar conta</a>
                </div>

                <a className="text-red-500" href="">Esqueci a senha</a>
            </form>
        </div>
    );
};

export default SignIn;