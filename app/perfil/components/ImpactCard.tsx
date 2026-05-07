import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function ImpactCard() {
  return (
    <Card className="mt-6 bg-[#163254] text-white border-0 shadow-lg rounded-2xl overflow-hidden relative">
      {/* Ícone decorativo de fundo */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <Activity className="w-24 h-24 text-teal-300 translate-x-4 translate-y-4" />
      </div>

      <CardContent className="px-5 pt-1 pb-5 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-teal-300 flex-shrink-0" />
          <p className="text-sm font-semibold text-white">
            Impacto na Plataforma
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider leading-tight mb-0.5">
              Insights de XAI Gerados
            </p>
            <p className="text-2xl font-bold text-white">1.2k</p>
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider leading-tight mb-0.5">
              Tempo Salvo
            </p>
            <p className="text-2xl font-bold text-white">84h</p>
          </div>
        </div>

        <p className="text-[11px] text-white/50 leading-relaxed">
          Top 5% de contribuidor de precisão clínica na unidade Ala Norte neste
          trimestre.
        </p>
      </CardContent>
    </Card>
  );
}
