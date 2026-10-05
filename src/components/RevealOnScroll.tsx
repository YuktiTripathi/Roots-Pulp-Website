"use client";

import { animate, inView, scroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Matches the motion tokens in globals.css (--ease-out, --dur-slow, --stagger). */
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.7;

/** Where each reveal variant starts. The end state is always "in place and fully visible". */
function startFor(node: HTMLElement): Record<string, number | string> {
  if (node.classList.contains("reveal--left")) return { opacity: 0, x: -24 };
  if (node.classList.contains("reveal--right")) return { opacity: 0, x: 24 };
  if (node.classList.contains("reveal--scale")) return { opacity: 0, scale: 0.97 };
  const shift = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--reveal-shift")) || 20;
  return { opacity: 0, y: shift };
}

/** --i sets the stagger position; groups are capped so they finish quickly. */
function delayFor(node: HTMLElement) {
  const styles = getComputedStyle(node);
  const index = parseFloat(styles.getPropertyValue("--i")) || 0;
  const step = parseFloat(styles.getPropertyValue("--stagger")) || 80;
  return (index * step) / 1000;
}

/**
 * Scroll reveals, driven by Framer Motion, for every .reveal element on every page.
 *
 * Elements are picked up when present on first load, after a client side route change, and when a
 * component adds them later (a filtered gallery, a tab switch). Until this runs, content stays visible:
 * the hidden start state only applies once the page is marked .motion-ready.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const root = document.documentElement;

    const stops: Array<() => void> = [];
    const settle = (node: HTMLElement, target: HTMLElement = node) => {
      node.classList.add("is-visible");
      // The end state now comes from CSS, so hover transforms (lift, zoom) work again.
      target.style.removeProperty("opacity");
      target.style.removeProperty("transform");
      target.style.removeProperty("clip-path");
    };

    const reveal = (node: HTMLElement) => {
      if (node.classList.contains("is-visible")) return;
      if (reduce) return settle(node);

      if (node.classList.contains("reveal--mask")) {
        const img = node.querySelector<HTMLElement>(".mask-img");
        if (!img) return settle(node);
        const from = node.classList.contains("reveal--mask-left") ? "inset(0% 8% 0% 0%)" : "inset(8% 0% 0% 0%)";
        animate(
          img,
          { clipPath: [from, "inset(0% 0% 0% 0%)"], scale: [1.04, 1] },
          { duration: 1, delay: delayFor(node), ease: EASE },
        ).then(() => settle(node, img));
        return;
      }

      const start = startFor(node);
      const end = Object.fromEntries(Object.keys(start).map((key) => [key, key === "opacity" || key === "scale" ? 1 : 0]));
      const keyframes = Object.fromEntries(Object.keys(start).map((key) => [key, [start[key], end[key]]]));
      animate(node, keyframes, { duration: DURATION, delay: delayFor(node), ease: EASE }).then(() => settle(node));
    };

    // Content already on screen when the page loads is shown straight away: hiding it and fading it
    // back in would only delay what the visitor can already see. Only content scrolled to animates.
    const onScreen = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const track = (node: HTMLElement, initial: boolean) => {
      if (node.dataset.revealTracked) return;
      node.dataset.revealTracked = "true";
      if (node.classList.contains("is-visible")) return;
      if (initial && onScreen(node)) return settle(node);
      stops.push(inView(node, () => reveal(node), { amount: 0.15, margin: "0px 0px -6% 0px" }));
    };

    const scan = (scope: ParentNode, initial = false) => {
      if (scope instanceof HTMLElement && scope.matches(".reveal")) track(scope, initial);
      scope.querySelectorAll<HTMLElement>(".reveal").forEach((node) => track(node, initial));
    };
    // Settle what is on screen before .motion-ready applies the hidden start state, so it never flickers.
    scan(document, true);
    root.classList.add("motion-ready");

    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((added) => {
          if (added instanceof HTMLElement) scan(added);
        }),
      );
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    // Gentle parallax on the few editorial images that opt in. Off for touch and reduced motion.
    if (!reduce && !coarsePointer) {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((item) => {
        const distance = Number(item.dataset.parallax || 12);
        stops.push(
          scroll(
            (progress: number) => item.style.setProperty("--parallax-y", `${((progress * 2 - 1) * distance).toFixed(2)}px`),
            { target: item, offset: ["start end", "end start"] },
          ),
        );
      });
    }

    return () => {
      stops.forEach((stop) => stop());
      mutations.disconnect();
      document.querySelectorAll<HTMLElement>("[data-reveal-tracked]").forEach((node) => delete node.dataset.revealTracked);
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
