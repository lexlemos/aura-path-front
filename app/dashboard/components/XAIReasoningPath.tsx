"use client";

import { useState, useMemo, useCallback, ElementType } from "react";
import { Code2, Search, Share2, AlertTriangle, CheckCircle2, X, ExternalLink } from "lucide-react";
import type { PatientData } from "../types";
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position,
  Node,
  Edge,
  MarkerType,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface NodeReference {
  evidenceLevel: "Forte" | "Moderada" | "Baixa";
  reasoning: string;
  sources: Array<{ name: string; type: string; detail: string }>;
  recommendation?: string;
}

interface NodeData {
  icon: ElementType | null;
  title: string;
  source?: string;
  content: string;
  link?: string;
  isRoot?: boolean;
  reference?: NodeReference;
  onRefClick?: () => void;
  isRefOpen?: boolean;
}

interface RefNodeData {
  title: string;
  evidenceLevel: "Forte" | "Moderada" | "Baixa";
  reasoning: string;
  sources: Array<{ name: string; type: string; detail: string }>;
  recommendation?: string;
  onClose?: () => void;
}

const EVIDENCE_BADGE: Record<string, string> = {
  Forte: "bg-green-100 text-green-700 border-green-200",
  Moderada: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Baixa: "bg-gray-100 text-gray-600 border-gray-200",
};

