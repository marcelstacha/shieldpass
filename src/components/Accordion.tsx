import { ReactNode, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react"

export default function Accordion({ title, children }: { title: string | ReactNode; children: React.ReactNode }) {

   const [isOpen, setIsOpen] = useState<boolean>(false)

   function handleClick() {
      setIsOpen((prev) => !prev)
   }

   return (<>
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1, height: "auto" }}
         exit={{ opacity: 0, height: 0 }}
         transition={{ duration: 0.25, ease: "easeInOut" }}
         className="accordion"
         onClick={handleClick}
         aria-expanded={isOpen}
      >
         <h5 className="info-title">{title}</h5>

         <div className="chevron">
            {isOpen ?
               <ChevronUpIcon width="1.5rem" /> :
               <ChevronDownIcon width="1.5rem" />
            }
         </div>
         <AnimatePresence>
            {isOpen &&

               <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="info-paragraph"
               >
                  <hr />
                  {children}
               </motion.div>
            }
         </AnimatePresence>
      </motion.div >
   </>)
}