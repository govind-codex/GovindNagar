"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export function SmoothCursor() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const bubbleX = useSpring(x, { stiffness: 360, damping: 30, mass: 0.32 });
  const bubbleY = useSpring(y, { stiffness: 360, damping: 30, mass: 0.32 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasFinePointer(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!hasFinePointer || prefersReducedMotion) return;

    const root = document.documentElement;
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    };
    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    root.classList.add("smooth-cursor-enabled");
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      root.classList.remove("smooth-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [hasFinePointer, prefersReducedMotion, x, y]);

  if (!hasFinePointer || prefersReducedMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="fixed left-0 top-0" style={{ x, y }}>
        <motion.svg
          viewBox="0 0 30 38"
          className="h-7 w-5 text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isPressed ? 0.86 : 1,
          }}
          transition={{ duration: 0.12 }}
        >
          <path
            d="M2.1 2.1 27 19.7c1 .7.6 2.3-.6 2.5l-9.3 1.4 5.1 10.1-5.2 2.6-5.1-10.1-6.6 6.5c-.9.9-2.4.2-2.3-1L0 3.4C-.1 2.2 1.1 1.4 2.1 2.1Z"
            fill="currentColor"
            stroke="var(--background)"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0"
        style={{ x: bubbleX, y: bubbleY }}
      >
        <motion.div
          className="ml-6 mt-4 flex h-8 min-w-10 items-center justify-center rounded-full border border-background/15 bg-foreground px-2.5 font-instrument-serif text-base leading-none text-background shadow-lg"
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isPressed ? 0.9 : 1,
            y: isVisible ? 0 : 4,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          hi
        </motion.div>
      </motion.div>
    </div>
  );
}
