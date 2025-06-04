import { containerVariants } from "@/motion/variants/motion";
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Enjoy on your TV",
    description:
      "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
  },
  {
    title: "Download your series to watch offline",
    description:
      "Save your favourites easily and always have something to watch.",
  },
  {
    title: "Watch everywhere",
    description:
      "Stream unlimited films and series on your phone, tablet, laptop and TV.",
  },
  {
    title: "Create profiles for children",
    description:
      "Send children on adventures with their favourite characters in a space made just for them — free with your membership.",
  },
];

export default function Features() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <h2 className="text-2xl font-medium mb-8">More reasons to join</h2>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {features.map((feature) => (
          <FeatureCard feature={feature} />
        ))}
      </div>
    </motion.div>
  );
}
