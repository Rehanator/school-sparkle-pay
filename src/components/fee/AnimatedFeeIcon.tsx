import { motion, type Variants } from "framer-motion";

type Props = { hovered: boolean; className?: string };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ── Book: pages flip, light of knowledge glows ── */
export function BookIcon({ hovered, className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <motion.ellipse
        cx="12" cy="12" rx="5" ry="4" fill="currentColor"
        initial={false}
        animate={hovered ? { opacity: [0, 0.35, 0.18], scale: [0.6, 1.25, 1] } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.7, repeat: hovered ? Infinity : 0, repeatType: "mirror" }}
        style={{ transformOrigin: "12px 12px", filter: "blur(2px)" }}
      />
      <motion.path d="M12 6.5V19" {...stroke} />
      <motion.path
        d="M12 6.5C10.5 5.2 8.2 4.8 4.5 5.2V17.4C8.2 17 10.5 17.5 12 19"
        {...stroke}
        animate={hovered ? { d: ["M12 6.5C10.5 5.2 8.2 4.8 4.5 5.2V17.4C8.2 17 10.5 17.5 12 19", "M12 6.5C10.8 4.4 8.2 3.9 4.5 4.4V17.4C8.2 17 10.5 17.5 12 19", "M12 6.5C10.5 5.2 8.2 4.8 4.5 5.2V17.4C8.2 17 10.5 17.5 12 19"] } : {}}
        transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
      />
      <motion.path
        d="M12 6.5C13.5 5.2 15.8 4.8 19.5 5.2V17.4C15.8 17 13.5 17.5 12 19"
        {...stroke}
        animate={hovered ? { d: ["M12 6.5C13.5 5.2 15.8 4.8 19.5 5.2V17.4C15.8 17 13.5 17.5 12 19", "M12 6.5C13.2 4.4 15.8 3.9 19.5 4.4V17.4C15.8 17 13.5 17.5 12 19", "M12 6.5C13.5 5.2 15.8 4.8 19.5 5.2V17.4C15.8 17 13.5 17.5 12 19"] } : {}}
        transition={{ duration: 0.5, repeat: hovered ? Infinity : 0, delay: 0.08 }}
      />
    </svg>
  );
}

/* ── Bus: wheels spin, body tilts, exhaust puff ── */
export function BusIcon({ hovered, className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      animate={hovered ? { rotate: -7, x: 1 } : { rotate: 0, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
      style={{ transformOrigin: "18px 18px" }}
    >
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v8.5H4z" {...stroke} />
      <path d="M4 10.5h16" {...stroke} />
      <path d="M9.5 5v5.5M14.5 5v5.5" {...stroke} />
      <motion.g
        animate={hovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.5, repeat: hovered ? Infinity : 0, ease: "linear" }}
        style={{ transformOrigin: "7.5px 17.5px" }}
      >
        <circle cx="7.5" cy="17.5" r="1.9" {...stroke} />
        <path d="M7.5 15.9v3.2M5.9 17.5h3.2" {...stroke} strokeWidth={1.2} />
      </motion.g>
      <motion.g
        animate={hovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.5, repeat: hovered ? Infinity : 0, ease: "linear" }}
        style={{ transformOrigin: "16.5px 17.5px" }}
      >
        <circle cx="16.5" cy="17.5" r="1.9" {...stroke} />
        <path d="M16.5 15.9v3.2M14.9 17.5h3.2" {...stroke} strokeWidth={1.2} />
      </motion.g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={3} cy={15 - i} r={0.9} fill="currentColor"
          initial={false}
          animate={hovered ? { opacity: [0, 0.5, 0], x: [-0.5, -4 - i * 2], scale: [0.5, 1.6] } : { opacity: 0 }}
          transition={{ duration: 0.8, repeat: hovered ? Infinity : 0, delay: i * 0.15 }}
        />
      ))}
    </motion.svg>
  );
}

