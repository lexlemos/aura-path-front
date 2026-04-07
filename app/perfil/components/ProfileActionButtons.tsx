import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ProfileActionButtons() {
  return (
    <div>
      <Separator className="mb-4" />
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-gray-400">
          © 2024 Aura Path Clinical Systems. Todas as sugestões de diagnóstico
          requerem verificação humana.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button variant="ghost" size="sm" className="text-gray-600">
            Descartar Alterações
          </Button>
          <Button
            size="sm"
            className="bg-[#163254] hover:bg-[#1e3d68] text-white px-5"
          >
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Rodapé legal */}
      <div className="flex items-center justify-end gap-4 mt-3">
        <button className="text-[11px] text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors">
          Protocolo de Privacidade
        </button>
        <button className="text-[11px] text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors">
          Status do Sistema
        </button>
        <button className="text-[11px] text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors">
          Termos de Uso
        </button>
      </div>
    </div>
  );
}
