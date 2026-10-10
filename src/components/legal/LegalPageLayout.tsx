import Link from "next/link";
import type { ReactNode } from "react";
import "./legal.css";

export type LegalSection = { id: string; heading: string; body: ReactNode };

type Props = {
  crumb: string;
  title: string;
  intro: string;
  /** Shown as "Last updated". Change it whenever the content changes. */
  updated: string;
  sections: LegalSection[];
};

/** Shared layout for the Privacy Policy, Terms & Conditions and Medical Disclaimer. */
export function LegalPageLayout({ crumb, title, intro, updated, sections }: Props) {
  return (
    <main id="content" className="legal-page">
      <div className="legal-inner">
        <nav className="crumbs legal-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <header className="legal-head">
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-updated">Last updated: {updated}</p>
        </header>
        <nav className="legal-toc" aria-label="On this page">
          <p>On this page</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-body">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`}>{section.heading}</h2>
              {section.body}
            </section>
          ))}
        </div>
        <p className="legal-related">
          Related: <Link href="/privacy-policy/">Privacy Policy</Link> · <Link href="/terms/">Terms &amp; Conditions</Link> ·{" "}
          <Link href="/medical-disclaimer/">Medical Disclaimer</Link>
        </p>
      </div>
    </main>
  );
}
