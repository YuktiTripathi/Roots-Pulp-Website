"use client";

import { MotionConfig, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// The first page is server rendered and shown straight away; only later navigations animate in.
let firstPageShown = false;

/**
 * Page transition for every route, driven by Framer Motion. app/template.tsx re-mounts on each
 * client side navigation, so each new page fades and rises in. Reduced motion is respected, and
 * Framer Motion leaves no transform behind once settled, so sticky and fixed children are unaffected.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const [animateIn] = useState(() => firstPageShown);

  useEffect(() => {
    firstPageShown = true;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={animateIn ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
