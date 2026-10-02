"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/lib/openingHours";

type OpeningStatusProps = {
  suffix?: string;
  className?: string;
  as?: "p" | "span";
};

export function OpeningStatus({ suffix, className, as = "p" }: OpeningStatusProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const status = now ? getOpeningStatus(now) : null;
  const Tag = as;
  const stateClass = status ? (status.isOpen ? " is-open" : " is-closed") : "";

  return (
    <Tag
      className={`${className ?? "status-line"}${stateClass}`}
      aria-live="polite"
    >
      <span className={status?.isOpen ? "status-dot is-open" : "status-dot"} aria-hidden="true" />
      <span>
        {status ? `${status.label}${suffix ? ` · ${suffix}` : ""}` : "Checking clinic hours"}
      </span>
    </Tag>
  );
}
