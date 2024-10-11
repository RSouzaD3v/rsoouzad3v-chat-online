import Image from "next/image";
import logowh from "@/assets/logo-white.png";

const Header = () => {
    return (
        <header className="bg-black flex items-center justify-between p-2 fixed top-0 left-0 w-full">
            <div>
                <Image width={100} src={logowh} alt="Logo"/>
            </div>

            <nav>
                <ul className="flex items-center justify-center gap-5">
                    <li className="list-none"><a className="text-white text-xl hover:text-blue-500" href="">Saiba Mais</a></li>
                    <li className="list-none"><a className="text-white text-xl hover:text-blue-500" href="">Desenvolvedor</a></li>
                    <li className="list-none"><a className="text-white text-xl hover:text-blue-500" href="">Contatos</a></li>
                </ul>
            </nav>

            <div className="flex items-center gap-2">
                <li className="list-none"><a className="text-white text-xl bg-blue-500 hover:bg-blue-700 p-2 rounded-md" href="sign-in">Login</a></li>
                <li className="list-none"><a className="text-white text-xl bg-blue-500 hover:bg-blue-700 p-2 rounded-md" href="sign-up">Criar Conta</a></li>
            </div>
        </header>
    );
}

export default Header;