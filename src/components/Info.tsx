import Accordion from "./Accordion";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Lock from "./Lock";

export default function Info({ onClick }: { onClick: () => void }) {

   return (<>
      <div className="popup info-container">
         <div className="subheading-container">
            <h2>Informationen zur Nutzung</h2>
            <div className="x" >
               <XMarkIcon width="2rem" onClick={onClick} />
            </div>
         </div>
         <div className="info-text">
            <Accordion title="Zeichen">
               Anzahl der möglichen Zeichen, die ein Passwort enthalten kann.
            </Accordion>
            <Accordion title="Passwortlänge">
               Länge des Passworts, bestimmt durch den Schieberegler.
            </Accordion>
            <Accordion title={<>Schlösser <Lock /></>}>
               Entropie des Passworts. Gibt die Sicherheit gegen Brute-Force Attacken in Abhängigkeit von Zeichen und Länge an.
               <hr />
               <div className="lock-info-container">
                  <b>Anzahl Schlösser:</b>
                  <div className="lock-info-container">
                     <span className="lock-info-row"><span className="lock-info-icon"><Lock isFilled={true} size={1} /></span>: <span className="lock-info-text">min. 40 Bit</span></span>
                     <span className="lock-info-row"><span className="lock-info-icon"><Lock isFilled={true} size={2} /></span>: <span className="lock-info-text">min. 72 Bit</span></span>
                     <span className="lock-info-row"><span className="lock-info-icon"><Lock isFilled={true} size={3} /></span>: <span className="lock-info-text">min. 128 Bit</span></span>
                     <span className="lock-info-row"><span className="lock-info-icon"><Lock isFilled={true} size={4} /></span>: <span className="lock-info-text">min. 192 Bit</span></span>
                     <span className="lock-info-row"><span className="lock-info-icon"><Lock isFilled={true} size={5} /></span>: <span className="lock-info-text">min. 256 Bit</span></span>
                  </div>
               </div>
               <hr />
               <div className="info-text-icon-row">
                  Ein Passwort mit mindestens
                  <br />
                  <Lock isFilled={true} size={2} />
                  <br />
                  wird empfohlen.
               </div>
            </Accordion>
            <Accordion title="Kleinbuchstaben / abc">Das Passwort soll eindeutige Kleinbuchstaben enthalten. <br />Ohne Lookalike/oO0 fehlen die Buchstaben o i l s zur besseren Lesbarkeit.</Accordion>
            <Accordion title="Großbuchstaben / ABC">Das Passwort soll eindeutige Großbuchstaben enthalten. <br />Ohne Lookalike/oO0 fehlen die Buchstaben O I S zur besseren Lesbarkeit.</Accordion>
            <Accordion title="Zahlen / 123">Das Passwort soll eindeutige Zahlen enthalten. <br />Ohne Lookalike/oO0 fehlen die Zahlen 0 1 5 zur besseren Lesbarkeit.</Accordion>
            <Accordion title="Sonderzeichen / ?#%">Das Passwort soll eindeutige Sonderzeichen enthalten. <br />Zeichen: @#&*=^_~ <br /> Ohne Lookalike/oO0 fehlt das Zeichen @ zur besseren Lesbarkeit.</Accordion>
            <Accordion title="Lookalike / oO0">Filtert Zeichen die anderen Zeichen ähneln können. <br />Zeichen: O 0 o 1 i I l S 5 s @ </Accordion>
         </div >
      </div >
   </>)
}
