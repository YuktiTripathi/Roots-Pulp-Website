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
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const supported = typeof IntersectionObserver !== "undefined";
    document.documentElement.classList.add("motion-ready");

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
      if (reduce || !io) {
        node.classList.add("is-visible");
        return;
      }
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) node.classList.add("is-visible");
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

    // A single passive scroll listener drives the few editorial images that opt in.
    // The movement is intentionally small and disabled for touch and reduced motion.
    const parallaxItems = reduce || coarsePointer
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2 + rect.height / 2);
        const distance = Number(item.dataset.parallax || 12);
        const offset = Math.max(-1, Math.min(1, progress)) * distance;
        item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
    };
    const requestParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    if (parallaxItems.length) {
      updateParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax);
    }

    return () => {
      io?.disconnect();
      mutations.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
