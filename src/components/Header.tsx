"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { bookingUrl, launchedNavigation } from "@/lib/clinic";
import { CloseIcon, MenuIcon } from "./Icons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { OpeningStatus } from "./OpeningStatus";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // GLASS: one passive listener, state only changes when the threshold is crossed.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-menu-open" : ""}`}>
      <div className="header-bar">
        <Logo variant="header" />
        <nav className="desktop-nav" aria-label="Primary">
          {launchedNavigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-booking">
            <Link className="btn btn-primary header-book" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Appointment
            </Link>
            <OpeningStatus as="span" className="header-status" />
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
      {open ? <MobileMenu id={menuId} pathname={pathname} /> : null}
    </header>
  );
}
