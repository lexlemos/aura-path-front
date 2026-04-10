"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { PatientCard } from "./PatientCard";
import { XAIReasoningPath } from "./XAIReasoningPath";
import { AlertCard } from "./AlertCard";
import { INITIAL_PATIENT } from "../types";
import type { PatientData } from "../types";

export function DashboardClient() {
  const [patient, setPatient] = useState<PatientData>(INITIAL_PATIENT);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <AlertCard patient={patient} />

      {/* Wrapper externo: o botão toggle fica aqui fora do overflow-hidden */}
      <div className="relative">
        {/* Botão toggle grudado na borda direita, fora do clipping */}
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          className="absolute top-1/2 -translate-y-1/2 -right-px z-30 flex flex-col items-center gap-1 bg-white border border-r-0 border-gray-200 shadow-md rounded-l-xl px-1.5 py-3 text-gray-500 hover:text-[#163254] transition-colors"
          title={drawerOpen ? "Recolher painel do paciente" : "Expandir painel do paciente"}
        >
          <User className="w-3.5 h-3.5" />
          <span className="text-[9px] font-medium uppercase tracking-wide [writing-mode:vertical-rl] rotate-180">
            Paciente
          </span>
          {drawerOpen ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>

        {/* Container com overflow-hidden para clicar drawer */}
        <div className="relative overflow-hidden rounded-xl">
          {/* XAI ocupa 100% da largura */}
          <XAIReasoningPath patient={patient} />

          {/* Backdrop semitransparente ao abrir */}
          {drawerOpen && (
            <div
              className="absolute inset-0 z-10 bg-black/10 cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            />
          )}

          {/* Drawer do PatientCard — desliza da direita, por cima do XAI */}
          <div
            className={`absolute top-0 right-0 h-full z-20 overflow-y-auto transition-transform duration-300 ease-in-out bg-white border-l border-gray-200 shadow-2xl ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <PatientCard initialData={patient} onSave={setPatient} />
          </div>
        </div>
      </div>
    </div>
  );
}
