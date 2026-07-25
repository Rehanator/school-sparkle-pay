"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type MenuItem = {
  label: string;
  href: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
}

const MotionLink = motion.create(Link);

export const MenuVertical = ({
  menuItems = [],
  color = "#ff6900",
  skew = 0,
}: MenuVerticalProps) => {
  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.label}-${index}`}
          className="group/nav flex items-center gap-2 cursor-pointer"
          initial="initial"
          whileHover="hover"
          style={{ transform: `skewX(${skew}deg)` }}
        >
          <motion.div
            variants={{
              initial: { x: "-100%", opacity: 0, width: 0 },
              hover: { x: 0, opacity: 1, width: "auto" },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center overflow-hidden"
          >
            <ArrowRight
              className="size-10 shrink-0"
              strokeWidth={1.5}
              style={{ color }}
            />
          </motion.div>

          <MotionLink
            to={item.href}
            variants={{
              initial: { x: -40, color: "currentColor" },
              hover: { x: 0, color },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-semibold tracking-tight no-underline"
          >
            {item.label}
          </MotionLink>
        </motion.div>
      ))}
    </div>
  );
};
