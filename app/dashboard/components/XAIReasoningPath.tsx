import { Code2, Search, Share2 } from "lucide-react";
import { ElementType } from "react";

interface ReasoningStep {
  icon: ElementType;
  title: string;
  source: string;
  content: string;
  link?: string;
}

const steps: ReasoningStep[] = [
  {
    icon: Code2,
    title: "Integração de Dados",
    source: "NIH",
    content:
      "Identificada correlação direta entre a medicação atual (Lisinopril) e o novo sintoma relatado (Tosse Seca). Fisiopatologia: Tosse induzida por inibidores da ECA via acúmulo de bradicinina.",
  },
  {
    icon: Search,
    title: "Referência Cruzada OpenFDA",
    source: "OpenFDA",
    content:
      '"Base de dados do FDA: 15% dos pacientes em uso de Lisinopril relatam este sintoma como efeito colateral primário nos primeiros 6 meses de titulação."',
  },
  {
    icon: Share2,
    title: "Exclusão Diferencial (CID-11 / OMS)",
    source: "OMS",
    content:
      "Lógica diferencial automatizada sugere descartar infecção respiratória primária antes de confirmar causa iatrogênica.",
    link: "URI CID-11: BA00.Z (Infecção Aguda das Vias Respiratórias Superiores)",
  },
];

export function XAIReasoningPath() {
  return (
    <div className="flex-1">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">
          XAI: Raciocínio do Caminho Diagnóstico
        </h2>
        {/* Representação visual do grafo */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-gray-300" />
          <div className="absolute inset-2 rounded-full border-[1.5px] border-[#163254]/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#163254] rounded-full opacity-80" />
          </div>
        </div>
      </div>

      {/* Passos */}
      <div className="flex flex-col gap-0">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-4">
              {/* Ícone + linha conectora */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 bg-[#163254] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 min-h-4 bg-gray-200 my-1" />
                )}
              </div>

              {/* Card de conteúdo */}
              <div
                className={`flex-1 bg-white border border-gray-200 rounded-xl p-4 ${
                  index < steps.length - 1 ? "mb-3" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                    {step.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">
                    Fonte: {step.source}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.content}
                </p>
                {step.link && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-[#163254] hover:underline cursor-pointer">
                    <span>↗</span>
                    <span>{step.link}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
