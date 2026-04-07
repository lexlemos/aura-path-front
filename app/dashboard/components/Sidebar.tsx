import {
  BrainCircuit,
  Users,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  MessageCircle,
  Plus,
} from "lucide-react";

const navItems = [
  { icon: Users, label: "Casos Clínicos", active: true },
  { icon: Stethoscope, label: "Diagnósticos" },
  { icon: ClipboardList, label: "Planos de Tratamento" },
  { icon: FlaskConical, label: "Exames" },
  { icon: MessageCircle, label: "Chat da Equipe" },
];

export function Sidebar() {
  return (
    <aside className="w-52 flex-shrink-0 bg-[#163254] flex flex-col min-h-screen text-white">
      {/* Header com branding */}
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

      {/* Itens de navegação */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left
              ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/55 hover:bg-white/5 hover:text-white/80"
              }
            `}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Botão Nova Consulta */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nova Consulta
        </button>
      </div>
    </aside>
  );
}
