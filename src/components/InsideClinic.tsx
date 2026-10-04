"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { insideClinic } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";
import { photos } from "@/lib/photos";

type Photo = { src: string; width: number; height: number; alt: string; position?: string };

const extra: Record<string, Photo> = {
  listenConsult: insideClinic.photos[0],
  explainConsult: insideClinic.photos[1],
  happyPatientThumbsUp: insideClinic.photos[2],
  treatingPatient: insideClinic.photos[3],
  chairsideExamination: insideClinic.photos[4],
};
const pick = (key: string): Photo => extra[key] ?? photos[key as keyof typeof photos];

/** Each frame changes every INTERVAL; frames are offset so only one photograph changes at a time. */
const INTERVAL = 4500;

/** A landscape frame and a tall portrait frame, each crossfading through real clinic photographs. */
export function InsideClinic() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((value) => value + 1), INTERVAL / insideClinic.slots.length);
    return () => window.clearInterval(id);
  }, []);

  const frames = insideClinic.slots.map((keys, slot) => {
    // Slot n advances on every third tick, offset by n, so the three frames take turns.
    const steps = Math.floor((tick + insideClinic.slots.length - 1 - slot) / insideClinic.slots.length);
    return { keys, active: Math.max(0, steps) % keys.length };
  });

  const frame = (slot: number, sizes: string) => {
    const { keys, active } = frames[slot];
    return keys.map((key, index) => {
      const photo = pick(key);
      return (
        <Image
          key={key}
          src={photo.src}
          alt={index === active ? photo.alt : ""}
          aria-hidden={index === active ? undefined : true}
          fill
          sizes={sizes}
          className={index === active ? "inside-img is-active" : "inside-img"}
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      );
    });
  };

  return (
    <section className="section inside-clinic" aria-labelledby="inside-clinic-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">{insideClinic.eyebrow}</p>
          <h2 id="inside-clinic-heading" className="reveal" style={stagger(1)}>
            {insideClinic.heading}
          </h2>
          <p className="section-intro reveal" style={stagger(2)}>
            {insideClinic.intro}
          </p>
        </div>
        <div className="inside-grid">
          <figure className="inside-large reveal">{frame(0, "(max-width: 720px) 100vw, 680px")}</figure>
          <figure className="inside-tall reveal" style={stagger(1)}>
            {frame(1, "(max-width: 720px) 100vw, 460px")}
          </figure>
        </div>
        <p className="section-more reveal">
          <Link className="text-link" href="/gallery/">
            Explore the Gallery <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
