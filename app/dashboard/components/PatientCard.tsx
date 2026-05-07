"use client";

import { useState } from "react";
import { Pencil, Check, X, Plus, Trash2, GitBranch } from "lucide-react";
import type { PatientData, Medication } from "../types";

const STATUS_STYLES: Record<string, string> = {
  Estável: "bg-green-100 text-green-700",
  Crítico: "bg-red-100 text-red-700",
  Moderado: "bg-yellow-100 text-yellow-700",
  "Em Observação": "bg-[#7C3AED]/10 text-[#6D28D9]",
};

interface Props {
  initialData: PatientData;
  onSave: (data: PatientData) => void;
  onDecision?: () => void;
}

export function PatientCard({ initialData, onSave, onDecision }: Props) {
  const [draft, setDraft] = useState<PatientData>(initialData);
  const [editing, setEditing] = useState(false);
  const [newSymptom, setNewSymptom] = useState("");

  function startEdit() {
    setDraft({
      ...initialData,
      symptoms: [...initialData.symptoms],
      medications: initialData.medications.map((m) => ({ ...m })),
    });
    setEditing(true);
  }

  function save() {
    onSave(draft);
    setEditing(false);
    setNewSymptom("");
  }

  function cancel() {
    setEditing(false);
    setNewSymptom("");
  }

  function addSymptom() {
    const trimmed = newSymptom.trim();
    if (!trimmed) return;
    setDraft((d) => ({ ...d, symptoms: [...d.symptoms, trimmed] }));
    setNewSymptom("");
  }

  function removeSymptom(i: number) {
    setDraft((d) => ({
      ...d,
      symptoms: d.symptoms.filter((_, idx) => idx !== i),
    }));
  }

  function updateMed(i: number, field: keyof Medication, value: string) {
    setDraft((d) => ({
      ...d,
      medications: d.medications.map((m, idx) =>
        idx === i ? { ...m, [field]: value } : m,
      ),
    }));
  }

  function removeMed(i: number) {
    setDraft((d) => ({
      ...d,
      medications: d.medications.filter((_, idx) => idx !== i),
    }));
  }

  function addMed() {
    setDraft((d) => ({
      ...d,
      medications: [...d.medications, { name: "", form: "", frequency: "" }],
    }));
  }

  const d = editing ? draft : initialData;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 w-96 h-full overflow-y-auto">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        {editing ? (
          <input
            className="text-lg font-bold text-gray-900 border-b-2 border-[#7C3AED] outline-none bg-transparent w-40"
            value={draft.id}
            onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
          />
        ) : (
          <h2 className="text-lg font-bold text-gray-900">{initialData.id}</h2>
        )}

        <div className="flex items-center gap-2">
          {editing ? (
            <select
              className={`text-[11px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide border-0 outline-none cursor-pointer max-w-[120px] ${STATUS_STYLES[draft.status] ?? "bg-gray-100 text-gray-700"}`}
              value={draft.status}
              onChange={(e) =>
                setDraft((d) => ({ ...d, status: e.target.value }))
              }
            >
              {Object.keys(STATUS_STYLES).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${STATUS_STYLES[initialData.status] ?? "bg-gray-100 text-gray-700"}`}
            >
              {initialData.status}
            </span>
          )}

          {editing ? (
            <button
              onClick={cancel}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Cancelar edição"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={startEdit}
              className="p-1 text-gray-300 hover:text-[#7C3AED] transition-colors"
              title="Editar"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Informações básicas */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
            Idade
          </p>
          {editing ? (
            <input
              className="text-sm font-semibold text-gray-900 border-b-2 border-[#7C3AED]/40 outline-none bg-transparent w-full focus:border-[#7C3AED] transition-colors"
              value={draft.age}
              onChange={(e) => setDraft((d) => ({ ...d, age: e.target.value }))}
            />
          ) : (
            <p className="text-sm font-semibold text-gray-900">
              {initialData.age}
            </p>
          )}
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
            Gênero
          </p>
          {editing ? (
            <select
              className="text-sm font-semibold text-gray-900 border-b-2 border-[#7C3AED]/40 outline-none bg-transparent w-full focus:border-[#7C3AED] transition-colors"
              value={draft.gender}
              onChange={(e) =>
                setDraft((d) => ({ ...d, gender: e.target.value }))
              }
            >
              {["Masculino", "Feminino", "Outro"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm font-semibold text-gray-900">
              {initialData.gender}
            </p>
          )}
        </div>
      </div>

      {/* Sintomas */}
      <div className="mb-5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Sintomas
        </p>
        <div className="flex flex-wrap gap-2">
          {d.symptoms.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-xs font-medium text-[#7C3AED] bg-[#7C3AED]/5 border border-[#7C3AED]/25 px-2.5 py-1 rounded-full"
            >
              {s}
              {editing && (
                <button
                  onClick={() => removeSymptom(i)}
                  className="ml-0.5 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>
        {editing && (
          <div className="flex items-center gap-2 mt-2.5 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
            <input
              className="flex-1 text-xs outline-none bg-transparent placeholder:text-gray-300 text-gray-700"
              placeholder="Adicionar sintoma..."
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSymptom()}
            />
            <button
              onClick={addSymptom}
              className="text-[#7C3AED]/40 hover:text-[#7C3AED] transition-colors flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Medicações Ativas */}
      <div className="mb-5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Medicações Ativas
        </p>
        <div className="space-y-2">
          {d.medications.map((med, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg border ${editing ? "border-gray-200" : "border-gray-100"}`}
            >
              <div className="w-7 h-7 bg-[#7C3AED]/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">
                💊
              </div>
              <div className="flex-1 min-w-0">
                {editing ? (
                  <>
                    <input
                      className="text-xs font-semibold text-gray-900 border-b border-[#7C3AED]/30 outline-none bg-transparent w-full mb-1 focus:border-[#7C3AED] transition-colors pb-0.5"
                      value={med.name}
                      onChange={(e) => updateMed(i, "name", e.target.value)}
                      placeholder="Nome do medicamento"
                    />
                    <input
                      className="text-[10px] text-gray-400 border-b border-gray-200 outline-none bg-transparent w-full pb-0.5"
                      value={med.form}
                      onChange={(e) => updateMed(i, "form", e.target.value)}
                      placeholder="Forma / dose"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-gray-900">
                      {med.name}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {med.form}
                    </p>
                  </>
                )}
              </div>
              <div className="flex-shrink-0 text-right">
                {editing ? (
                  <div className="flex flex-col items-end gap-1.5">
                    <input
                      className="text-[10px] text-gray-500 border-b border-gray-200 outline-none bg-transparent text-right w-24 pb-0.5"
                      value={med.frequency}
                      onChange={(e) =>
                        updateMed(i, "frequency", e.target.value)
                      }
                      placeholder="Frequência"
                    />
                    <button
                      onClick={() => removeMed(i)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[10px] text-gray-400 leading-tight">
                    {med.frequency}
                  </p>
                )}
              </div>
            </div>
          ))}
          {editing && (
            <button
              onClick={addMed}
              className="w-full flex items-center justify-center gap-1.5 text-xs text-[#7C3AED]/50 hover:text-[#7C3AED] border border-dashed border-[#7C3AED]/25 hover:border-[#7C3AED]/50 rounded-lg py-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar medicação
            </button>
          )}
        </div>
      </div>

      {/* Sinais Vitais */}
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
          Sinais Vitais
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
            {editing ? (
              <input
                className="text-xl font-bold text-gray-900 border-b-2 border-[#7C3AED]/40 outline-none bg-transparent text-center w-full focus:border-[#7C3AED] transition-colors"
                value={draft.bp}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, bp: e.target.value }))
                }
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">
                {initialData.bp}
              </p>
            )}
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
              PA MMHG
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
            {editing ? (
              <input
                className="text-xl font-bold text-gray-900 border-b-2 border-[#7C3AED]/40 outline-none bg-transparent text-center w-full focus:border-[#7C3AED] transition-colors"
                value={draft.pulse}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, pulse: e.target.value }))
                }
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">
                {initialData.pulse}
              </p>
            )}
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
              PULSO BPM
            </p>
          </div>
        </div>
      </div>

      {editing && (
        <div className="mt-5 flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={cancel}
            className="flex-1 text-sm text-gray-500 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={save}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2.5 rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
            Salvar
          </button>
        </div>
      )}

      {/* Botão de Decisão */}
      {!editing && onDecision && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={onDecision}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2.5 rounded-lg transition-colors shadow-sm shadow-[#7C3AED]/30"
          >
            <GitBranch className="w-4 h-4" />
            Ver Árvore de Decisão
          </button>
        </div>
      )}
    </div>
  );
}
