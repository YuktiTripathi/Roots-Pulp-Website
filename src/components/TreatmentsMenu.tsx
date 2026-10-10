"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { groupedTreatments } from "@/lib/clinic";
import { treatmentImage } from "@/lib/treatmentImages";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 220;

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** The treatment links, grouped, with a small picture beside each name. Shared by the desktop panel and the mobile menu. */
export function TreatmentLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {groupedTreatments().map((group) => (
        <div className="tmenu-group" key={group.name}>
          <p className="tmenu-group-name">{group.name}</p>
          <ul>
            {group.items.map((treatment) => {
              const href = `/treatments/${treatment.slug}/`;
              const image = treatmentImage(treatment.slug);
              return (
                <li key={treatment.slug}>
                  <Link href={href} aria-current={pathname === href ? "page" : undefined} onClick={onNavigate}>
                    {image ? (
                      <Image className="tmenu-thumb" src={image.src} alt="" width={40} height={40} sizes="40px" />
                    ) : null}
                    <span>{treatment.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

/** "Treatments" in the desktop header: the link still goes to the page; hovering, or the arrow button, opens the list. */
export function TreatmentsNavItem({ pathname, current }: { pathname: string; current: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const timer = useRef<number | undefined>(undefined);
  const root = useRef<HTMLDivElement>(null);

  const schedule = (next: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(next), next ? OPEN_DELAY : CLOSE_DELAY);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        root.current?.querySelector<HTMLButtonElement>(".tmenu-toggle")?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div
      ref={root}
      className={open ? "tmenu is-open" : "tmenu"}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") schedule(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") schedule(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link href="/treatments/" aria-current={current ? "page" : undefined}>
        Treatments
      </Link>
      <button
        type="button"
        className="tmenu-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Show treatments"
        onClick={() => {
          window.clearTimeout(timer.current);
          setOpen((value) => !value);
        }}
      >
        <ChevronDown />
      </button>
      <div className="tmenu-panel" id={panelId} hidden={!open}>
        <div className="tmenu-grid">
          <TreatmentLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
        <Link className="text-link tmenu-all" href="/treatments/" onClick={() => setOpen(false)}>
          View all treatments <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