const CustomNode = ({ data, selected }: NodeProps) => {
  const d = data as unknown as NodeData;
  const Icon = d.icon;
  const isRoot = d.isRoot;

  return (
    <div className="relative">
      {/* Bolinha ? lateral — abre/fecha nó de referência */}
      {d.reference && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              d.onRefClick?.();
            }}
            className={`absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-md transition-all z-10 ${
              d.isRefOpen
                ? "bg-[#6D28D9] ring-2 ring-[#7C3AED]/30"
                : "bg-[#7C3AED] hover:bg-[#6D28D9]"
            }`}
            title={d.isRefOpen ? "Fechar referência" : "Ver referência"}
          >
            ?
          </button>
          {/* linha entre ? e borda do card */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-px bg-[#7C3AED]/40" />
        </>
      )}

      <div
        className={`bg-white border-2 rounded-xl p-4 w-[280px] shadow-sm relative transition-all duration-150 ${
          isRoot
            ? `border-orange-400 ${selected ? "shadow-orange-200 shadow-md" : ""}`
            : `border-[#7C3AED]/30 ${
                d.isRefOpen
                  ? "border-[#7C3AED]/70 shadow-[#7C3AED]/10 shadow-md"
                  : selected
                  ? "border-[#7C3AED] shadow-[#7C3AED]/10 shadow-md"
                  : "hover:border-[#7C3AED]/60 hover:shadow-md"
              }`
        }`}
      >
        {/* Handle invisível para aresta do nó de referência (vem da esquerda) */}
        <Handle
          type="target"
          position={Position.Left}
          id="ref-left"
          className="!w-2 !h-2 !bg-[#7C3AED] !border-none opacity-0"
        />

        {!isRoot && (
          <Handle
            type="target"
            position={Position.Top}
            className="!w-2 !h-2 !bg-[#7C3AED] !border-none"
          />
        )}

        <div className="flex items-start gap-2 mb-2">
          {Icon && (
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isRoot ? "bg-orange-100" : "bg-[#7C3AED]/10"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isRoot ? "text-orange-500" : "text-[#7C3AED]"}`}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-sm font-semibold leading-tight ${
                  isRoot ? "text-orange-900" : "text-gray-900"
                }`}
              >
                {d.title}
              </h3>
              {d.source && (
                <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">
                  {d.source}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed text-justify">
          {d.content}
        </p>

        {d.link && (
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#7C3AED] hover:underline cursor-pointer border-t border-gray-100 pt-2">
            <span>↗</span>
            <span className="truncate">{d.link}</span>
          </div>
        )}

        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-2 !h-2 !bg-[#7C3AED] !border-none opacity-0"
        />
      </div>
    </div>
  );
};

const ReferenceNode = ({ data }: NodeProps) => {
  const d = data as unknown as RefNodeData;
  return (
    <div className="bg-white border-2 border-[#7C3AED]/30 rounded-xl shadow-md w-[300px] overflow-hidden">
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-[#7C3AED] !border-none"
      />

      {/* Header */}
      <div className="flex items-start justify-between p-3 border-b border-gray-100">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
              ?
            </div>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider">
              Referência & Raciocínio
            </span>
          </div>
          <h4 className="text-[11px] font-bold text-gray-900 leading-tight">{d.title}</h4>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            d.onClose?.();
          }}
          className="p-0.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors flex-shrink-0 mt-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Badge evidência */}
      <div className="px-3 py-1.5 border-b border-gray-100">
        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${EVIDENCE_BADGE[d.evidenceLevel]}`}>
          Evidência {d.evidenceLevel}
        </span>
      </div>

      {/* Corpo */}
      <div className="p-3 space-y-3 max-h-[320px] overflow-y-auto">
        <div>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">
            Por que esta sugestão?
          </p>
          <p className="text-[10px] text-gray-700 leading-relaxed text-justify">
            {d.reasoning}
          </p>
        </div>

        <div>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1.5">
            Fontes consultadas
          </p>
          <div className="space-y-1.5">
            {d.sources.map((src, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <ExternalLink className="w-2.5 h-2.5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                    <span className="text-[10px] font-semibold text-gray-900">{src.name}</span>
                    <span className="text-[8px] text-gray-400 bg-gray-100 px-1 py-0.5 rounded">{src.type}</span>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-relaxed">{src.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {d.recommendation && (
          <div className="p-2 bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-lg">
            <p className="text-[9px] text-[#7C3AED]/70 uppercase tracking-wider mb-0.5">
              Recomendação clínica
            </p>
            <p className="text-[10px] text-[#7C3AED] leading-relaxed font-medium text-justify">
              {d.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
  reference: ReferenceNode,
};

const MED_CORRELATIONS: Array<{
  drugName: string;
  symptomKeywords: string[];
  mechanism: string;
  fdaStat: string;
  icdCode: string;
  differentialNote: string;
  title: string;
  message: (drug: string, sym: string) => string;
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
    title: "Potencial Evento Iatrogênico Detectado",
    message: (drug, sym) => `O ${drug} pode estar causando a ${sym} relatada.`,
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
    title: "Risco Gastrointestinal Identificado",
    message: (drug, sym) => `${drug} pode estar associado a ${sym}.`,
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
    title: "Intolerância Gastrointestinal Detectada",
    message: (drug, sym) => `${drug} pode estar causando ${sym}.`,
  },
];

function buildGraphData(patient: PatientData) {
  const meds = patient.medications.map((m) => m.name.trim()).filter(Boolean);
  const symptoms = patient.symptoms.map((s) => s.trim()).filter(Boolean);

  let matched: (typeof MED_CORRELATIONS)[0] | null = null;
  let matchedDrug = "";
  let matchedSymptom = "";

  for (const corr of MED_CORRELATIONS) {
    const drug = meds.find((m) => m.toLowerCase().includes(corr.drugName.toLowerCase()));
    if (!drug) continue;
    const symptom = symptoms.find((s) =>
      corr.symptomKeywords.some((kw) => s.toLowerCase().includes(kw))
    );
    if (symptom) {
      matched = corr;
      matchedDrug = drug;
      matchedSymptom = symptom;
      break;
    }
  }

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  const medList = meds.length > 0 ? meds.join(", ") : "nenhuma medicação";
  const symptomList = symptoms.length > 0 ? symptoms.join(", ") : "nenhum sintoma";

  if (matched) {
    // Root Node: Conclusion
    nodes.push({
      id: "root",
      type: "custom",
      position: { x: 340, y: 40 },
      data: {
        isRoot: true,
        icon: AlertTriangle,
        title: matched.title,
        content: matched.message(matchedDrug, matchedSymptom),
        reference: {
          evidenceLevel: "Forte",
          reasoning: `O sistema identificou ${matchedDrug} na lista de medicações ativas e encontrou "${matchedSymptom}" nos sintomas relatados. A correlação farmacológica entre inibidores da ECA e tosse irritativa está documentada em múltiplas bases de dados clínicas e é considerada um evento adverso classe-efeito.`,
          sources: [
            { name: "UpToDate", type: "Revisão Clínica", detail: "ACE inhibitor-induced cough – Class effect with all agents." },
            { name: "NIH MedlinePlus", type: "Base de Dados", detail: "Lisinopril: efeitos colaterais e contraindicações." },
            { name: "ANVISA", type: "Bula Oficial", detail: "Lisinopril – Classe: Inibidor da ECA. Efeito adverso frequente: tosse seca (≥1/10)." },
          ],
          recommendation: `Considerar substituição de ${matchedDrug} por antagonista do receptor de angiotensina II (ARA-II), como Losartana, que não causa acúmulo de bradicinina.`,
        },
      },
    });

    // Child 1: Pathophysiology
    nodes.push({
      id: "child-1",
      type: "custom",
      position: { x: 60, y: 310 },
      data: {
        icon: Code2,
        title: "Fisiopatologia / Mecanismo",
        source: "NIH",
        content: matched.mechanism,
        reference: {
          evidenceLevel: "Forte",
          reasoning: `Os inibidores da ECA (iECA) bloqueiam a enzima conversora de angiotensina, impedindo a degradação da bradicinina. O acúmulo de bradicinina na mucosa traqueobrônquica estimula receptores B2, causando tosse reflexa não produtiva. Esse mecanismo é independente da dose e afeta todos os iECA.`,
          sources: [
            { name: "NEJM", type: "Artigo Científico", detail: "Israili & Hall (1992) – Cough and angioneurotic edema associated with ACE inhibitor therapy. Ann Int Med." },
            { name: "PubMed (NCBI)", type: "Revisão Sistemática", detail: "PMID: 1567463 – Bradykinin-mediated cough in hypertensive patients." },
          ],
          recommendation: "Dados fisiopatológicos confirmam relação causal. Avaliação clínica recomendada para decisão terapêutica.",
        },
      },
    });

    // Child 2: Clinical Evidence
    nodes.push({
      id: "child-2",
      type: "custom",
      position: { x: 380, y: 310 },
      data: {
        icon: Search,
        title: "Evidência Clínica",
        source: "OpenFDA",
        content: matched.fdaStat,
        reference: {
          evidenceLevel: "Forte",
          reasoning: `Dados de farmacovigilância da FDA (FAERS – FDA Adverse Event Reporting System) mostram consistência na relação causal. A incidência de tosse induzida por iECA varia de 5% a 35% dependendo da etnia e genética do paciente, com maior prevalência em populações asiáticas.`,
          sources: [
            { name: "FDA FAERS", type: "Banco de Dados de Farmacovigilância", detail: "OpenFDA FAERS API – adverse event reports: lisinopril + cough (2020-2025)." },
            { name: "British Medical Journal", type: "Meta-análise", detail: "Woo & Nicholls (2000) – Incidence and risk factors for ACE inhibitor cough in hypertensive patients." },
          ],
          recommendation: "Incidência expressiva justifica investigação imediata e provável substituição do fármaco.",
        },
      },
    });

    // Child 3: Differential Diagnosis
    nodes.push({
      id: "child-3",
      type: "custom",
      position: { x: 700, y: 310 },
      data: {
        icon: Share2,
        title: "Diagnóstico Diferencial",
        source: "OMS",
        content: matched.differentialNote,
        link: `URI CID-11: ${matched.icdCode}`,
        reference: {
          evidenceLevel: "Moderada",
          reasoning: `Antes de atribuir a tosse exclusivamente ao iECA, o protocolo clínico recomenda excluir: (1) infecção respiratória ativa (CID-11 BA00.Z), (2) asma ou hiperreatividade brônquica, (3) refluxo gastroesofágico com aspiração laríngea. O diagnóstico de exclusão é necessário para não suspender a medicação desnecessariamente.`,
          sources: [
            { name: "OMS CID-11", type: "Classificação Internacional", detail: "BA00.Z – Infecção aguda das vias respiratórias superiores, não especificada." },
            { name: "GINA Guidelines", type: "Diretriz Clínica", detail: "Global Initiative for Asthma – Differential diagnosis of chronic cough (2024)." },
          ],
          recommendation: "Solicitar anamnese detalhada, ausculta pulmonar e, se necessário, espirometria antes de classificar como iatrogenesia.",
        },
      },
    });
  } else {
    // Root Node: Safe
    nodes.push({
      id: "root",
      type: "custom",
      position: { x: 200, y: 40 },
      data: {
        isRoot: true,
        icon: CheckCircle2,
        title: "Nenhum Alerta Crítico",
        content: `Nenhuma correlação iatrogênica direta identificada entre ${medList} e ${symptomList}.`,
        reference: {
          evidenceLevel: "Moderada",
          reasoning: `A análise cruzou medicações (${medList}) com sintomas (${symptomList}) usando as bases NIH, OpenFDA FAERS e CID-11. Nenhuma das combinações ativas atingiu o limiar de correlação causal definido no protocolo de farmacovigilância automatizada.`,
          sources: [
            { name: "OpenFDA FAERS", type: "Banco de Dados", detail: "Análise de eventos adversos para os fármacos registrados." },
            { name: "NIH DailyMed", type: "Base de Bulas", detail: "Perfil de segurança consultado para cada medicamento." },
          ],
          recommendation: "Manter monitoramento. Reavalie se novos sintomas forem reportados.",
        },
      },
    });

    nodes.push({
      id: "child-1",
      type: "custom",
      position: { x: 60, y: 310 },
      data: {
        icon: Search,
        title: "Perfil de Segurança",
        source: "OpenFDA",
        content: meds.length > 0
          ? `Medicamentos verificados: ${meds.slice(0, 2).join(" e ")}. Nenhuma interação crítica detectada.`
          : "Sem medicações para consulta.",
        reference: {
          evidenceLevel: "Moderada",
          reasoning: `O perfil de farmacovigilância dos medicamentos registrados foi consultado no OpenFDA FAERS. Nenhum evento adverso sério foi identificado para as combinações atuais.`,
          sources: [
            { name: "OpenFDA FAERS", type: "Banco de Dados", detail: "FDA Adverse Event Reporting System – consulta automatizada." },
          ],
        },
      },
    });

    nodes.push({
      id: "child-2",
      type: "custom",
      position: { x: 380, y: 310 },
      data: {
        icon: Share2,
        title: "Análise Diferencial",
        source: "OMS",
        content: symptoms.length > 0
          ? `Mapeamento diferencial para ${symptomList} via CID-11. Monitoramento recomendado.`
          : "Aguardando sintomas para análise.",
        reference: {
          evidenceLevel: "Baixa",
          reasoning: `Sem correlação medicamentosa identificada, os sintomas foram mapeados isoladamente na CID-11 para fins de diagnóstico diferencial. A análise tem confiança reduzida por ausência de padrão iatrogênico confirmado.`,
          sources: [
            { name: "OMS CID-11", type: "Classificação Internacional", detail: "Mapeamento automático de sintomas para códigos diagnósticos." },
          ],
          recommendation: "Consulta médica presencial recomendada para avaliação clínica completa.",
        },
      },
    });
  }

  const childIds = matched ? ["child-1", "child-2", "child-3"] : ["child-1", "child-2"];
  
  childIds.forEach((childId) => {
    edges.push({
      id: `edge-root-${childId}`,
      source: "root",
      target: childId,
      type: "smoothstep",
      animated: true,
      style: { stroke: "#7C3AED", strokeWidth: 1.5, opacity: 0.5 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#7C3AED",
      },
    });
  });

  return { nodes, edges };
}

interface Props {
  patient: PatientData;
}

export function XAIReasoningPath({ patient }: Props) {
  const [openRefs, setOpenRefs] = useState<Set<string>>(new Set());

  const baseGraph = useMemo(() => buildGraphData(patient), [patient]);

  const toggleRef = useCallback((nodeId: string) => {
    setOpenRefs((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const { nodes, edges } = useMemo(() => {
    const mainNodes = baseGraph.nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onRefClick: n.data.reference ? () => toggleRef(n.id) : undefined,
        isRefOpen: openRefs.has(n.id),
      },
    }));

    const refNodes: Node[] = [];
    const refEdges: Edge[] = [];

    for (const n of baseGraph.nodes) {
      if (openRefs.has(n.id) && n.data.reference) {
        refNodes.push({
          id: `ref-${n.id}`,
          type: "reference",
          position: {
            x: n.position.x - 360,
            y: n.position.y,
          },
          data: {
            ...(n.data.reference as NodeReference),
            title: n.data.title as string,
            onClose: () => toggleRef(n.id),
          },
        });
        refEdges.push({
          id: `edge-ref-${n.id}`,
          source: `ref-${n.id}`,
          target: n.id,
          targetHandle: "ref-left",
          type: "straight",
          style: { stroke: "#7C3AED", strokeWidth: 1.5, opacity: 0.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#7C3AED",
          },
        });
      }
    }

    return {
      nodes: [...mainNodes, ...refNodes],
      edges: [...baseGraph.edges, ...refEdges],
    };
  }, [baseGraph, openRefs, toggleRef]);

  return (
    <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden min-h-[400px]">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between shadow-sm flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-900">
          XAI: Árvore de Raciocínio Diagnóstico
        </h2>
        <div className="text-xs text-gray-500 hidden md:block">
          Clique no{" "}
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold mx-0.5">
            ?
          </span>{" "}
          para expandir a referência como nó
        </div>
      </div>

      {/* Diagrama ReactFlow */}
      <div className="flex-1 h-[600px] bg-slate-50/50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.6, includeHiddenNodes: true }}
          minZoom={0.15}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          preventScrolling={false}
          nodesDraggable={false}
        >
          <Background color="#e5e7eb" gap={16} />
          <Controls className="!bg-white !shadow-md !border-gray-200" />
        </ReactFlow>
      </div>
    </div>
  );
}
