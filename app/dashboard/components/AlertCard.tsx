import { AlertTriangle } from "lucide-react";
import type { PatientData } from "../types";

const DRUG_ALERTS: Array<{
  drugName: string;
  symptomKeywords: string[];
  title: string;
  message: (drug: string, symptom: string) => string;
}> = [
  {
    drugName: "Lisinopril",
    symptomKeywords: ["tosse", "tosse seca"],
    title: "Potencial Evento Iatrogênico Detectado",
    message: (drug, symptom) =>
      `O ${drug} pode estar causando a ${symptom} relatada. Revisão clínica recomendada.`,
  },
  {
    drugName: "Ibuprofeno",
    symptomKeywords: ["estômago", "estomago", "náusea", "gástrica", "gastrite"],
    title: "Risco Gastrointestinal Identificado",
    message: (drug, symptom) =>
      `${drug} pode estar associado a ${symptom}. Considerar protetor gástrico.`,
  },
  {
    drugName: "Metformina",
    symptomKeywords: ["náusea", "diarreia", "vômito", "enjoo"],
    title: "Intolerância Gastrointestinal Detectada",
    message: (drug, symptom) =>
      `${drug} pode estar causando ${symptom}. Considerar formulação de liberação prolongada.`,
  },
];

function findAlert(patient: PatientData) {
  for (const rule of DRUG_ALERTS) {
    const med = patient.medications.find((m) =>
      m.name.toLowerCase().includes(rule.drugName.toLowerCase()),
    );
    if (!med) continue;
    const symptom = patient.symptoms.find((s) =>
      rule.symptomKeywords.some((kw) => s.toLowerCase().includes(kw)),
    );
    if (symptom) {
      return { title: rule.title, message: rule.message(med.name, symptom) };
    }
  }
  return null;
}

export function AlertCard({ patient }: { patient: PatientData }) {
  const alert = findAlert(patient);
  if (!alert) return null;

  return (
    <div className="flex items-center gap-4 bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-xl p-4 mb-5">
      <div className="w-10 h-10 bg-[#7C3AED]/15 rounded-lg flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-5 h-5 text-[#7C3AED]" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[#4C1D95]">{alert.title}</p>
        <p className="text-xs text-[#6D28D9] mt-0.5 leading-relaxed">
          {alert.message}
        </p>
      </div>
      <button className="flex-shrink-0 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
        Revisar Evidências
      </button>
    </div>
  );
}
