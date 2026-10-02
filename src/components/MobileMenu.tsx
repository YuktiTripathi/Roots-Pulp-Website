import Link from "next/link";
import { clinic, launchedNavigation, telHref, whatsappHref } from "@/lib/clinic";
import { OpeningStatus } from "./OpeningStatus";

type MobileMenuProps = {
  id: string;
  pathname: string;
};

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function MobileMenu({ id, pathname }: MobileMenuProps) {
  return (
    <div className="mobile-menu" id={id}>
      <nav aria-label="Mobile">
        {launchedNavigation.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mobile-menu-contact">
        <a href={telHref()}>Call {clinic.phoneDisplay}</a>
        <a href={whatsappHref()}>WhatsApp {clinic.whatsappDisplay}</a>
        <OpeningStatus />
      </div>
    </div>
  );
}
