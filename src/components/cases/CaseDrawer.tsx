"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { bookingUrl } from "@/lib/clinic";
import type { RenderableCase } from "@/lib/cases";
import { caseImageSizes } from "./CaseCard";
import { CaseComparison } from "./CaseComparison";
import { casesNote } from "./copy";

type Props = {
  case: RenderableCase;
  opener: HTMLElement | null;
  onClose: () => void;
};

/** Expanded case in a native modal dialog. Only mounted while open, so its images load on demand. */
export function CaseDrawer({ case: item, opener, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = `case-drawer-${item.id}-title`;

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      if (element.open) element.close();
      opener?.focus();
    };
  }, [opener]);

  return (
    <dialog
      ref={dialog}
      className="cases-drawer"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cases-drawer-inner">
        <div className="cases-drawer-bar">
          <button ref={closeButton} type="button" className="cases-drawer-close" onClick={onClose}>
            <span aria-hidden="true">×</span> Close
          </button>
        </div>
        <p className="cases-concern">{item.concern}</p>
        <h3 id={titleId} className="cases-drawer-title">
          {item.title}
        </h3>
        <div className="cases-drawer-media">
          {item.mode === "comparison" && item.before && item.after ? (
            <CaseComparison before={item.before} after={item.after} caseTitle={item.title} sizes={caseImageSizes.drawer} />
          ) : item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes={caseImageSizes.drawer}
              loading="lazy"
            />
          ) : null}
        </div>
        <p className="cases-drawer-summary">{item.summary}</p>
        {item.detail ? <p className="cases-drawer-detail">{item.detail}</p> : null}
        {item.visits ? <p className="cases-drawer-visits">Visits: {item.visits}</p> : null}
        <div className="cases-drawer-actions">
          <Link className="cases-link" href={item.link.href}>
            {item.link.label} <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </Link>
        </div>
        <p className="cases-note">{casesNote}</p>
      </div>
    </dialog>
  );
}
