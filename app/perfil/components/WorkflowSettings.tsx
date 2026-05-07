"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const sliderLabels = ["CONCISO", "PADRÃO", "DETALHADO", "PESQUISA"];

const instruments = [
  { label: "Lab de Patologia X1" },
  { label: "Suite de RM 4" },
];

export function WorkflowSettings() {
  const [xaiDepth, setXaiDepth] = useState([75]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [summaryEnabled, setSummaryEnabled] = useState(false);
  const [connectedInstruments, setConnectedInstruments] = useState(instruments);

  const removeInstrument = (label: string) => {
    setConnectedInstruments((prev) => prev.filter((i) => i.label !== label));
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Cabeçalho da seção */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Personalização do Fluxo de Trabalho
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Configure como a IA interage com seu fluxo de diagnóstico.
          </p>
        </div>
        <Button variant="outline" size="sm" className="flex-shrink-0 ml-4">
          Restaurar Padrões
        </Button>
      </div>

      {/* Slider XAI */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-800">
            Profundidade da Explicação XAI
          </p>
          <span className="text-[10px] font-bold text-[#163254] uppercase tracking-wider">
            Pesquisa Avançada
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Nível de detalhes técnicos nos blocos de raciocínio diagnóstico.
        </p>
        <Slider
          value={xaiDepth}
          onValueChange={setXaiDepth}
          min={0}
          max={100}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between mt-2">
          {sliderLabels.map((label) => (
            <span
              key={label}
              className="text-[10px] text-gray-400 uppercase tracking-wider"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Notificações de Alerta FDA */}
        <Card className="rounded-2xl border border-gray-200 shadow-none">
          <CardContent className="px-4 py-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                Notificações de Alerta da FDA
              </p>
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
                className="flex-shrink-0 data-[state=checked]:bg-teal-500"
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Receba alertas de substituição imediata para tratamentos com novas
              contraindicações da FDA.
            </p>
          </CardContent>
        </Card>

        {/* Resumo Automático */}
        <Card className="rounded-2xl border border-gray-200 shadow-none">
          <CardContent className="px-4 py-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                Resumo Automático
              </p>
              <Switch
                checked={summaryEnabled}
                onCheckedChange={setSummaryEnabled}
                className="flex-shrink-0 data-[state=checked]:bg-teal-500"
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Permite que a IA elabore rascunhos iniciais de resumos clínicos a
              partir de gravações de consultas.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Instrumentos Conectados */}
      <div className="mt-6">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Instrumentos Conectados
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {connectedInstruments.map(({ label }) => (
            <Badge
              key={label}
              variant="secondary"
              className="bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5 h-auto"
            >
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
              {label}
              <button
                onClick={() => removeInstrument(label)}
                className="ml-0.5 text-teal-400 hover:text-teal-700 transition-colors"
                aria-label={`Remover ${label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-7 text-xs px-3 gap-1"
          >
            <Plus className="w-3 h-3" />
            Adicionar Instrumento
          </Button>
        </div>
      </div>
    </div>
  );
}
