/**
 * Step-by-step explainer illustrations for treatment pages, drawn in the site palette.
 * Deliberately calm and schematic: no realistic tissue, no blood and no instruments.
 */

import type { ReactNode } from "react";
import { stagger } from "@/lib/motion";
import type { StageIllustration } from "@/lib/treatmentPages";

const C = {
  navy: "#102048",
  teal: "#0e4a47",
  tealSoft: "#e7f2f0",
  red: "#a81820",
  ivory: "#f6f1e7",
  bone: "#efe7d8",
  boneDot: "#d9ccb4",
  gum: "#f2c6c0",
  gumLine: "#d98f87",
  pulpRed: "#e7a2a5",
  filled: "#d9822b",
  metal: "#a7b1c2",
  muted: "#3e4c5f",
};

/* Shared tooth shapes, in a 120 x 170 box. */
const TOOTH =
  "M20 34 C20 14 38 8 50 14 C56 17 64 17 70 14 C82 8 100 14 100 34 C100 52 96 64 92 76 L87 150 C86 160 76 160 75 150 L66 96 C64 88 56 88 54 96 L45 150 C44 160 34 160 33 150 L28 76 C24 64 20 52 20 34 Z";
const PREPARED =
  "M32 46 C32 38 88 38 88 46 L92 76 L87 150 C86 160 76 160 75 150 L66 96 C64 88 56 88 54 96 L45 150 C44 160 34 160 33 150 L28 76 Z";
const CHAMBER = "M42 40 C42 33 78 33 78 40 L76 62 C74 69 46 69 44 62 Z";
const CROWN =
  "M17 34 C17 11 38 4 50 11 C56 14 64 14 70 11 C82 4 103 11 103 34 C103 50 99 62 95 72 L25 72 C21 62 17 50 17 34 Z";

function Label({ x, y, text, from }: { x: number; y: number; text: string; from: [number, number] }) {
  return (
    <g className="tp-stage-label">
      <path d={`M${from[0]} ${from[1]} L${x - 6} ${y - 4} L${x - 2} ${y - 4}`} stroke={C.muted} strokeWidth="1" fill="none" />
      <text x={x} y={y}>
        {text}
      </text>
    </g>
  );
}

/* Root canal: healthy, infected, cleaned and sealed, restored. */
function RootCanalTooth({ stage }: { stage: "healthy" | "infected" | "sealed" | "restored" }) {
  const filled = stage === "sealed" || stage === "restored";
  const chamber =
    stage === "healthy"
      ? { fill: C.gum, stroke: C.gumLine }
      : stage === "infected"
        ? { fill: C.pulpRed, stroke: C.red }
        : { fill: C.tealSoft, stroke: C.teal };
  const canal = filled ? C.filled : chamber.stroke;
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      {stage === "infected" ? (
        <circle cx="39" cy="153" r="11" fill="rgba(168, 24, 32, 0.12)" stroke={C.red} strokeDasharray="3 3" />
      ) : null}
      <path d={TOOTH} fill="#fff" stroke={C.navy} strokeWidth="2.2" strokeLinejoin="round" />
      <path d={CHAMBER} fill={chamber.fill} stroke={chamber.stroke} strokeWidth="1.6" />
      <path d="M47 64 L39 146" stroke={canal} strokeWidth={filled ? 5 : 6} strokeLinecap="round" />
      <path d="M73 64 L81 146" stroke={canal} strokeWidth={filled ? 5 : 6} strokeLinecap="round" />
      {stage === "sealed" ? <path d="M46 52 L74 52" stroke={C.teal} strokeWidth="1.4" strokeDasharray="3 3" /> : null}
      {stage === "restored" ? (
        <path d={CROWN} fill={C.ivory} stroke={C.teal} strokeWidth="2.2" strokeLinejoin="round" />
      ) : null}
      {stage === "healthy" ? <Label x={114} y={28} text="Pulp" from={[74, 48]} /> : null}
    </svg>
  );
}

