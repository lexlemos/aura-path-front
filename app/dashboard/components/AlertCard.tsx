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
    <div className="flex items-center gap-4 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-5">
      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-orange-900">{alert.title}</p>
        <p className="text-xs text-orange-700 mt-0.5 leading-relaxed">
          {alert.message}
        </p>
      </div>
      <button className="flex-shrink-0 bg-[#163254] hover:bg-[#1e3d68] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
        Revisar Evidências
      </button>
    </div>
  );
}
