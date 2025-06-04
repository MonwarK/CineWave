import { useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { itemVariants } from "@/motion/variants/motion";

interface Props {
  feature: {
    title: string;
    description: string;
  };
}

export default function FeatureCard({ feature }: Props) {
  return (
    <motion.div
      key={feature.title}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", duration: 0.1 }}
      className="lg:w-full lg:h-52 h-40 backdrop-blur-2xl bg-gradient-to-r from-orange-400/60 to-red-400/60 p-5 rounded-2xl space-y-3 md:space-y-0 md:flex justify-between transition-transform duration-200"
    >
      <div className="space-y-1">
        <h3 className="font-medium text-lg">{feature.title}</h3>
        <p className="text-gray-200">{feature.description}</p>
      </div>
    </motion.div>
  );
}
