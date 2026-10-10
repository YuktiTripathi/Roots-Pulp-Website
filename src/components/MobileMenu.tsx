"use client";

import Link from "next/link";
import { useState } from "react";
import { clinic, launchedNavigation, telHref, whatsappHref } from "@/lib/clinic";
import { OpeningStatus } from "./OpeningStatus";
import { TreatmentLinks } from "./TreatmentsMenu";

type MobileMenuProps = {
  id: string;
  pathname: string;
};

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function MobileMenu({ id, pathname }: MobileMenuProps) {
  const [showTreatments, setShowTreatments] = useState(false);
  return (
    <div className="mobile-menu" id={id}>
      <nav aria-label="Mobile">
        {launchedNavigation.map((item) =>
          item.href === "/treatments/" ? (
            <div className="mobile-tmenu" key={item.href}>
              <div className="mobile-tmenu-row">
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
                <button
                  type="button"
                  className="mobile-tmenu-toggle"
                  aria-expanded={showTreatments}
                  aria-controls={`${id}-treatments`}
                  aria-label={showTreatments ? "Hide treatments" : "Show treatments"}
                  onClick={() => setShowTreatments((value) => !value)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              <div className="mobile-tmenu-list" id={`${id}-treatments`} hidden={!showTreatments}>
                <TreatmentLinks pathname={pathname} />
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ),
        )}
      </nav>
      <div className="mobile-menu-contact">
        <a href={telHref()}>Call {clinic.phoneDisplay}</a>
        <a href={whatsappHref()}>WhatsApp {clinic.whatsappDisplay}</a>
        <OpeningStatus />
      </div>
    </div>
  );
}
