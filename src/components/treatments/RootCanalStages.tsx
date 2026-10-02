/**
 * Four-stage root canal explainer, drawn in the site palette.
 * Deliberately calm and schematic: no realistic tissue and no instruments.
 */

import { stagger } from "@/lib/motion";

const TOOTH =
  "M20 34 C20 14 38 8 50 14 C56 17 64 17 70 14 C82 8 100 14 100 34 C100 52 96 64 92 76 L87 150 C86 160 76 160 75 150 L66 96 C64 88 56 88 54 96 L45 150 C44 160 34 160 33 150 L28 76 C24 64 20 52 20 34 Z";
const CHAMBER = "M42 40 C42 33 78 33 78 40 L76 62 C74 69 46 69 44 62 Z";
const CANAL_LEFT = "M47 64 L39 146";
const CANAL_RIGHT = "M73 64 L81 146";
const CROWN =
  "M17 34 C17 11 38 4 50 11 C56 14 64 14 70 11 C82 4 103 11 103 34 C103 50 99 62 95 72 L25 72 C21 62 17 50 17 34 Z";

type Stage = "healthy" | "infected" | "sealed" | "restored";

const stages: { id: Stage; title: string }[] = [
  { id: "healthy", title: "Healthy tooth" },
  { id: "infected", title: "Infected pulp" },
  { id: "sealed", title: "Cleaned and sealed" },
  { id: "restored", title: "Restored" },
];

const pulp = {
  healthy: { fill: "#f2c6c0", stroke: "#d98f87" },
  infected: { fill: "#e7a2a5", stroke: "#a81820" },
  sealed: { fill: "#e7f2f0", stroke: "#0e4a47" },
  restored: { fill: "#e7f2f0", stroke: "#0e4a47" },
};

function Tooth({ stage }: { stage: Stage }) {
  const colors = pulp[stage];
  const filled = stage === "sealed" || stage === "restored";
  const canal = filled ? "#d9822b" : colors.stroke;
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      {stage === "infected" ? (
        <circle cx="39" cy="153" r="11" fill="rgba(168, 24, 32, 0.12)" stroke="#a81820" strokeDasharray="3 3" />
      ) : null}
      <path d={TOOTH} fill="#ffffff" stroke="#102048" strokeWidth="2.2" strokeLinejoin="round" />
      <path d={CHAMBER} fill={colors.fill} stroke={colors.stroke} strokeWidth="1.6" />
      <path d={CANAL_LEFT} stroke={canal} strokeWidth={filled ? 5 : 6} strokeLinecap="round" />
      <path d={CANAL_RIGHT} stroke={canal} strokeWidth={filled ? 5 : 6} strokeLinecap="round" />
      {stage === "sealed" ? (
        <path d="M46 52 L74 52" stroke="#0e4a47" strokeWidth="1.4" strokeDasharray="3 3" />
      ) : null}
      {stage === "restored" ? (
        <path d={CROWN} fill="#f6f1e7" stroke="#0e4a47" strokeWidth="2.2" strokeLinejoin="round" />
      ) : null}
      {stage === "healthy" ? (
        <g className="tp-stage-label">
          <path d="M74 48 L104 24 L112 24" stroke="#3e4c5f" strokeWidth="1" fill="none" />
          <text x="114" y="28" textAnchor="start">
            Pulp
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export function RootCanalStages({ caption }: { caption: string }) {
  return (
    <figure className="tp-stages">
      <ol
        role="img"
        aria-label="Four-stage illustration of a tooth: a healthy tooth, an infected pulp, cleaned and sealed root canals, and a restored tooth."
      >
        {stages.map((stage, index) => (
          <li key={stage.id} className="reveal" style={stagger(index)}>
            <Tooth stage={stage.id} />
            <span>
              <b>{String(index + 1).padStart(2, "0")}</b>
              {stage.title}
            </span>
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
