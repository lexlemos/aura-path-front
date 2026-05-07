import Image from "next/image";
import Link from "next/link";
import { Bell, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navTabs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Fila de Pacientes", href: "/dashboard" },
  { label: "Biblioteca de Pesquisa", href: "/dashboard" },
];

export function ProfileTopNav() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0">
      {/* Esquerda: Logo + Tabs */}
      <div className="flex items-center gap-8">
        <Link href="/dashboard">
          <Image
            src="/assets/logo_horizontal.png"
            alt="Aura Path"
            width={1671}
            height={940}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6 h-14">
          {navTabs.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="h-full flex items-center text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors px-0.5"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Direita: busca + ícones */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-400 min-w-52">
          <Search className="w-4 h-4 flex-shrink-0" />
          <span>Buscar CID-11 / ID do Paciente</span>
        </div>
        <Button variant="ghost" size="icon-sm" className="text-gray-400">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="text-gray-400">
          <Settings className="w-5 h-5" />
        </Button>
        <Avatar size="sm">
          <AvatarFallback className="bg-[#163254] text-white text-xs font-semibold">
            CS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
