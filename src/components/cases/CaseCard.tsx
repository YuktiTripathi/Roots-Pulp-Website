"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { RenderableCase } from "@/lib/cases";
import { CaseComparison } from "./CaseComparison";

export type CaseSize = "large" | "small" | "wide" | "more";

export const caseImageSizes: Record<CaseSize | "drawer", string> = {
  large: "(max-width: 980px) 100vw, 640px",
  small: "(max-width: 980px) 100vw, 440px",
  wide: "(max-width: 980px) 100vw, 880px",
  more: "(max-width: 980px) 100vw, 320px",
  drawer: "(max-width: 980px) 100vw, 880px",
};

type Props = {
  case: RenderableCase;
  size: CaseSize;
  onOpen: (item: RenderableCase, trigger: HTMLElement) => void;
};

export function CaseCard({ case: item, size, onOpen }: Props) {
  const sizes = caseImageSizes[size];
  const titleId = `case-${item.id}-title`;
  const openButton = useRef<HTMLButtonElement>(null);

  return (
    <article className={`cases-card cases-card-${size}`} aria-labelledby={titleId}>
      <div className="cases-card-head">
        <p className="cases-concern">{item.concern}</p>
        <h3 id={titleId} className="cases-title">
          {item.title}
        </h3>
      </div>
      <div className="cases-card-media">
        {item.mode === "comparison" && item.before && item.after ? (
          <CaseComparison before={item.before} after={item.after} caseTitle={item.title} sizes={sizes} />
        ) : item.image ? (
          // A pointer shortcut only: the "Open case" button below is the accessible control.
          <div
            className="cases-card-image"
            style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}
            onClick={() => openButton.current && onOpen(item, openButton.current)}
          >
            <Image src={item.image.src} alt={item.image.alt} fill sizes={sizes} loading="lazy" />
          </div>
        ) : null}
      </div>
      <div className="cases-card-body">
        <p className="cases-summary">{item.summary}</p>
        <div className="cases-card-actions">
          <Link className="cases-link" href={item.link.href}>
            {item.link.label} <span aria-hidden="true">→</span>
          </Link>
          <button ref={openButton} type="button" className="cases-open" onClick={(event) => onOpen(item, event.currentTarget)}>
            Open case<span className="sr-only">: {item.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
