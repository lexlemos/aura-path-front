"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  Users,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  MessageCircle,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: BrainCircuit, label: "Inteligência Clínica", href: "/dashboard" },
  { icon: Users, label: "Casos Clínicos", href: "/dashboard" },
  { icon: Stethoscope, label: "Diagnósticos", href: "/dashboard" },
  { icon: ClipboardList, label: "Planos de Tratamento", href: "/dashboard" },
  { icon: FlaskConical, label: "Laboratórios", href: "/dashboard" },
  { icon: MessageCircle, label: "Chat da Equipe", href: "/dashboard" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isPerfil = pathname.startsWith("/perfil");

  return (
    <aside className="w-52 flex-shrink-0 bg-[#163254] flex flex-col h-screen text-white">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <BrainCircuit className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-300 leading-tight">
              Inteligência Clínica
            </p>
            <p className="text-[9px] text-white/40 uppercase tracking-wider leading-tight mt-0.5">
              Estrutura de Cuidado de Precisão
            </p>
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive =
            href === "/dashboard" &&
            isDashboard &&
            label === "Inteligência Clínica";

          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/55 hover:bg-white/5 hover:text-white/80",
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Perfil + footer */}
      <div className="p-3">
        <div className="mb-3">
          <Link
            href="/dashboard"
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 text-white text-sm font-medium rounded-lg transition-colors",
              isDashboard ? "bg-teal-700" : "bg-teal-600 hover:bg-teal-700",
            )}
          >
            <Plus className="w-4 h-4" />
            Nova Consulta
          </Link>
        </div>

        <Separator className="bg-white/10 mb-3" />

        {/* Link para perfil */}
        <Link
          href="/perfil"
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5",
            isPerfil
              ? "bg-white/10 text-white font-medium"
              : "text-white/55 hover:bg-white/5 hover:text-white/80",
          )}
        >
          <Avatar size="sm" className="w-5 h-5 flex-shrink-0">
            <AvatarFallback className="bg-teal-600 text-white text-[9px] font-bold w-5 h-5">
              CS
            </AvatarFallback>
          </Avatar>
          <span>Meu Perfil</span>
          {isPerfil && (
            <span className="ml-auto w-1.5 h-1.5 bg-teal-400 rounded-full" />
          )}
        </Link>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/55 hover:bg-white/5 hover:text-white/80 transition-colors mb-0.5">
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span>Suporte</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/55 hover:bg-white/5 hover:text-white/80 transition-colors">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
