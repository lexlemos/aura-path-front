import { Check } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="flex items-center justify-end gap-3 px-5 py-4">
      <button className="text-sm text-gray-600 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
        Descartar (Suposição incorreta da IA)
      </button>
      <button className="flex items-center gap-2 text-sm font-medium bg-[#163254] hover:bg-[#1e3d68] text-white px-5 py-2.5 rounded-lg transition-colors">
        <Check className="w-4 h-4" />
        Confirmar e Ajustar Prescrição
      </button>
    </div>
  );
}
