'use client'
import { containerVariants } from "@/motion/variants/motion";
import { motion } from "framer-motion";

export default function Plan() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="transition hover:scale-[1.03]"
    >
      <div className="md:flex items-center md:space-x-2">
        <div>
          <img
            className="w-20 hidden md:block"
            src="https://i.ibb.co/ccgJ38zz/tj5dsg-H3-BYk-RWoey-Pay8rtx-K9t-Cjjg-Rb-KTP8-Az-FPTQFNjr-N8-AAAAASUVORK5-CYII.png"
            alt="popcorn"
          />
        </div>
        <div className="bg-gradient-to-r from-orange-400/60 to-red-400/60 p-5 rounded-2xl space-y-3 md:space-y-0 md:flex justify-between items-center flex-1">
          <div>
            <h3 className="text-xl font-bold">
              The movies you love for just £5.99
            </h3>
            <p className="text-lg">
              Get our most affordable, advert-supported plan.
            </p>
          </div>

          <div>
            <button className="bg-black/40 hover:bg-black/60 transition cursor-pointer rounded-md px-8 py-3 font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
