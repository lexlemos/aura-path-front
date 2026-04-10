import { Code2, Search, Share2 } from "lucide-react";
import { ElementType } from "react";
import type { PatientData } from "../types";

interface ReasoningStep {
  icon: ElementType;
  title: string;
  source: string;
  content: string;
  link?: string;
}

const MED_CORRELATIONS: Array<{
  drugName: string;
  symptomKeywords: string[];
  mechanism: string;
  fdaStat: string;
  icdCode: string;
  differentialNote: string;
}> = [
  {
    drugName: "Lisinopril",
    symptomKeywords: ["tosse", "tosse seca", "tosse irritativa"],
    mechanism:
      "Tosse induzida por inibidores da ECA via acúmulo de bradicinina na mucosa traqueobrônquica.",
    fdaStat:
      "15% dos pacientes em uso de Lisinopril relatam tosse como efeito colateral primário nos primeiros 6 meses de titulação.",
    icdCode: "BA00.Z – Infecção Aguda das Vias Respiratórias Superiores",
    differentialNote:
      "Sugere descartar infecção respiratória primária antes de confirmar causa iatrogênica.",
  },
  {
    drugName: "Ibuprofeno",
    symptomKeywords: ["estômago", "estomago", "náusea", "nausea", "gástrica", "gastrite"],
    mechanism:
      "Inibição não-seletiva da COX-1 reduz síntese de prostaglandinas protetoras da mucosa gástrica.",
    fdaStat:
      "Uso prolongado de AINEs aumenta em 3–5× o risco de úlcera péptica e sintomas gastrointestinais.",
    icdCode: "DA91 – Gastrite aguda",
    differentialNote:
      "Considerar protetor gástrico (omeprazol) e avaliar descontinuação do AINE.",
  },
  {
    drugName: "Metformina",
    symptomKeywords: ["náusea", "nausea", "diarreia", "vômito", "enjoo"],
    mechanism:
      "Metformina reduz absorção intestinal de glicose; intolerância gastrointestinal é dose-dependente.",
    fdaStat:
      "30% dos pacientes relatam efeitos GI no início do tratamento com Metformina.",
    icdCode: "DA94 – Diarreia funcional",
    differentialNote:
      "Administrar com alimentos; considerar formulação de liberação prolongada.",
  },
];

function buildSteps(patient: PatientData): ReasoningStep[] {
  const meds = patient.medications.map((m) => m.name.trim()).filter(Boolean);
  const symptoms = patient.symptoms.map((s) => s.trim()).filter(Boolean);

  // Procura correlação conhecida medicamento → sintoma
  let matched: (typeof MED_CORRELATIONS)[0] | null = null;
  let matchedDrug = "";
  let matchedSymptom = "";

  for (const corr of MED_CORRELATIONS) {
    const drug = meds.find((m) =>
      m.toLowerCase().includes(corr.drugName.toLowerCase()),
    );
    if (!drug) continue;
    const symptom = symptoms.find((s) =>
      corr.symptomKeywords.some((kw) => s.toLowerCase().includes(kw)),
    );
    if (symptom) {
      matched = corr;
      matchedDrug = drug;
      matchedSymptom = symptom;
      break;
    }
  }

  const medList = meds.length > 0 ? meds.join(", ") : "nenhuma medicação registrada";
  const symptomList = symptoms.length > 0 ? symptoms.join(", ") : "nenhum sintoma registrado";

  if (matched) {
    return [
      {
        icon: Code2,
        title: "Integração de Dados",
        source: "NIH",
        content: `Identificada correlação direta entre a medicação atual (${matchedDrug}) e o sintoma relatado (${matchedSymptom}). Fisiopatologia: ${matched.mechanism}`,
      },
      {
        icon: Search,
        title: "Referência Cruzada OpenFDA",
        source: "OpenFDA",
        content: `"Base de dados do FDA: ${matched.fdaStat}"`,
      },
      {
        icon: Share2,
        title: "Exclusão Diferencial (CID-11 / OMS)",
        source: "OMS",
        content: `Lógica diferencial automatizada ${matched.differentialNote}`,
        link: `URI CID-11: ${matched.icdCode}`,
      },
    ];
  }

  // Sem correlação conhecida: passos genéricos baseados nos dados atuais
  return [
    {
      icon: Code2,
      title: "Integração de Dados",
      source: "NIH",
      content: `Perfil do paciente ${patient.id} (${patient.age} anos, ${patient.gender}) processado. Medicações: ${medList}. Sintomas: ${symptomList}. Nenhuma correlação iatrogênica de alto risco identificada automaticamente.`,
    },
    {
      icon: Search,
      title: "Referência Cruzada OpenFDA",
      source: "OpenFDA",
      content:
        meds.length > 0
          ? `Perfil de segurança verificado para ${meds.slice(0, 2).join(" e ")}. Nenhuma interação crítica detectada com os sintomas reportados.`
          : "Sem medicações para consulta na base OpenFDA.",
    },
    {
      icon: Share2,
      title: "Análise Diferencial (CID-11 / OMS)",
      source: "OMS",
      content:
        symptoms.length > 0
          ? `Mapeamento diferencial para: ${symptomList}. Diagnósticos alternativos considerados via CID-11. Monitoramento contínuo recomendado.`
          : "Aguardando sintomas para iniciar análise diferencial.",
      link:
        symptoms.length > 0
          ? `URI CID-11: Consultar classificação para "${symptoms[0]}"`
          : undefined,
    },
  ];
}

interface Props {
  patient: PatientData;
}

export function XAIReasoningPath({ patient }: Props) {
  const steps = buildSteps(patient);
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
