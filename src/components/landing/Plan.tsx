import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "@/motion/variants/motion";

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
            src="https://media.discordapp.net/attachments/655822636277825588/1379790592690749470/tj5dsgH3BYkRWoeyPay8rtxK9tCjjgRbKTP8AzFPTQFNjrN8AAAAASUVORK5CYII.png?ex=684185a0&is=68403420&hm=f088cacf6fe6c619db9c275a56ddd71078b151d6fe3983f421d3e773db959bf1&=&format=webp&quality=lossless&width=80&height=70"
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
