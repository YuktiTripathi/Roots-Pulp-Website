"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bookingUrl, telHref, whatsappHref } from "@/lib/clinic";
import { PhoneMark, WhatsAppMark } from "./Icons";

export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={visible ? "action-bar is-visible" : "action-bar"} hidden={!visible}>
      <a href={telHref()}>
        <PhoneMark />
        Call
      </a>
      <a href={whatsappHref()}>
        <WhatsAppMark />
        WhatsApp
      </a>
      <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">Book</Link>
    </div>
  );
}
