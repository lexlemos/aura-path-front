import { AlertTriangle } from "lucide-react";

export function AlertCard() {
  return (
    <div className="flex items-center gap-4 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-5">
      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-orange-900">
          Potencial Evento Iatrogênico Detectado
        </p>
        <p className="text-xs text-orange-700 mt-0.5 leading-relaxed">
          O Lisinopril pode estar causando a Tosse Seca relatada. Revisão
          clínica recomendada.
        </p>
      </div>
      <button className="flex-shrink-0 bg-[#163254] hover:bg-[#1e3d68] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
        Revisar Evidências
      </button>
    </div>
  );
}
