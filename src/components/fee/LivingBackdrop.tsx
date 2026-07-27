import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, Bus, Trophy, FlaskConical } from "lucide-react";

const orbs = [
  { size: 420, top: "-8%", left: "-6%", color: "oklch(0.78 0.13 190 / 0.35)", depth: 26, dur: 22 },
  { size: 360, top: "38%", left: "62%", color: "oklch(0.75 0.14 300 / 0.28)", depth: 40, dur: 28 },
  { size: 300, top: "72%", left: "12%", color: "oklch(0.82 0.14 150 / 0.26)", depth: 18, dur: 25 },
];

const floaters = [
  { Icon: BookOpen, top: "12%", left: "16%", size: 120, depth: 34, dur: 14 },
  { Icon: Bus, top: "58%", left: "78%", size: 140, depth: 48, dur: 18 },
  { Icon: Trophy, top: "78%", left: "42%", size: 110, depth: 24, dur: 16 },
  { Icon: FlaskConical, top: "26%", left: "68%", size: 100, depth: 40, dur: 20 },
];

/** Ambient reactive canvas: parallax orbs + slowly breathing 3D-ish icons. */
export function LivingBackdrop({ dimmed = false }: { dimmed?: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      animate={{ opacity: dimmed ? 0.4 : 1 }}
      transition={{ duration: 0.45 }}
    >
      {orbs.map((o, i) => (
        <ParallaxLayer key={`orb-${i}`} sx={sx} sy={sy} depth={o.depth}>
          <motion.div
            className="absolute rounded-full"
            style={{
              top: o.top,
              left: o.left,
              width: o.size,
              height: o.size,
              background: `radial-gradient(circle at 35% 35%, ${o.color}, transparent 70%)`,
              filter: "blur(70px)",
            }}
            animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.08, 0.96, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxLayer>
      ))}

      {floaters.map(({ Icon, ...f }, i) => (
        <ParallaxLayer key={`icon-${i}`} sx={sx} sy={sy} depth={f.depth}>
          <motion.div
            className="absolute text-foreground/[0.06]"
            style={{ top: f.top, left: f.left, filter: "blur(2.5px)" }}
            animate={{ y: [0, -22, 0], rotate: [-6, 8, -6], scale: [1, 1.05, 1] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon style={{ width: f.size, height: f.size }} strokeWidth={1} />
          </motion.div>
        </ParallaxLayer>
      ))}
    </motion.div>
  );
}

function ParallaxLayer({
  sx,
  sy,
  depth,
  children,
}: {
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  depth: number;
  children: React.ReactNode;
}) {
  // opposite direction to the cursor
  const x = useTransform(sx, (v) => -v * depth);
  const y = useTransform(sy, (v) => -v * depth);
  return <motion.div className="absolute inset-0" style={{ x, y }}>{children}</motion.div>;
}