/* Implant: gap, post placed, bone heals, crown attached. Cross-section of gum and bone. */
function ImplantSite({ stage }: { stage: "gap" | "post" | "healed" | "crown" }) {
  const hasPost = stage !== "gap";
  const dots = [
    [14, 100],
    [30, 128],
    [22, 152],
    [92, 104],
    [106, 132],
    [96, 154],
    [40, 100],
    [80, 146],
  ];
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      <rect x="0" y="80" width="120" height="86" rx="10" fill={C.bone} />
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill={C.boneDot} />
      ))}
      <path
        d="M0 66 C18 62 36 70 60 70 C84 70 102 62 120 66 L120 88 L0 88 Z"
        fill={C.gum}
        stroke={C.gumLine}
        strokeWidth="1.4"
      />
      {/* Neighbouring teeth, cut by the frame edge */}
      <path
        d="M0 22 C6 14 14 12 20 18 C26 24 28 40 26 54 C25 62 23 68 22 72 L0 72"
        fill="#fff"
        stroke={C.navy}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M120 22 C114 14 106 12 100 18 C94 24 92 40 94 54 C95 62 97 68 98 72 L120 72"
        fill="#fff"
        stroke={C.navy}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {stage === "healed" ? (
        <rect x="44" y="76" width="32" height="84" rx="14" fill="rgba(14, 74, 71, 0.1)" stroke={C.teal} strokeDasharray="3 3" />
      ) : null}
      {hasPost ? (
        <g>
          <path d="M52 70 L68 70 L68 144 C68 152 52 152 52 144 Z" fill={C.metal} stroke={C.navy} strokeWidth="1.6" />
          {[82, 92, 102, 112, 122, 132].map((y) => (
            <path key={y} d={`M50 ${y} L70 ${y + 4}`} stroke={C.navy} strokeWidth="1.2" />
          ))}
        </g>
      ) : null}
      {stage === "crown" ? (
        <g>
          <path d="M55 70 L65 70 L63 56 L57 56 Z" fill="#c9d1dc" stroke={C.navy} strokeWidth="1.4" />
          <path
            d="M36 56 C34 32 42 22 50 26 C55 28 65 28 70 26 C78 22 86 32 84 56 C78 62 42 62 36 56 Z"
            fill={C.ivory}
            stroke={C.teal}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </g>
      ) : null}
      {stage === "post" ? <Label x={84} y={118} text="Post" from={[68, 112]} /> : null}
      {stage === "gap" ? <Label x={80} y={100} text="Bone" from={[70, 112]} /> : null}
    </svg>
  );
}

/* Crown row: damaged tooth, shaped tooth, crown fitted. */
function CrownTooth({ stage }: { stage: "damaged" | "shaped" | "crowned" }) {
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      {stage === "damaged" ? (
        <>
          <path d={TOOTH} fill="#fff" stroke={C.navy} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M44 22 C50 30 58 30 64 24 L60 42 C56 46 50 44 46 40 Z" fill="#c9a77c" stroke="#8a6a42" strokeWidth="1.2" />
          <path d="M70 16 L74 30 L69 38 L73 52" stroke={C.navy} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <path d={PREPARED} fill="#fff" stroke={C.navy} strokeWidth="2.2" strokeLinejoin="round" />
      )}
      {stage === "shaped" ? (
        <path d={CROWN} fill="none" stroke={C.teal} strokeWidth="1.4" strokeDasharray="4 4" />
      ) : null}
      {stage === "crowned" ? (
        <path d={CROWN} fill={C.ivory} stroke={C.teal} strokeWidth="2.2" strokeLinejoin="round" />
      ) : null}
    </svg>
  );
}

