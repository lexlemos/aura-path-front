import { Link2 } from "lucide-react";

const medications = [
  {
    name: "Lisinopril",
    form: "Comprimido Oral 20mg",
    frequency: "Diário (Manhã)",
  },
  {
    name: "Ibuprofeno",
    form: "400mg Se necessário",
    frequency: "Se necessário",
  },
];

export function PatientCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 w-72 flex-shrink-0 self-start">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">PT-88294-M</h2>
        <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full uppercase tracking-wide">
          Estável
        </span>
      </div>

      {/* Informações básicas */}
      <div className="flex gap-8 mb-5">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
            Idade
          </p>
          <p className="text-sm font-semibold text-gray-900">58</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
            Gênero
          </p>
          <p className="text-sm font-semibold text-gray-900">Masculino</p>
        </div>
      </div>

      {/* Sintomas */}
      <div className="mb-5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Sintomas
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-[#9B1C2C] bg-red-50 border border-[#9B1C2C]/25 px-2.5 py-1 rounded-full">
            Cefaleia Grave
            <span className="font-bold ml-0.5">!</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-[#163254] bg-blue-50 border border-[#163254]/25 px-2.5 py-1 rounded-full">
            Tosse Seca
            <Link2 className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Medicações Ativas */}
      <div className="mb-5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Medicações Ativas
        </p>
        <div className="space-y-2">
          {medications.map((med) => (
            <div
              key={med.name}
              className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="w-7 h-7 bg-[#163254]/10 rounded-md flex items-center justify-center flex-shrink-0 text-sm">
                💊
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900">
                  {med.name}
                </p>
                <p className="text-[10px] text-gray-400 truncate">{med.form}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] text-gray-400 leading-tight">
                  {med.frequency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sinais Vitais */}
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Sinais Vitais
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
            <p className="text-xl font-bold text-gray-900">134/88</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
              PA MMHG
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
            <p className="text-xl font-bold text-gray-900">72</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
              PULSO BPM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
