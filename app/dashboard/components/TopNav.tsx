import Image from "next/image";
import Link from "next/link";
import { Bell, Settings, Search } from "lucide-react";

const navTabs = ["Dashboard", "Fila de Pacientes", "Biblioteca de Pesquisa"];

export function TopNav() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0">
      {/* Esquerda: Logo + Tabs */}
      <div className="flex items-center gap-8">
        <Image
          src="/assets/logo_horizontal.png"
          alt="Aura Path"
          width={1671}
          height={940}
          className="h-16 w-auto object-contain"
          priority
        />
        <nav className="flex items-center gap-6 h-14">
          {navTabs.map((tab) => (
            <button
              key={tab}
              className={`h-full text-sm border-b-2 transition-colors px-0.5 ${tab === "Dashboard"
                ? "border-[#7C3AED] text-[#7C3AED] font-semibold"
                : "border-transparent text-gray-500 hover:text-[#7C3AED] hover:border-[#7C3AED]/30"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Direita: busca + ícones */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-400 min-w-52">
          <Search className="w-4 h-4 flex-shrink-0" />
          <span>Buscar CID-11 / ID do Paciente</span>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <Link
          href="/perfil"
          className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center text-white text-xs font-semibold hover:bg-[#6D28D9] transition-colors"
          title="Meu Perfil"
        >
          CS
        </Link>
      </div>
    </header>
  );
}
