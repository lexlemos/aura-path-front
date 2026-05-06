"use client";

import { useState } from "react";
import { PatientCard } from "./PatientCard";
import { XAIReasoningPath } from "./XAIReasoningPath";
import { INITIAL_PATIENT } from "../types";
import type { PatientData } from "../types";

export function DashboardClient() {
  const [patient, setPatient] = useState<PatientData>(INITIAL_PATIENT);
  const [triggerKey, setTriggerKey] = useState(0);

  function handleDecision() {
    setTriggerKey((k) => k + 1);
  }

  return (
    <div className="flex gap-6 h-full min-h-0">
      {/* Container principal para a árvore de decisão */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <XAIReasoningPath
          key={triggerKey}
          patient={patient}
          autoPlay={triggerKey > 0}
        />
      </div>

      {/* Barra lateral fixa para informações do paciente */}
      <div className="w-[380px] flex-shrink-0 flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <PatientCard
            initialData={patient}
            onSave={setPatient}
            onDecision={handleDecision}
          />
        </div>
      </div>
    </div>
  );
}
