import React, { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { servers } from '@/utils/servers';
import classNames from 'classnames';

interface Props {
  isOpen: boolean;
  setCurrentServerIndex: Dispatch<SetStateAction<number>>;
  currentServer: { id: number };
}

export default function AvailableServers({
  isOpen,
  setCurrentServerIndex,
  currentServer,
}: Props) {
  return (
    <motion.div
      className="overflow-hidden"
      animate={
        isOpen ? { width: 'auto', height: 'auto' } : { width: 0, height: 0 }
      }
    >
      <div className="lg:w-96 h-full border-l border-zinc-800 p-6 space-y-5">
        <h3 className="text-white font-semibold uppercase">
          Available Servers
        </h3>

        <div>
          <p className="italic text-xs text-gray-500">
            *If you aren't happy with one server, please try the others*
          </p>
        </div>

        <div className="space-y-4">
          {servers.map((item, i) => (
            <div
              onClick={() => setCurrentServerIndex(i)}
              key={item.id}
              className={classNames(
                'p-5 rounded-lg border space-y-1 cursor-pointer',
                {
                  'bg-zinc-800 border-zinc-500': currentServer.id === item.id,
                  'bg-zinc-900 border-zinc-700 hover:opacity-80':
                    currentServer.id !== item.id,
                }
              )}
            >
              <h2 className="text-sm">
                Server {item.id}: {item.name}
              </h2>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
