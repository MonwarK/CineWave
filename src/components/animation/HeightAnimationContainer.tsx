"use client";

import React from "react";
import { motion } from "framer-motion";
import { closeHeight, openHeight } from "@/motion/variants/height";

interface Props {
  children: React.ReactNode;
  isFormOpen: boolean;
}

export default function HeightAnimationContainer({
  children,
  isFormOpen,
}: Props) {
  return (
    <motion.div
      className="overflow-hidden"
      initial={closeHeight}
      animate={isFormOpen ? openHeight : closeHeight}
      transition={{ duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
    >
      {children}
    </motion.div>
  );
}
