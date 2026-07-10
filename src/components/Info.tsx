import Accordion from "./Accordion";

import { LockClosedIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Info({ onClick }: { onClick: () => void }) {

   return (<>
      <div className="popup">
         <div className="subheading-container">
            <h2>Informationen zur Nutzung</h2>
            <div className="x" ><XMarkIcon width="2rem" onClick={onClick} /></div>
         </div>
         <div className="info-text">
            <Accordion title="Zeichen">Anzahl der möglichen Zeichen, die ein Passwort enthalten kann.</Accordion>
            <Accordion title="Passwortlänge">Länge des Passworts, bestimmt durch den Schieberegler.</Accordion>
            <Accordion title={<>Schlösser <LockClosedIcon width="1rem" strokeWidth="2.5px" /></>}>Entropie des Passworts. Gibt die Sicherheit gegen Brute-Force Attacken in Abhängigkeit von Zeichen und Länge an.
               <ul>
                  <b>Anzahl Schlösser:</b>
                  <li>1: min. 40 Bit</li>
                  <li>2: min. 72 Bit</li>
                  <li>3: min. 128 Bit</li>
                  <li>4: min. 192 Bit</li>
                  <li>5: min. 256 Bit</li>
               </ul>
               <hr />
               <div className="info-text-icon-row">
                  Ein Passwort mit mindestens
                  <div className="info-text-icons"><LockClosedIcon width="1rem" strokeWidth="2.5px" /><LockClosedIcon width="1rem" strokeWidth="2.5px" /><StopIcon width="1rem" strokeWidth="2.5px" stroke="#666" /><StopIcon width="1rem" strokeWidth="2.5px" stroke="#666" /><StopIcon width="1rem" strokeWidth="2.5px" stroke="#666" /></div>
                  wird empfohlen.
               </div>
            </Accordion>
            <Accordion title="Kleinbuchstaben/abc">Das Passwort soll eindeutige Kleinbuchstaben enthalten. <br />Ohne Lookalike/oO0 fehlen die Buchstaben o i l s für besser leserliche Passwörter.</Accordion>
            <Accordion title="Großbuchstaben/ABC">Das Passwort soll eindeutige Großbuchstaben enthalten. <br />Ohne Lookalike/oO0 fehlen die Buchstaben O I S für besser leserliche Passwörter.</Accordion>
            <Accordion title="Zahlen/123">Das Passwort soll eindeutige Zahlen enthalten. <br />Ohne Lookalike/oO0 fehlen die Zahlen 0 1 5 für besser leserliche Passwörter.</Accordion>
            <Accordion title="Sonderzeichen/?#%">Das Passwort soll eindeutige Sonderzeichen enthalten. <br />Zeichen: @#&*=^_~ <br /> Ohne Lookalike/oO0 fehlt das Zeichen @ für besser leserliche Passwörter.</Accordion>
            <Accordion title="Lookalike/oO0">Filtert Zeichen die anderen Zeichen ähneln können. <br />Zeichen: o i l s O I S @ </Accordion>
         </div >
      </div >
   </>)
}

/*
(Entropie &lt; 40)
               EntropieRating = 0
               (Entropie &ge; 40 & Entropie &lt; 80)
               EntropieRating = 1
               (Entropie &ge; 80 & Entropie &lt; 128)
               EntropieRating = 2
               (Entropie &ge; 128 & Entropie &lt; 192)
               EntropieRating = 3
               (Entropie &ge; 192 & Entropie &lt; 256)
               EntropieRating = 4
               (Entropie &ge; 256)
               EntropieRating = 5
 */