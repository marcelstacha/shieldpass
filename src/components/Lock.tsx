import { LockClosedIcon, StopIcon } from "@heroicons/react/24/outline";

export default function Lock({ isFilled = false, size = 1 }: { isFilled?: boolean, size?: number }) {

   const fill = 5 - size

   const lockIcons = []
   const fillIcons = []

   let lockColor = "#fff"
   let fillColor = "#666"

   if (isFilled == true) {
      if (size == 0) {
         fillColor = "#ff3b3b"
      } else if (size == 1) {
         lockColor = "#ff3b3b"
      } else if (size > 1 && size < 5) {
         fillColor = "#666"
      } else if (size == 5) {
         lockColor = "var(--on)"
         fillColor = "var(--on)"
      }
   }

   if (isFilled == false) {
      return <LockClosedIcon width="1rem" strokeWidth="2.5px" stroke={lockColor} />
   } else {
      for (let i = 0; i < size; i++) {
         lockIcons.push(<LockClosedIcon width="1rem" strokeWidth="2.5px" stroke={lockColor} />)
      }
      for (let i = 0; i < fill; i++) {
         fillIcons.push(<StopIcon width="1rem" strokeWidth="2.5px" stroke={fillColor} />)
      }
   }
   return (<>
      {lockIcons}
      {fillIcons}
   </>)
}