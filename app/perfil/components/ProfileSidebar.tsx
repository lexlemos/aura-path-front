import {
  BrainCircuit,
  Users,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  MessageCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { icon: BrainCircuit, label: "Inteligência Clínica" },
  { icon: Users, label: "Casos Clínicos" },
  { icon: Stethoscope, label: "Diagnósticos" },
  { icon: ClipboardList, label: "Planos de Tratamento" },
  { icon: FlaskConical, label: "Laboratórios" },
  { icon: MessageCircle, label: "Chat da Equipe" },
];

export function ProfileSidebar() {
  return (
    <aside className="w-52 flex-shrink-0 bg-[#163254] flex flex-col min-h-screen text-white">
      {/* Contexto operacional */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10">
        <p className="text-sm font-semibold text-teal-300 leading-tight">
          Ops Clínicas
        </p>
        <p className="text-[10px] text-white/40 leading-tight mt-0.5">
          Hospital Geral v2.4
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-white/55 hover:bg-white/5 hover:text-white/80 rounded-lg px-3 py-2.5 h-auto text-sm"
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
          </Button>
        ))}
      </nav>

      {/* Footer: Suporte + Sair */}
      <div className="p-3">
        <Separator className="bg-white/10 mb-3" />
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-white/55 hover:bg-white/5 hover:text-white/80 rounded-lg px-3 py-2.5 h-auto text-sm mb-0.5"
        >
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span>Suporte</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-white/55 hover:bg-white/5 hover:text-white/80 rounded-lg px-3 py-2.5 h-auto text-sm"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
}
