import type { CSSProperties } from "react";

/**
 * Stagger helper. Sets the --i custom property that the global motion system
 * (.reveal and .enter in globals.css) multiplies by --stagger to delay each item.
 * Keep indexes small so the whole group finishes quickly.
 */
export function stagger(index: number, max = 6): CSSProperties {
  return { "--i": Math.min(index, max) } as CSSProperties;
}
