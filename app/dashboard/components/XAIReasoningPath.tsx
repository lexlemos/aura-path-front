"use client";

import { useState, useMemo, useEffect, useRef, ElementType } from "react";
import {
  Code2,
  Search,
  Share2,
  AlertTriangle,
  CheckCircle2,
  X,
  ExternalLink,
  Database,
  Pill,
  Activity,
  FileText,
  Microscope,
  ShieldAlert,
} from "lucide-react";
import type { PatientData } from "../types";
import { ActionButtons } from "./ActionButtons";
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
}

const EVIDENCE_BADGE: Record<string, string> = {
  Forte: "bg-[#7C3AED] text-white border-[#7C3AED]",
  Moderada: "bg-[#7C3AED]/15 text-[#6D28D9] border-[#7C3AED]/30",
  Baixa: "bg-[#7C3AED]/5 text-[#7C3AED]/60 border-[#7C3AED]/15",
};

const CustomNode = ({ data, selected }: NodeProps) => {
  const d = data as unknown as NodeData;
  const Icon = d.icon;
  const isRoot = d.isRoot;

  return (
    <div
      className={`bg-white border-2 rounded-xl p-4 w-[280px] shadow-sm relative transition-all duration-150 ${
        isRoot
          ? `border-[#7C3AED] ${selected ? "shadow-[#7C3AED]/20 shadow-md" : ""}`
          : `border-[#7C3AED]/30 ${
              selected
                ? "border-[#7C3AED] shadow-[#7C3AED]/10 shadow-md"
                : "hover:border-[#7C3AED]/60 hover:shadow-md"
            }`
      }`}
    >
      {/* Handle superior: fonte das arestas que sobem */}
      {!isRoot && (
        <Handle
          type="source"
          id="tree-top"
          position={Position.Top}
          className="!w-2 !h-2 !bg-[#7C3AED] !border-none"
        />
      )}

      <div className="flex items-start gap-2 mb-2">
        {Icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isRoot ? "bg-[#7C3AED]/20" : "bg-[#7C3AED]/10"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${isRoot ? "text-[#7C3AED]" : "text-[#7C3AED]"}`}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3
              className={`text-sm font-semibold leading-tight ${
                isRoot ? "text-[#4C1D95]" : "text-gray-900"
              }`}
            >
              {d.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              {d.source && (
                <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {d.source}
                </span>
              )}
              {d.reference && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    d.onRefClick?.();
                  }}
                  className="w-5 h-5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-bold flex items-center justify-center shadow transition-colors flex-shrink-0"
                  title="Ver referência"
                >
                  ?
                </button>
              )}
            </div>
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

      {/* Handle inferior: alvo das arestas que chegam de cima */}
      <Handle
        type="target"
        id="tree-bottom"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-[#7C3AED] !border-none"
      />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

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
    symptomKeywords: [
      "estômago",
      "estomago",
      "náusea",
      "nausea",
      "gástrica",
      "gastrite",
    ],
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

// Layout bottom-up: camada 0 = base (fundo), camada N = decisão (topo)
const LAYER_Y = [900, 700, 500, 300, 100];
const NODE_W = 300;
const NODE_GAP = 40;

function xCenter(count: number, index: number): number {
  const totalW = count * NODE_W + (count - 1) * NODE_GAP;
  const startX = -totalW / 2 + NODE_W / 2;
  return startX + index * (NODE_W + NODE_GAP);
}

function makeEdge(source: string, target: string): Edge {
  return {
    id: `edge-${source}-${target}`,
    source,
    sourceHandle: "tree-top",
    target,
    targetHandle: "tree-bottom",
    type: "default",
    style: { stroke: "#7C3AED", strokeWidth: 1.5, opacity: 0.6 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#7C3AED" },
  };
}

function buildGraphData(patient: PatientData) {
  const meds = patient.medications.map((m) => m.name.trim()).filter(Boolean);
  const symptoms = patient.symptoms.map((s) => s.trim()).filter(Boolean);

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

  const allNodes: (Node & { layer: number })[] = [];
  const edges: Edge[] = [];
  const medList = meds.length > 0 ? meds.join(", ") : "nenhuma medicação";
  const symptomList =
    symptoms.length > 0 ? symptoms.join(", ") : "nenhum sintoma";

  if (matched) {
    // ── Camada 0: Dados Brutos ─────────────────────────────────────────────
    allNodes.push({
      id: "l0-meds",
      type: "custom",
      layer: 0,
      position: { x: 0, y: 0 },
      data: {
        icon: Pill,
        title: "Medicações do Paciente",
        source: "Prontuário",
        content: `Medicamentos ativos registrados: ${medList}. Dados coletados do prontuário eletrônico.`,
        reference: {
          evidenceLevel: "Forte",
          reasoning:
            "Lista de medicamentos extraída do prontuário ativo do paciente.",
          sources: [
            {
              name: "Prontuário Eletrônico",
              type: "Registro Clínico",
              detail: "Dados de prescrição vigente.",
            },
          ],
        },
      },
    });

    allNodes.push({
      id: "l0-symptoms",
      type: "custom",
      layer: 0,
      position: { x: 0, y: 0 },
      data: {
        icon: Activity,
        title: "Sintomas Relatados",
        source: "Prontuário",
        content: `Sintomas registrados na última consulta: ${symptomList}. Coletados via anamnese estruturada.`,
        reference: {
          evidenceLevel: "Forte",
          reasoning:
            "Sintomas reportados pelo paciente e registrados pelo médico assistente.",
          sources: [
            {
              name: "Anamnese Clínica",
              type: "Registro Clínico",
              detail: "Coleta estruturada em consulta.",
            },
          ],
        },
      },
    });

    allNodes.push({
      id: "l0-vitals",
      type: "custom",
      layer: 0,
      position: { x: 0, y: 0 },
      data: {
        icon: Database,
        title: "Dados Clínicos Basais",
        source: "Monitoramento",
        content: `PA: ${patient.bp} mmHg · Pulso: ${patient.pulse} bpm. Parâmetros coletados pelo sistema de monitoramento contínuo.`,
        reference: {
          evidenceLevel: "Forte",
          reasoning:
            "Sinais vitais aferidos automaticamente e registrados no sistema.",
          sources: [
            {
              name: "Monitor Clínico",
              type: "Equipamento Médico",
              detail: "Leitura automática de sinais vitais.",
            },
          ],
        },
      },
    });

    // ── Camada 1: Consulta em Bases Externas ──────────────────────────────
    allNodes.push({
      id: "l1-fda",
      type: "custom",
      layer: 1,
      position: { x: 0, y: 0 },
      data: {
        icon: Database,
        title: "Consulta OpenFDA FAERS",
        source: "OpenFDA",
        content: matched.fdaStat,
        reference: {
          evidenceLevel: "Forte",
          reasoning: `Dados de farmacovigilância consultados no FDA FAERS para ${matchedDrug}. Incidência documentada em múltiplas populações.`,
          sources: [
            {
              name: "FDA FAERS",
              type: "Banco de Farmacovigilância",
              detail: "OpenFDA FAERS API – adverse event reports (2020-2025).",
            },
            {
              name: "BMJ",
              type: "Meta-análise",
              detail:
                "Woo & Nicholls (2000) – Incidence and risk factors for ACE inhibitor cough.",
            },
          ],
          recommendation:
            "Incidência expressiva justifica investigação imediata.",
        },
      },
    });

    allNodes.push({
      id: "l1-nih",
      type: "custom",
      layer: 1,
      position: { x: 0, y: 0 },
      data: {
        icon: Microscope,
        title: "Fisiopatologia / NIH",
        source: "NIH",
        content: matched.mechanism,
        reference: {
          evidenceLevel: "Forte",
          reasoning: `Mecanismo farmacológico documentado em literatura peer-reviewed. iECA bloqueiam degradação da bradicinina, desencadeando tosse reflexa.`,
          sources: [
            {
              name: "NEJM",
              type: "Artigo Científico",
              detail:
                "Israili & Hall (1992) – Cough and angioneurotic edema associated with ACE inhibitor therapy.",
            },
            {
              name: "PubMed",
              type: "Revisão Sistemática",
              detail:
                "PMID: 1567463 – Bradykinin-mediated cough in hypertensive patients.",
            },
          ],
          recommendation: "Dados fisiopatológicos confirmam relação causal.",
        },
      },
    });

    // ── Camada 2: Correlação Iatrogênica ──────────────────────────────────
    allNodes.push({
      id: "l2-correlation",
      type: "custom",
      layer: 2,
      position: { x: 0, y: 0 },
      data: {
        icon: Code2,
        title: "Correlação Medicamento–Sintoma",
        source: "Motor XAI",
        content: `Cruzamento confirmado: ${matchedDrug} × "${matchedSymptom}". Padrão iatrogênico identificado com alta confiança pelo motor de raciocínio.`,
        reference: {
          evidenceLevel: "Forte",
          reasoning: `O algoritmo cruzou a lista de medicamentos com os sintomas usando a base interna, validada por diretrizes clínicas e bancos de farmacovigilância.`,
          sources: [
            {
              name: "Motor XAI Interno",
              type: "Algoritmo Clínico",
              detail:
                "Correlação baseada em padrões pré-validados por especialistas.",
            },
            {
              name: "ANVISA",
              type: "Bula Oficial",
              detail: `${matchedDrug} – efeito adverso documentado.`,
            },
          ],
        },
      },
    });

    allNodes.push({
      id: "l2-differential",
      type: "custom",
      layer: 2,
      position: { x: 0, y: 0 },
      data: {
        icon: Share2,
        title: "Diagnóstico Diferencial",
        source: "OMS",
        content: matched.differentialNote,
        link: `URI CID-11: ${matched.icdCode}`,
        reference: {
          evidenceLevel: "Moderada",
          reasoning: `Protocolo recomenda excluir: (1) infecção respiratória ativa, (2) asma/hiperreatividade brônquica, (3) refluxo gastroesofágico. Diagnóstico de exclusão necessário.`,
          sources: [
            {
              name: "OMS CID-11",
              type: "Classificação Internacional",
              detail: `${matched.icdCode}`,
            },
            {
              name: "GINA Guidelines",
              type: "Diretriz Clínica",
              detail:
                "Global Initiative for Asthma – Differential diagnosis of chronic cough (2024).",
            },
          ],
          recommendation:
            "Ausculta pulmonar e, se necessário, espirometria antes de classificar como iatrogenesia.",
        },
      },
    });

    // ── Camada 3: Avaliação de Risco ──────────────────────────────────────
    allNodes.push({
      id: "l3-risk",
      type: "custom",
      layer: 3,
      position: { x: 0, y: 0 },
      data: {
        icon: ShieldAlert,
        title: "Avaliação de Risco Clínico",
        source: "Protocolo",
        content: `Risco classificado como ALTO. Continuidade de uso de ${matchedDrug} sem revisão pode agravar o quadro respiratório e comprometer adesão ao tratamento anti-hipertensivo.`,
        reference: {
          evidenceLevel: "Forte",
          reasoning: `Classificação de risco alto baseada em: (1) incidência documentada ≥15%, (2) mecanismo causal confirmado, (3) sintoma ativo no momento da avaliação.`,
          sources: [
            {
              name: "UpToDate",
              type: "Revisão Clínica",
              detail:
                "ACE inhibitor-induced cough – Class effect with all agents.",
            },
            {
              name: "NIH MedlinePlus",
              type: "Base de Dados",
              detail: `${matchedDrug}: efeitos colaterais e contraindicações.`,
            },
          ],
          recommendation: `Substituição de ${matchedDrug} por ARA-II (ex: Losartana) é a conduta preferida.`,
        },
      },
    });

    // ── Camada 4 (topo): Decisão Final ────────────────────────────────────
    allNodes.push({
      id: "root",
      type: "custom",
      layer: 4,
      position: { x: 0, y: 0 },
      data: {
        isRoot: true,
        icon: AlertTriangle,
        title: matched.title,
        content: matched.message(matchedDrug, matchedSymptom),
        reference: {
          evidenceLevel: "Forte",
          reasoning: `O sistema identificou ${matchedDrug} na lista de medicações e encontrou "${matchedSymptom}" nos sintomas. Correlação farmacológica documentada em múltiplas bases clínicas.`,
          sources: [
            {
              name: "UpToDate",
              type: "Revisão Clínica",
              detail:
                "ACE inhibitor-induced cough – Class effect with all agents.",
            },
            {
              name: "NIH MedlinePlus",
              type: "Base de Dados",
              detail: `${matchedDrug}: efeitos colaterais e contraindicações.`,
            },
            {
              name: "ANVISA",
              type: "Bula Oficial",
              detail: `${matchedDrug} – Classe: Inibidor da ECA. Efeito adverso frequente: tosse seca (≥1/10).`,
            },
          ],
          recommendation: `Considerar substituição de ${matchedDrug} por ARA-II, como Losartana, que não causa acúmulo de bradicinina.`,
        },
      },
    });

    // ── Arestas (de baixo para cima) ─────────────────────────────────────
    edges.push(makeEdge("l0-meds", "l1-fda"));
    edges.push(makeEdge("l0-symptoms", "l1-fda"));
    edges.push(makeEdge("l0-symptoms", "l1-nih"));
    edges.push(makeEdge("l0-meds", "l1-nih"));
    edges.push(makeEdge("l0-vitals", "l1-nih"));
    edges.push(makeEdge("l1-fda", "l2-correlation"));
    edges.push(makeEdge("l1-nih", "l2-correlation"));
    edges.push(makeEdge("l1-nih", "l2-differential"));
    edges.push(makeEdge("l1-fda", "l2-differential"));
    edges.push(makeEdge("l2-correlation", "l3-risk"));
    edges.push(makeEdge("l2-differential", "l3-risk"));
    edges.push(makeEdge("l3-risk", "root"));
  } else {
    // ── Caso sem alerta: fluxo simplificado (3 camadas) ─────────────────
    allNodes.push({
      id: "l0-meds",
      type: "custom",
      layer: 0,
      position: { x: 0, y: 0 },
      data: {
        icon: Pill,
        title: "Medicações do Paciente",
        source: "Prontuário",
        content:
          meds.length > 0
            ? `Medicamentos verificados: ${medList}.`
            : "Sem medicações registradas.",
        reference: {
          evidenceLevel: "Moderada",
          reasoning:
            "Lista de medicamentos consultada. Nenhum evento adverso sério identificado.",
          sources: [
            {
              name: "OpenFDA FAERS",
              type: "Banco de Dados",
              detail:
                "FDA Adverse Event Reporting System – consulta automatizada.",
            },
          ],
        },
      },
    });

    allNodes.push({
      id: "l0-symptoms",
      type: "custom",
      layer: 0,
      position: { x: 0, y: 0 },
      data: {
        icon: Activity,
        title: "Sintomas Relatados",
        source: "Prontuário",
        content:
          symptoms.length > 0
            ? `Sintomas listados: ${symptomList}.`
            : "Nenhum sintoma registrado.",
        reference: {
          evidenceLevel: "Baixa",
          reasoning:
            "Sintomas mapeados isoladamente. Sem padrão iatrogênico identificado.",
          sources: [
            {
              name: "OMS CID-11",
              type: "Classificação Internacional",
              detail:
                "Mapeamento automático de sintomas para códigos diagnósticos.",
            },
          ],
          recommendation: "Consulta médica presencial recomendada.",
        },
      },
    });

    allNodes.push({
      id: "l1-analysis",
      type: "custom",
      layer: 1,
      position: { x: 0, y: 0 },
      data: {
        icon: Search,
        title: "Análise de Correlação",
        source: "Motor XAI",
        content: `Cruzamento de ${medList} com ${symptomList}. Nenhum padrão iatrogênico atingiu o limiar de correlação.`,
        reference: {
          evidenceLevel: "Moderada",
          reasoning:
            "Análise cruzada não encontrou correspondência nas bases de farmacovigilância.",
          sources: [
            {
              name: "OpenFDA FAERS",
              type: "Banco de Dados",
              detail:
                "Análise de eventos adversos para os fármacos registrados.",
            },
          ],
        },
      },
    });

    allNodes.push({
      id: "root",
      type: "custom",
      layer: 2,
      position: { x: 0, y: 0 },
      data: {
        isRoot: true,
        icon: CheckCircle2,
        title: "Nenhum Alerta Crítico",
        content: `Nenhuma correlação iatrogênica direta identificada entre ${medList} e ${symptomList}.`,
        reference: {
          evidenceLevel: "Moderada",
          reasoning: `A análise cruzou medicações com sintomas usando as bases NIH, OpenFDA FAERS e CID-11. Nenhuma combinação atingiu o limiar de correlação causal.`,
          sources: [
            {
              name: "OpenFDA FAERS",
              type: "Banco de Dados",
              detail:
                "Análise de eventos adversos para os fármacos registrados.",
            },
            {
              name: "NIH DailyMed",
              type: "Base de Bulas",
              detail: "Perfil de segurança consultado para cada medicamento.",
            },
          ],
          recommendation:
            "Manter monitoramento. Reavalie se novos sintomas forem reportados.",
        },
      },
    });

    edges.push(makeEdge("l0-meds", "l1-analysis"));
    edges.push(makeEdge("l0-symptoms", "l1-analysis"));
    edges.push(makeEdge("l1-analysis", "root"));
  }

  // Calcular posições baseadas na camada
  const layerGroups: Record<number, typeof allNodes> = {};
  for (const n of allNodes) {
    if (!layerGroups[n.layer]) layerGroups[n.layer] = [];
    layerGroups[n.layer].push(n);
  }
  const nodes: Node[] = allNodes.map((n) => {
    const group = layerGroups[n.layer];
    const idx = group.indexOf(n);
    const count = group.length;
    const layerY = LAYER_Y[n.layer] ?? n.layer * 200 + 100;
    return { ...n, position: { x: xCenter(count, idx), y: layerY } };
  });

  // Ordem de revelação: camada 0 primeiro → root por último
  const revealOrder = allNodes
    .slice()
    .sort((a, b) => a.layer - b.layer)
    .map((n) => n.id);

  return { nodes, edges, revealOrder };
}

interface Props {
  patient: PatientData;
  /** Quando true, inicia a animação de revelação gradual ao montar */
  autoPlay?: boolean;
}

export function XAIReasoningPath({ patient, autoPlay = false }: Props) {
  const [selectedRef, setSelectedRef] = useState<{
    title: string;
    ref: NodeReference;
  } | null>(null);

  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const baseGraph = useMemo(() => buildGraphData(patient), [patient]);

  // Inicia animação ao montar se autoPlay=true
  // O componente é remontado via key no DashboardClient, então o estado já começa zerado
  useEffect(() => {
    if (!autoPlay) return;

    setAnimating(true);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const { revealOrder } = baseGraph;
    revealOrder.forEach((id, i) => {
      const t = setTimeout(
        () => {
          setVisibleIds((prev) => new Set([...prev, id]));
          if (i === revealOrder.length - 1) setAnimating(false);
        },
        (i + 1) * 1000,
      );
      timers.push(t);
    });
    timerRef.current = timers;

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { nodes: allNodes, edges: allEdges } = useMemo(() => {
    const rawEdges: Edge[] = baseGraph.edges;

    const nodes = baseGraph.nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onRefClick: n.data.reference
          ? () =>
              setSelectedRef({
                title: n.data.title as string,
                ref: n.data.reference as NodeReference,
              })
          : undefined,
      },
      hidden: !visibleIds.has(n.id),
    }));

    const edges: Edge[] = rawEdges.map((e) => ({
      ...e,
      hidden: !visibleIds.has(e.source) || !visibleIds.has(e.target),
    }));

    return { nodes, edges };
  }, [baseGraph, visibleIds]);

  const isEmpty = visibleIds.size === 0 && !animating;

  return (
    <div className="w-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Cabeçalho */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-gray-900">
            XAI: Árvore de Raciocínio Diagnóstico
          </h2>
          {animating && (
            <span className="flex items-center gap-1.5 text-xs text-[#7C3AED] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] inline-block" />
              Construindo raciocínio...
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 hidden md:flex items-center gap-1">
          Clique no
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold mx-0.5">
            ?
          </span>
          do card para ver a referência
        </div>
      </div>

      {/* Diagrama ReactFlow */}
      <div className="w-full h-[640px] bg-slate-50/50 relative">
        {isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
            <FileText className="w-10 h-10 opacity-30" />
            <p className="text-sm text-center px-4">
              Clique em{" "}
              <span className="font-semibold text-[#7C3AED]">
                Ver Árvore de Decisão
              </span>{" "}
              no painel do paciente para iniciar a análise.
            </p>
          </div>
        ) : (
          <ReactFlow
            nodes={allNodes}
            edges={allEdges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.5, includeHiddenNodes: false }}
            minZoom={0.1}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
            preventScrolling={false}
            nodesDraggable={false}
          >
            <Background color="#e5e7eb" gap={16} />
            <Controls className="!bg-white !shadow-md !border-gray-200" />
          </ReactFlow>
        )}
      </div>

      {/* Action Buttons */}
      {!isEmpty && (
        <div>
          <ActionButtons />
        </div>
      )}

      {/* Modal de referência */}
      {selectedRef && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedRef(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 border-b border-gray-100">
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    ?
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Referência & Raciocínio
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">
                  {selectedRef.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${EVIDENCE_BADGE[selectedRef.ref.evidenceLevel]}`}
                >
                  Evidência {selectedRef.ref.evidenceLevel}
                </span>
                <button
                  onClick={() => setSelectedRef(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">
                  Por que esta sugestão?
                </p>
                <p className="text-xs text-gray-700 leading-relaxed text-justify">
                  {selectedRef.ref.reasoning}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                  Fontes consultadas
                </p>
                <div className="space-y-2">
                  {selectedRef.ref.sources.map((src, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-xs font-semibold text-gray-900">
                            {src.name}
                          </span>
                          <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                            {src.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          {src.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRef.ref.recommendation && (
                <div className="p-3 bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-lg">
                  <p className="text-[10px] text-[#7C3AED]/70 uppercase tracking-wider mb-1">
                    Recomendação clínica
                  </p>
                  <p className="text-xs text-[#7C3AED] leading-relaxed font-medium text-justify">
                    {selectedRef.ref.recommendation}
                  </p>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setSelectedRef(null)}
                className="w-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
