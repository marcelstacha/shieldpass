import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";

export default function QR({ password, onClick }: { password: string; onClick: () => void }) {

   return (<>
      <div
         className="popup"
      >
         <div className="x-container subheading-container">
            <div className="x"><XMarkIcon width="2rem" onClick={onClick} /></div>
         </div>
         <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}

            className="qr"
         >
            <QRCodeSVG
               value={password}
               size={512}
               level={"L"}
            />
         </motion.div>
      </div>
   </>)
}
