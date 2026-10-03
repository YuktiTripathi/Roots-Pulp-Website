"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { homeFaqs } from "@/lib/clinic";

type FaqItem = { question: string; answer: string; link?: { label: string; href: string } };

export function FAQSection({
  showHeading = true,
  items = homeFaqs,
  heading = "Common questions",
  intro = "A few practical answers before you visit. For anything else, call or send a WhatsApp message.",
  className,
  id,
}: {
  showHeading?: boolean;
  items?: readonly FaqItem[];
  heading?: string;
  intro?: string;
  className?: string;
  /** Anchor for in-page navigation. */
  id?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id={id} className={className ? `section faq ${className}` : "section faq"} aria-labelledby={showHeading ? "faq-heading" : undefined}>
      <div className={showHeading ? "section-inner faq-layout" : "section-inner"}>
        {showHeading ? (
          <div>
            <h2 id="faq-heading" className="reveal">
              {heading}
            </h2>
            <p className="faq-intro reveal" style={{ "--i": 1 } as CSSProperties}>
              {intro}
            </p>
          </div>
        ) : null}
        <div className="accordion reveal" style={{ "--i": 1 } as CSSProperties}>
          {items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div className={open ? "accordion-item is-open" : "accordion-item"} key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    {item.question}
                    <span className="accordion-icon" aria-hidden="true" />
                  </button>
                </h3>
                {/* Always rendered so it can animate. Closed panels are inert: skipped by keyboard and screen readers. */}
                <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-panel" inert={!open}>
                  <div className="accordion-panel-inner">
                    <p>{item.answer}</p>
                    {item.link ? (
                      <p>
                        <Link className="text-link" href={item.link.href}>
                          {item.link.label} <span aria-hidden="true">→</span>
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
