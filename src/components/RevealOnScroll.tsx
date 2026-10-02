"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds .is-visible to every .reveal element once it enters the viewport.
 *
 * Elements are picked up in three cases: present on first load, added by a client side
 * route change, and added later by a component (a filtered gallery, a tab switch).
 * Previously only the first case worked, so pages reached by navigation stayed hidden.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supported = typeof IntersectionObserver !== "undefined";

    const io = supported
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
        )
      : null;

    const track = (node: Element) => {
      if (node.classList.contains("is-visible")) return;
      if (reduce || !io) node.classList.add("is-visible");
      else io.observe(node);
    };

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(".reveal")) track(root);
      root.querySelectorAll(".reveal").forEach(track);
    };

    scan(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((added) => {
          if (added instanceof Element) scan(added);
        }),
      );
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