/* ── Trophy: bounce, gleam wipe, stars pop ── */
export function TrophyIcon({ hovered, className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      animate={hovered ? { y: [-0, -3, 0], scale: 1.1 } : { y: 0, scale: 1 }}
      transition={{ y: { duration: 0.6, repeat: hovered ? Infinity : 0 }, scale: { type: "spring", stiffness: 320, damping: 14 } }}
    >
      <defs>
        <clipPath id="trophy-clip">
          <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
        </clipPath>
      </defs>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" {...stroke} />
      <path d="M7 5.5H4.6A2.4 2.4 0 0 0 7 9.4M17 5.5h2.4A2.4 2.4 0 0 1 17 9.4" {...stroke} />
      <path d="M12 14v3M9 20h6M9.6 20c0-1.6.8-3 2.4-3s2.4 1.4 2.4 3" {...stroke} />
      <g clipPath="url(#trophy-clip)">
        <motion.rect
          x="-8" y="2" width="5" height="12" fill="currentColor" opacity="0.55"
          initial={false}
          animate={hovered ? { x: [-8, 20] } : { x: -8 }}
          transition={{ duration: 0.9, repeat: hovered ? Infinity : 0, repeatDelay: 0.2 }}
          transform="rotate(18 12 8)"
          style={{ filter: "blur(1px)" }}
        />
      </g>
      {[[4.5, 4], [19.5, 5], [5, 12]].map(([cx, cy], i) => (
        <motion.path
          key={i}
          d={`M${cx} ${cy - 1.2}l.45 .9.9 .3-.9 .3-.45 .9-.45-.9-.9-.3.9-.3z`}
          fill="currentColor"
          initial={false}
          animate={hovered ? { opacity: [0, 1, 0], scale: [0.3, 1.2, 0.3] } : { opacity: 0 }}
          transition={{ duration: 0.9, repeat: hovered ? Infinity : 0, delay: i * 0.2 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </motion.svg>
  );
}

/* ── Beaker: liquid slosh + rising bubbles ── */
export function BeakerIcon({ hovered, className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <clipPath id="beaker-clip">
          <path d="M9.5 3v6.2L5 18.2A1.6 1.6 0 0 0 6.4 20.5h11.2A1.6 1.6 0 0 0 19 18.2L14.5 9.2V3z" />
        </clipPath>
      </defs>
      <path d="M9.5 3v6.2L5 18.2A1.6 1.6 0 0 0 6.4 20.5h11.2A1.6 1.6 0 0 0 19 18.2L14.5 9.2V3z" {...stroke} />
      <path d="M8.5 3h7" {...stroke} />
      <g clipPath="url(#beaker-clip)">
        <motion.path
          d="M2 15c2.5-1.4 4.5 1.4 7 0s4.5-1.4 7 0 4.5 1.4 7 0v9H2z"
          fill="currentColor"
          opacity="0.28"
          animate={hovered ? { x: [-6, 0, -6], y: [0, -0.6, 0] } : { x: -3 }}
          transition={{ duration: 1.6, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
        />
        {[9, 12, 14.5, 11].map((cx, i) => (
          <motion.circle
            key={i}
            cx={cx} r={0.7} fill="currentColor"
            initial={false}
            animate={hovered ? { cy: [19, 13], opacity: [0, 0.9, 0], scale: [0.6, 1.2] } : { cy: 19, opacity: 0 }}
            transition={{ duration: 1.1, repeat: hovered ? Infinity : 0, delay: i * 0.25 }}
          />
        ))}
      </g>
    </svg>
  );
}

/* ── Utensils: fork & knife clink/cross ── */
export function UtensilsIcon({ hovered, className }: Props) {
  const spring = { type: "spring" as const, stiffness: 260, damping: 9 };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <motion.g
        animate={hovered ? { rotate: 22, x: 2 } : { rotate: 0, x: 0 }}
        transition={spring}
        style={{ transformOrigin: "8px 20px" }}
      >
        <path d="M6 3v6a2.5 2.5 0 0 0 5 0V3M8.5 3v6M8.5 11.5V21" {...stroke} />
      </motion.g>
      <motion.g
        animate={hovered ? { rotate: -22, x: -2 } : { rotate: 0, x: 0 }}
        transition={spring}
        style={{ transformOrigin: "16px 20px" }}
      >
        <path d="M17 3c-1.6 1.2-2.2 3-2.2 5s.6 3 2.2 3.4V21" {...stroke} />
      </motion.g>
      <motion.path
        d="M11.5 6.5l1 1M12.8 5.4l.6 .6"
        {...stroke}
        strokeWidth={1.3}
        initial={false}
        animate={hovered ? { opacity: [0, 1, 0], scale: [0.6, 1.3] } : { opacity: 0 }}
        transition={{ duration: 0.7, repeat: hovered ? Infinity : 0, delay: 0.15 }}
        style={{ transformOrigin: "12px 6px" }}
      />
    </svg>
  );
}

/* ── Palette: brush swoop + sequential paint pops ── */
const dots: Array<[number, number]> = [[8.5, 9], [12, 7.6], [15.4, 9.2], [9.4, 13]];
export function PaletteIcon({ hovered, className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 21a9 9 0 1 1 9-9c0 1.8-1.5 2.6-3 2.6h-1.6a2 2 0 0 0-1.4 3.4c.5.6.2 3-3 3z"
        {...stroke}
      />
      {dots.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy} r={1.15} fill="currentColor"
          initial={false}
          animate={hovered ? { scale: [1, 1.7, 1], opacity: [0.65, 1, 0.65] } : { scale: 1, opacity: 0.65 }}
          transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, delay: i * 0.14, repeatDelay: 0.4 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <motion.g
        initial={false}
        animate={hovered ? { x: [-8, 10], y: [6, -4], opacity: [0, 1, 0], rotate: [-20, 15] } : { opacity: 0 }}
        transition={{ duration: 1, repeat: hovered ? Infinity : 0, repeatDelay: 0.3 }}
      >
        <path d="M13 14l5-5 2 2-5 5-2.6.6z" {...stroke} strokeWidth={1.4} />
      </motion.g>
    </svg>
  );
}

export const feeIconMap = {
  book: BookIcon,
  bus: BusIcon,
  trophy: TrophyIcon,
  beaker: BeakerIcon,
  utensils: UtensilsIcon,
  palette: PaletteIcon,
} as const;

export type FeeIconKey = keyof typeof feeIconMap;
export type { Variants };
