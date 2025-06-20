"use client"
import { itemVariants } from '@/motion/variants/motion'
import { CastMember } from '@/types/Credits'
import { motion } from 'framer-motion'



export default function MovieCredits({credits} : { credits: CastMember[]}) {
  return (
    <div className='bg-zinc-900 p-5 rounded-lg border border-zinc-700'>
        <div className='space-y-8'>
            <h2 className="text-2xl font-semibold mb-4">Cast Members</h2>
           <div className='flex flex-wrap gap-4 justify-center'>
           {credits.slice(0,8).map((member) => (
                       <motion.div
                       key={member?.id}
                       className="flex-shrink-0 w-40"
                       variants={itemVariants}
                       whileHover={{ scale: 1.05 }}
                     >
                       <div className="rounded-2xl">
                    
                          <img
                          src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : "/"}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:blur-[2px]"
                        />
                        <div className="">
                          <h2 className='text-2xl mt-2 leading-tight'>{member.name}</h2>
                          <p className='text-sm text-gray-500 italic'>{member.character}</p>
                        </div>
                        </div>
                     </motion.div>
            ))}
           </div>
        </div>
    </div>
  )
}
