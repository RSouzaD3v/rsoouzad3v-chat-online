import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="w-full h-screen flex items-center justify-center flex-col">
        <div className="text-center">
          <h1 className="text-[36px] font-bold">Preocupado com sua privacidade em redes onlines ?</h1>
          <p className="text-[20px]"><b className="text-blue-700">RsouzaD3v Chat Online</b>, está a disposição para te dar total liberdade e privacidade!</p>
        </div>

        <div className="flex items-center gap-1 mt-5">
          <li className="list-none"><a className="text-white text-xl bg-blue-500 hover:bg-blue-700 p-2 rounded-md" href="">Login</a></li>
          <li className="list-none"><a className="text-white text-xl bg-blue-500 hover:bg-blue-700 p-2 rounded-md" href="">Criar Conta</a></li>
        </div>
      </main>
    </div>
  );
}
