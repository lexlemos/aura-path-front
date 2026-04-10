"use client";

import { useState } from "react";
import { PatientCard } from "./PatientCard";
import { XAIReasoningPath } from "./XAIReasoningPath";
import { AlertCard } from "./AlertCard";
import { ActionButtons } from "./ActionButtons";
import { INITIAL_PATIENT } from "../types";
import type { PatientData } from "../types";

export function DashboardClient() {
  const [patient, setPatient] = useState<PatientData>(INITIAL_PATIENT);

  return (
    <>
      <AlertCard patient={patient} />

      <div className="flex gap-5">
        <PatientCard initialData={patient} onSave={setPatient} />
        <XAIReasoningPath patient={patient} />
      </div>

      <ActionButtons />
    </>
  );
}
