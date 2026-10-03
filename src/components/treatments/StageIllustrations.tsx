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

/* Braces: top-down view of an arch. Crowded, moving under gentle pressure, aligned, held by a retainer. */
function Arch({ stage }: { stage: "crowded" | "moving" | "aligned" | "retainer" }) {
  const count = 10;
  // Offsets push a few front teeth out of line; they shrink as the teeth move.
  const crowding = [0, 0, 0, 7, -6, 6, -5, 0, 0, 0];
  const twist = [0, 0, 0, 24, -20, 18, -16, 0, 0, 0];
  const factor = stage === "crowded" ? 1 : stage === "moving" ? 0.45 : 0;
  const teeth = Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) * 2 - 1;
    const x = 80 + 62 * t;
    const y = 24 + 78 * t * t;
    const angle = (Math.atan2(156 * t, 62) * 180) / Math.PI;
    const normal = (angle * Math.PI) / 180;
    const front = Math.abs(t) < 0.5;
    return {
      x: x - Math.sin(normal) * crowding[i] * factor,
      y: y + Math.cos(normal) * crowding[i] * factor,
      angle: angle + twist[i] * factor,
      rx: front ? 6 : 8,
      ry: front ? 4.5 : 6.5,
    };
  });
  const wire = teeth.map((tooth, i) => `${i ? "L" : "M"}${tooth.x.toFixed(1)} ${tooth.y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <path d="M10 112 C10 30 40 6 80 6 C120 6 150 30 150 112" fill="none" stroke={C.gum} strokeWidth="22" strokeLinecap="round" />
      {stage === "retainer" ? (
        <path d="M14 106 C14 34 42 12 80 12 C118 12 146 34 146 106" fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="4 3" />
      ) : null}
      {teeth.map((tooth, i) => (
        <ellipse
          key={i}
          cx={tooth.x}
          cy={tooth.y}
          rx={tooth.rx}
          ry={tooth.ry}
          transform={`rotate(${tooth.angle.toFixed(1)} ${tooth.x.toFixed(1)} ${tooth.y.toFixed(1)})`}
          fill="#fff"
          stroke={C.navy}
          strokeWidth="1.6"
        />
      ))}
      {stage === "moving" ? (
        <>
          <path d={wire} fill="none" stroke={C.muted} strokeWidth="1.2" />
          {teeth.map((tooth, i) => (
            <rect key={i} x={tooth.x - 2} y={tooth.y - 2} width="4" height="4" rx="1" fill={C.metal} stroke={C.navy} strokeWidth="0.8" />
          ))}
        </>
      ) : null}
    </svg>
  );
}

/* Milk teeth with the permanent teeth developing beneath them. */
function MilkTeeth() {
  const milk = [44, 82, 120, 158, 196];
  const buds = [63, 120, 177];
  return (
    <svg viewBox="0 0 330 170" aria-hidden="true" focusable="false">
      <rect x="6" y="60" width="228" height="104" rx="16" fill={C.bone} />
      {[30, 70, 100, 150, 200, 214, 46, 180].map((cx, i) => (
        <circle key={i} cx={cx} cy={i % 2 ? 150 : 136} r="2.6" fill={C.boneDot} />
      ))}
      <path d="M6 58 C40 52 80 62 120 62 C160 62 200 52 234 58 L234 78 L6 78 Z" fill={C.gum} stroke={C.gumLine} strokeWidth="1.4" />
      {buds.map((x) => (
        <path
          key={x}
          d={`M${x - 20} 120 C${x - 22} 98 ${x - 12} 92 ${x - 4} 96 C${x} 98 ${x} 98 ${x + 4} 96 C${x + 12} 92 ${x + 22} 98 ${x + 20} 120 C${x + 14} 128 ${x - 14} 128 ${x - 20} 120 Z`}
          fill={C.ivory}
          stroke={C.teal}
          strokeWidth="1.8"
          strokeDasharray="4 3"
        />
      ))}
      {milk.map((x) => (
        <path
          key={x}
          d={`M${x - 15} 30 C${x - 16} 16 ${x - 8} 12 ${x - 3} 15 C${x} 17 ${x} 17 ${x + 3} 15 C${x + 8} 12 ${x + 16} 16 ${x + 15} 30 C${x + 14} 44 ${x + 10} 56 ${x + 8} 66 L${x - 8} 66 C${x - 10} 56 ${x - 14} 44 ${x - 15} 30 Z`}
          fill="#fff"
          stroke={C.navy}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      ))}
      <g className="tp-stage-label">
        <path d="M206 30 L246 30" stroke={C.muted} strokeWidth="1" />
        <text x="250" y="34">
          Milk teeth
        </text>
        <path d="M200 110 L246 110" stroke={C.muted} strokeWidth="1" />
        <text x="250" y="106">
          Permanent teeth
        </text>
        <text x="250" y="120">
          growing beneath
        </text>
      </g>
    </svg>
  );
}

/* Cosmetic: a concern on the left, the treated tooth on the right. Front view of upper incisors. */
const INCISOR = "M0 8 C0 1 34 1 34 8 L32 50 C31 62 3 62 2 50 Z";
function Incisor({ x, fill = "#fff", d = INCISOR, scaleY = 1 }: { x: number; fill?: string; d?: string; scaleY?: number }) {
  return (
    <path
      d={d}
      transform={`translate(${x} 14) scale(1 ${scaleY})`}
      fill={fill}
      stroke={C.navy}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function CosmeticPair({ concern }: { concern: "stain" | "chip" | "gap" | "worn" }) {
  const arrow = <path d="M92 44 L108 44 M103 39 L108 44 L103 49" stroke={C.teal} strokeWidth="1.8" fill="none" strokeLinecap="round" />;
  const repair = (d: string, x: number) => (
    <path d={d} transform={`translate(${x} 14)`} fill="rgba(14, 74, 71, 0.16)" stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 2" />
  );
  return (
    <svg viewBox="0 0 200 90" aria-hidden="true" focusable="false">
      {concern === "stain" ? (
        <>
          <Incisor x={30} fill="#e6d2a6" />
          {arrow}
          <Incisor x={136} />
        </>
      ) : null}
      {concern === "chip" ? (
        <>
          <Incisor x={30} d="M0 8 C0 1 34 1 34 8 L33 40 L24 46 L20 59 C12 62 4 59 2 50 Z" />
          {arrow}
          <Incisor x={136} />
          {repair("M33 40 L24 46 L20 59 C26 60 31 57 32 50 Z", 136)}
        </>
      ) : null}
      {concern === "gap" ? (
        <>
          <g transform="translate(0 0) scale(0.8)">
            <Incisor x={14} />
            <Incisor x={68} />
          </g>
          {arrow}
          <g transform="translate(0 0) scale(0.8)">
            <Incisor x={140} />
            <Incisor x={178} />
          </g>
        </>
      ) : null}
      {concern === "worn" ? (
        <>
          <Incisor x={30} d="M0 8 C0 1 34 1 34 8 L32.5 40 L1.5 40 Z" />
          {arrow}
          <Incisor x={136} />
          {repair("M1.5 40 L32.5 40 L32 50 C31 62 3 62 2 50 Z", 136)}
        </>
      ) : null}
    </svg>
  );
}

/* Gum line and bone behind a tooth, shared by the cleaning and gum stage drawings. */
function GumAndBone({ gumTop = 74, boneTop = 96, inflamed = false }: { gumTop?: number; boneTop?: number; inflamed?: boolean }) {
  return (
    <>
      <rect x="2" y={boneTop} width="116" height={166 - boneTop} rx="8" fill={C.bone} />
      {[[16, boneTop + 18], [100, boneTop + 26], [20, boneTop + 44], [96, boneTop + 52]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill={C.boneDot} />
      ))}
      <path
        d={`M2 ${gumTop + 4} C14 ${gumTop - 4} 26 ${gumTop - 2} 34 ${gumTop + 2} L86 ${gumTop + 2} C94 ${gumTop - 2} 106 ${gumTop - 4} 118 ${gumTop + 4} L118 ${boneTop + 8} L2 ${boneTop + 8} Z`}
        fill={inflamed ? "#eda5a2" : C.gum}
        stroke={inflamed ? C.red : C.gumLine}
        strokeWidth="1.4"
      />
    </>
  );
}

/* Teeth cleaning: plaque and tartar at the gum line, then the cleaned tooth. */
function CleaningTooth({ stage }: { stage: "buildup" | "clean" }) {
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      <path d={TOOTH} fill="#fff" stroke={C.navy} strokeWidth="2.2" strokeLinejoin="round" />
      <GumAndBone />
      {stage === "buildup" ? (
        <>
          <path d="M23 50 C22 60 25 68 29 76 L38 76 C33 70 30 62 30 52 Z" fill="#e8cf86" stroke="#b8933a" strokeWidth="1" />
          <path d="M97 50 C98 60 95 68 91 76 L82 76 C87 70 90 62 90 52 Z" fill="#e8cf86" stroke="#b8933a" strokeWidth="1" />
          <path d="M22 34 C22 26 26 20 32 18" fill="none" stroke="#e8cf86" strokeWidth="3" strokeLinecap="round" />
          <Label x={104} y={42} text="Tartar" from={[94, 60]} />
        </>
      ) : null}
    </svg>
  );
}

/* Filling: a cavity, the decay removed, the tooth rebuilt. */
function FillingTooth({ stage }: { stage: "cavity" | "prepared" | "filled" }) {
  const hole = "M44 18 C50 26 58 28 66 22 C68 32 66 44 58 48 C50 50 44 44 42 34 Z";
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      <path d={TOOTH} fill="#fff" stroke={C.navy} strokeWidth="2.2" strokeLinejoin="round" />
      {stage === "cavity" ? <path d={hole} fill="#9b6b3c" stroke="#6e4a26" strokeWidth="1.2" /> : null}
      {stage === "prepared" ? <path d={hole} fill="#f1ece4" stroke={C.navy} strokeWidth="1.4" strokeDasharray="3 2" /> : null}
      {stage === "filled" ? <path d={hole} fill={C.tealSoft} stroke={C.teal} strokeWidth="1.6" /> : null}
    </svg>
  );
}

/* Gum disease: healthy gum, inflamed gum, advanced gum disease with a deeper pocket and bone loss. */
function GumStage({ stage }: { stage: "healthy" | "inflamed" | "advanced" }) {
  const advanced = stage === "advanced";
  return (
    <svg viewBox="0 0 120 170" aria-hidden="true" focusable="false">
      <path d={TOOTH} fill="#fff" stroke={C.navy} strokeWidth="2.2" strokeLinejoin="round" />
      <GumAndBone gumTop={advanced ? 92 : 72} boneTop={advanced ? 122 : 96} inflamed={stage !== "healthy"} />
      {stage === "inflamed" ? (
        <>
          {[26, 32, 88, 94].map((cx) => (
            <circle key={cx} cx={cx} cy="70" r="2.2" fill="#e8cf86" stroke="#b8933a" strokeWidth="0.6" />
          ))}
        </>
      ) : null}
      {advanced ? (
        <>
          <path d="M33 92 L36 118" stroke={C.red} strokeWidth="1.4" strokeDasharray="3 2" />
          <path d="M87 92 L84 118" stroke={C.red} strokeWidth="1.4" strokeDasharray="3 2" />
          <Label x={104} y={136} text="Bone loss" from={[92, 122]} />
        </>
      ) : null}
    </svg>
  );
}

/* Dentures: top-down arch. A partial denture fills gaps; a complete denture replaces the full arch. */
function DentureArch({ kind }: { kind: "partial" | "complete" }) {
  const count = 10;
  const missing = new Set([2, 3, 6, 7]);
  const teeth = Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) * 2 - 1;
    const angle = (Math.atan2(156 * t, 62) * 180) / Math.PI;
    return { x: 80 + 62 * t, y: 24 + 78 * t * t, angle, front: Math.abs(t) < 0.5 };
  });
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <path d="M10 112 C10 30 40 6 80 6 C120 6 150 30 150 112" fill="none" stroke={C.gum} strokeWidth="22" strokeLinecap="round" />
      {kind === "complete" ? (
        <path d="M12 110 C12 32 41 8 80 8 C119 8 148 32 148 110" fill="none" stroke="#e79a96" strokeWidth="14" strokeLinecap="round" opacity="0.8" />
      ) : null}
      {teeth.map((tooth, i) => {
        const replaced = kind === "complete" || missing.has(i);
        return (
          <ellipse
            key={i}
            cx={tooth.x}
            cy={tooth.y}
            rx={tooth.front ? 6 : 8}
            ry={tooth.front ? 4.5 : 6.5}
            transform={`rotate(${tooth.angle.toFixed(1)} ${tooth.x.toFixed(1)} ${tooth.y.toFixed(1)})`}
            fill={replaced ? C.ivory : "#fff"}
            stroke={replaced ? C.teal : C.navy}
            strokeWidth="1.6"
          />
        );
      })}
      {kind === "partial" ? (
        <path
          d={`M${teeth[2].x} ${teeth[2].y} Q80 60 ${teeth[7].x} ${teeth[7].y}`}
          fill="none"
          stroke={C.metal}
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      ) : null}
    </svg>
  );
}

/* Whitening: a stained tooth, the same tooth lighter, and a filling that keeps its colour. */
function WhiteningTooth({ stage }: { stage: "stained" | "lighter" | "filling" }) {
  return (
    <svg viewBox="0 0 80 90" aria-hidden="true" focusable="false">
      <path
        d={INCISOR}
        transform="translate(23 14)"
        fill={stage === "stained" ? "#e6d2a6" : "#fbf8f1"}
        stroke={C.navy}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {stage === "filling" ? (
        <>
          <path d="M23 6 L34 6 L33 26 C29 27 25 26 24 24 Z" transform="translate(23 14)" fill="#e6d2a6" stroke={C.teal} strokeWidth="1.2" />
          <Label x={60} y={12} text="Filling" from={[52, 26]} />
        </>
      ) : null}
    </svg>
  );
}

type Panel = { title: string; art: ReactNode };
type Figure = {
  label: string;
  /** "pairs" panels already contain their own before-and-after arrow. */
  rows: { heading?: string; wide?: boolean; pairs?: boolean; panels: Panel[] }[];
};

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
  braces: {
    label:
      "Four-stage illustration of a dental arch: crowded teeth, teeth moving under gentle pressure, aligned teeth, and a retainer holding them in place.",
    rows: [
      {
        wide: true,
        panels: [
          { title: "Crowded teeth", art: <Arch stage="crowded" /> },
          { title: "Gentle, steady pressure", art: <Arch stage="moving" /> },
          { title: "Teeth aligned", art: <Arch stage="aligned" /> },
          { title: "Retainer holds them", art: <Arch stage="retainer" /> },
        ],
      },
    ],
  },
  cosmetic: {
    label:
      "Four-panel illustration: a stained tooth next to a lighter one, a chipped tooth with its edge rebuilt, a gap between two teeth narrowed, and a worn tooth restored.",
    rows: [
      {
        wide: true,
        pairs: true,
        panels: [
          { title: "Stained to lighter", art: <CosmeticPair concern="stain" /> },
          { title: "Chipped edge rebuilt", art: <CosmeticPair concern="chip" /> },
          { title: "Gap narrowed", art: <CosmeticPair concern="gap" /> },
          { title: "Worn tooth restored", art: <CosmeticPair concern="worn" /> },
        ],
      },
    ],
  },
  cleaning: {
    label: "Illustration of a tooth at the gum line with plaque and tartar build-up, and the same tooth after cleaning.",
    rows: [
      {
        panels: [
          { title: "Plaque and tartar at the gum line", art: <CleaningTooth stage="buildup" /> },
          { title: "After a professional clean", art: <CleaningTooth stage="clean" /> },
        ],
      },
    ],
  },
  filling: {
    label:
      "Three-stage illustration of a tooth: a cavity, the decayed part removed, and the tooth rebuilt with a tooth-coloured filling.",
    rows: [
      {
        panels: [
          { title: "A cavity", art: <FillingTooth stage="cavity" /> },
          { title: "Decay removed", art: <FillingTooth stage="prepared" /> },
          { title: "Filling in place", art: <FillingTooth stage="filled" /> },
        ],
      },
    ],
  },
  "gum-stages": {
    label:
      "Three-panel illustration of a tooth and gum: healthy gum, inflamed gum with plaque, and advanced gum disease with a deeper pocket and bone loss.",
    rows: [
      {
        panels: [
          { title: "Healthy gum", art: <GumStage stage="healthy" /> },
          { title: "Inflamed gum (gingivitis)", art: <GumStage stage="inflamed" /> },
          { title: "Advanced (periodontitis)", art: <GumStage stage="advanced" /> },
        ],
      },
    ],
  },
  dentures: {
    label:
      "Two-panel illustration: a partial denture filling gaps between natural teeth, and a complete denture replacing a full arch.",
    rows: [
      {
        wide: true,
        panels: [
          { title: "Partial denture", art: <DentureArch kind="partial" /> },
          { title: "Complete denture", art: <DentureArch kind="complete" /> },
        ],
      },
    ],
  },
  whitening: {
    label:
      "Three-panel illustration: a stained tooth, the same tooth lighter after whitening, and a filling that keeps its original colour.",
    rows: [
      {
        panels: [
          { title: "Stained tooth", art: <WhiteningTooth stage="stained" /> },
          { title: "Lighter after whitening", art: <WhiteningTooth stage="lighter" /> },
          { title: "Fillings do not change", art: <WhiteningTooth stage="filling" /> },
        ],
      },
    ],
  },
  "milk-teeth": {
    label: "Illustration of a child's jaw showing milk teeth with the permanent teeth developing beneath them.",
    rows: [{ wide: true, panels: [{ title: "Milk teeth and the teeth to come", art: <MilkTeeth /> }] }],
  },
};

export function StageFigure({
  kind,
  caption,
  className,
}: {
  kind: StageIllustration;
  caption: string;
  className?: string;
}) {
  const figure = figures[kind];
  return (
    <figure className={className ? `tp-stages ${className}` : "tp-stages"}>
      <div className="tp-stages-board" role="img" aria-label={figure.label}>
        {figure.rows.map((row, rowIndex) => (
          <div key={row.heading ?? rowIndex} className="tp-stages-row">
            {row.heading ? <p className="tp-stages-heading">{row.heading}</p> : null}
            <ol className={`tp-stages-${row.panels.length}${row.wide ? " is-wide" : ""}${row.pairs ? " is-pairs" : ""}`}>
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
