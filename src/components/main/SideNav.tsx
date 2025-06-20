import React, { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { noOpacity, visibleOpacity } from "@/motion/variants/opacity";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  navigation: {
    link: string;
    name: string;
  }[];
  isSidenavOpen: boolean;
  setIsSidenavOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideNav({
  navigation,
  isSidenavOpen,
  setIsSidenavOpen,
}: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isSidenavOpen && (
        <motion.div
          initial={noOpacity}
          animate={visibleOpacity}
          className="fixed inset-0 bg-black/80 z-50 left-0 top-0"
          onClick={() => setIsSidenavOpen(false)}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: "50%",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            exit={{ width: 0 }}
            className="left-0 top-0 max-w-md h-full bg-neutral-950 text-white overflow-hidden"
          >
            <div className="p-5">
              {/* Logo */}
              <div className="p-2 py-5">
                <Link href="/discover">
                  <p className="text-xl text-center line-clamp-1">CineWave</p>
                </Link>
              </div>

              <div className="space-y-4 py-10">
                {navigation.map((navItem) => (
                  <Link key={navItem.link} href={navItem.link}>
                    <div
                      className={classNames(
                        "hover:text-white cursor-pointer py-2 whitespace-nowrap",
                        {
                          "text-gray-400": pathname !== navItem.link,
                          "border-orange-500 text-white":
                            pathname === navItem.link,
                        }
                      )}
                    >
                      {navItem.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
