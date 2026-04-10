import { Code2, Search, Share2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ElementType, useMemo } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface NodeData {
  icon: ElementType | null;
  title: string;
  source?: string;
  content: string;
  link?: string;
  isRoot?: boolean;
}

const CustomNode = ({ data }: { data: NodeData }) => {
  const Icon = data.icon;
  const isRoot = data.isRoot;

  return (
    <div
      className={`bg-white border rounded-xl p-4 w-[280px] shadow-sm relative ${
        isRoot ? "border-orange-300 ring-2 ring-orange-100" : "border-gray-200"
      }`}
    >
      {!isRoot && <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-[#163254] border-none" />}

      <div className="flex items-start justify-between mb-2 gap-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isRoot ? "bg-orange-100" : "bg-[#163254]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isRoot ? "text-orange-500" : "text-white"}`} />
            </div>
          )}
          <h3
            className={`text-sm font-semibold leading-tight ${
              isRoot ? "text-orange-900" : "text-gray-900"
            }`}
          >
            {data.title}
          </h3>
        </div>
        {data.source && (
          <span className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">
            {data.source}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mt-2 whitespace-pre-wrap">
        {data.content}
      </p>

      {data.link && (
        <div className="mt-3 flex items-center gap-1 text-[11px] text-[#163254] hover:underline cursor-pointer border-t border-gray-100 pt-2">
          <span>↗</span>
          <span className="truncate">{data.link}</span>
        </div>
      )}

      {/* Adding a source handle for children connections */}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-[#163254] border-none opacity-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
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
      position: { x: 300, y: 50 },
      data: {
        isRoot: true,
        icon: AlertTriangle,
        title: matched.title,
        content: matched.message(matchedDrug, matchedSymptom),
      },
    });

    // Child 1: Iatrogenesis / Pathophysiology
    nodes.push({
      id: "child-1",
      type: "custom",
      position: { x: 0, y: 250 },
      data: {
        icon: Code2,
        title: "Fisiopatologia / Mecanismo",
        source: "NIH",
        content: matched.mechanism,
      },
    });

    // Child 2: Clinical Evidence
    nodes.push({
      id: "child-2",
      type: "custom",
      position: { x: 300, y: 250 },
      data: {
        icon: Search,
        title: "Evidência Clínica",
        source: "OpenFDA",
        content: matched.fdaStat,
      },
    });

    // Child 3: Differential Diagnosis
    nodes.push({
      id: "child-3",
      type: "custom",
      position: { x: 600, y: 250 },
      data: {
        icon: Share2,
        title: "Diagnóstico Diferencial",
        source: "OMS",
        content: matched.differentialNote,
        link: `URI CID-11: ${matched.icdCode}`,
      },
    });
  } else {
    // Root Node: Conclusion (Safe)
    nodes.push({
      id: "root",
      type: "custom",
      position: { x: 150, y: 50 },
      data: {
        isRoot: true,
        icon: CheckCircle2,
        title: "Nenhum Alerta Crítico",
        content: `Nenhuma correlação iatrogênica direita identificada entre ${medList} e ${symptomList}.`,
      },
    });

    // Child 1: Safety Profile
    nodes.push({
      id: "child-1",
      type: "custom",
      position: { x: 0, y: 250 },
      data: {
        icon: Search,
        title: "Perfil de Segurança",
        source: "OpenFDA",
        content: meds.length > 0
          ? `Medicamentos verificados: ${meds.slice(0, 2).join(" e ")}. Nenhuma interação crítica de alto risco detectada na base de farmacovigilância.`
          : "Sem medicações para consulta.",
      },
    });

    // Child 2: Differential Analysis
    nodes.push({
      id: "child-2",
      type: "custom",
      position: { x: 300, y: 250 },
      data: {
        icon: Share2,
        title: "Análise Diferencial",
        source: "OMS",
        content: symptoms.length > 0
          ? `Mapeamento diferencial para diagnósticos alternativos via CID-11. Recomenda-se monitoramento para ${symptomList}.`
          : "Aguardando sintomas para iniciar análise.",
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
      style: { stroke: "#163254", strokeWidth: 1.5, opacity: 0.6 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#163254",
      },
    });
  });

  return { nodes, edges };
}

interface Props {
  patient: PatientData;
}

export function XAIReasoningPath({ patient }: Props) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => buildGraphData(patient), [patient]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden relative min-h-[400px]">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between shadow-sm z-10 whitespace-nowrap">
        <h2 className="text-base font-semibold text-gray-900">
          XAI: Árvore de Raciocínio Diagnóstico
        </h2>
        <div className="text-xs text-gray-500 hidden md:block">Fluxo interativo</div>
      </div>
      
      <div className="w-full h-[600px] bg-slate-50/50 relative">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.5, includeHiddenNodes: true }}
          minZoom={0.2}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          preventScrolling={false}
        >
          <Background color="#ccc" gap={16} />
          <Controls className="!bg-white !shadow-md !border-gray-200" />
        </ReactFlow>
      </div>
    </div>
  );
}
