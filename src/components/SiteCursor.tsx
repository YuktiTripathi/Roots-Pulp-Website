"use client";

import { useEffect, useRef } from "react";

const NAVY = "#102048";
const NAVY_MID = "#1b3566";
const NAVY_GLOW = "rgba(16, 32, 72, 0.55)";

type Splash = {
  kind: "splash";
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
};

type Spark = {
  kind: "spark";
  x: number;
  y: number;
  angle: number;
  start: number;
};

const SPARK_COUNT = 10;
const SPARK_RADIUS = 28;
const SPARK_SIZE = 12;
const SPARK_DURATION = 420;

function easeOut(t: number) {
  return t * (2 - t);
}

export function SiteCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const splashes: Splash[] = [];
    const sparks: Spark[] = [];
    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const spawnSplash = (x: number, y: number, extra: boolean) => {
      const count = extra ? 7 : 3;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = extra ? 1.1 + Math.random() * 2.2 : 0.4 + Math.random() * 1.4;
        splashes.push({
          kind: "splash",
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.15,
          life: 0,
          max: extra ? 520 + Math.random() * 180 : 380 + Math.random() * 160,
          size: extra ? 1.8 + Math.random() * 2.4 : 1.1 + Math.random() * 1.6,
        });
      }
    };

    const spawnClick = (x: number, y: number) => {
      const now = performance.now();
      for (let i = 0; i < SPARK_COUNT; i += 1) {
        sparks.push({
          kind: "spark",
          x,
          y,
          angle: (Math.PI * 2 * i) / SPARK_COUNT + (Math.random() - 0.5) * 0.18,
          start: now,
        });
      }
    };

    const move = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.hypot(dx, dy);
      lastX = x;
      lastY = y;

      const now = performance.now();
      if (distance < 2 || now - lastSpawn < 16) return;
      lastSpawn = now;

      const target = event.target;
      const hovering =
        target instanceof Element &&
        Boolean(target.closest("a, button, [role='tab'], [role='button'], summary, label, video"));
      spawnSplash(x, y, hovering);
    };

    const click = (event: MouseEvent) => {
      spawnClick(event.clientX, event.clientY);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = splashes.length - 1; i >= 0; i -= 1) {
        const particle = splashes[i];
        particle.life += 16;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        const t = particle.life / particle.max;
        if (t >= 1) {
          splashes.splice(i, 1);
          continue;
        }
        const alpha = 1 - t;
        ctx.beginPath();
        ctx.fillStyle = t < 0.35 ? NAVY : NAVY_MID;
        ctx.globalAlpha = alpha;
        ctx.arc(particle.x, particle.y, particle.size * (1 - t * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = NAVY;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.shadowColor = NAVY_GLOW;
      ctx.shadowBlur = 6;

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        const elapsed = time - spark.start;
        if (elapsed >= SPARK_DURATION) {
          sparks.splice(i, 1);
          continue;
        }
        const progress = easeOut(elapsed / SPARK_DURATION);
        const distance = progress * SPARK_RADIUS;
        const length = SPARK_SIZE * (1 - progress);
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.moveTo(spark.x + distance * Math.cos(spark.angle), spark.y + distance * Math.sin(spark.angle));
        ctx.lineTo(
          spark.x + (distance + length) * Math.cos(spark.angle),
          spark.y + (distance + length) * Math.sin(spark.angle),
        );
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("click", click);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("click", click);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="site-cursor-canvas" aria-hidden="true" />;
}
