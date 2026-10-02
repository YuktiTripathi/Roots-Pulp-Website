"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { homeFaqs } from "@/lib/clinic";

export function FAQSection({ showHeading = true }: { showHeading?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="section faq" aria-labelledby={showHeading ? "faq-heading" : undefined}>
      <div className={showHeading ? "section-inner faq-layout" : "section-inner"}>
        {showHeading ? (
          <div>
            <h2 id="faq-heading">Common questions</h2>
            <p className="faq-intro">
              A few practical answers before you visit. For anything else, call or send a WhatsApp message.
            </p>
          </div>
        ) : null}
        <div className="accordion">
          {homeFaqs.map((item, index) => {
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
                    <span aria-hidden="true">{open ? "–" : "+"}</span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p>{item.answer}</p>
                  {"link" in item && item.link ? (
                    <p>
                      <Link className="text-link" href={item.link.href}>
                        {item.link.label} <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