/* Bridge row: gap between two teeth, both shaped, bridge fitted. Three teeth in a 200 x 120 box. */
function BridgeRow({ stage }: { stage: "gap" | "shaped" | "bridged" }) {
  const anchor = stage === "gap" ? TOOTH : PREPARED;
  const place = (x: number) => `translate(${x} 10) scale(0.55)`;
  return (
    <svg viewBox="0 0 200 110" aria-hidden="true" focusable="false">
      <path d="M0 52 C40 48 70 56 100 56 C130 56 160 48 200 52 L200 104 L0 104 Z" fill={C.gum} opacity="0.7" />
      {[2, 132].map((x) => (
        <g key={x} transform={place(x)}>
          <path d={anchor} fill="#fff" stroke={C.navy} strokeWidth="3.6" strokeLinejoin="round" />
          {stage === "shaped" ? (
            <path d={CROWN} fill="none" stroke={C.teal} strokeWidth="2.4" strokeDasharray="6 6" />
          ) : null}
          {stage === "bridged" ? (
            <path d={CROWN} fill={C.ivory} stroke={C.teal} strokeWidth="3.6" strokeLinejoin="round" />
          ) : null}
        </g>
      ))}
      {stage === "bridged" ? (
        <>
          <rect x="54" y="18" width="94" height="16" rx="6" fill={C.ivory} stroke={C.teal} strokeWidth="2" />
          <g transform={place(67)}>
            <path d={CROWN} fill={C.ivory} stroke={C.teal} strokeWidth="3.6" strokeLinejoin="round" />
          </g>
        </>
      ) : null}
    </svg>
  );
}

type Panel = { title: string; art: ReactNode };
type Figure = { label: string; rows: { heading?: string; wide?: boolean; panels: Panel[] }[] };

const figures: Record<StageIllustration, Figure> = {
  "root-canal": {
    label:
      "Four-stage illustration of a tooth: a healthy tooth, an infected pulp, cleaned and sealed root canals, and a restored tooth.",
    rows: [
      {
        panels: [
          { title: "Healthy tooth", art: <RootCanalTooth stage="healthy" /> },
          { title: "Infected pulp", art: <RootCanalTooth stage="infected" /> },
          { title: "Cleaned and sealed", art: <RootCanalTooth stage="sealed" /> },
          { title: "Restored", art: <RootCanalTooth stage="restored" /> },
        ],
      },
    ],
  },
  implant: {
    label:
      "Four-stage illustration: a gap where a tooth is missing, an implant post placed in the jawbone, the bone healing around it, and a crown attached on top.",
    rows: [
      {
        panels: [
          { title: "Missing tooth", art: <ImplantSite stage="gap" /> },
          { title: "Implant post placed", art: <ImplantSite stage="post" /> },
          { title: "Bone heals around it", art: <ImplantSite stage="healed" /> },
          { title: "Connector and crown", art: <ImplantSite stage="crown" /> },
        ],
      },
    ],
  },
  "crown-bridge": {
    label:
      "Illustration in two rows: a damaged tooth shaped and covered by a crown, and a gap bridged by a false tooth attached to crowns on the neighbouring teeth.",
    rows: [
      {
        heading: "Crown",
        panels: [
          { title: "Damaged tooth", art: <CrownTooth stage="damaged" /> },
          { title: "Tooth shaped", art: <CrownTooth stage="shaped" /> },
          { title: "Crown in place", art: <CrownTooth stage="crowned" /> },
        ],
      },
      {
        heading: "Bridge",
        wide: true,
        panels: [
          { title: "Gap between two teeth", art: <BridgeRow stage="gap" /> },
          { title: "Supporting teeth shaped", art: <BridgeRow stage="shaped" /> },
          { title: "Bridge in place", art: <BridgeRow stage="bridged" /> },
        ],
      },
    ],
  },
};

export function StageFigure({ kind, caption }: { kind: StageIllustration; caption: string }) {
  const figure = figures[kind];
  return (
    <figure className="tp-stages">
      <div className="tp-stages-board" role="img" aria-label={figure.label}>
        {figure.rows.map((row, rowIndex) => (
          <div key={row.heading ?? rowIndex} className="tp-stages-row">
            {row.heading ? <p className="tp-stages-heading">{row.heading}</p> : null}
            <ol className={`tp-stages-${row.panels.length}${row.wide ? " is-wide" : ""}`}>
              {row.panels.map((panel, index) => (
                <li key={panel.title} className="reveal" style={stagger(index)}>
                  {panel.art}
                  <span>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    {panel.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
