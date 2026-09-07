export default function CopyGenerateButtons({ handleCopy, handleGenerate, isCopied }: { handleCopy: () => void, handleGenerate: () => void, isCopied: boolean }) {

   return (<>
      <button onClick={handleCopy} className="card mid dark copy">
         <span
            key={isCopied ? "copied" : "copy"}
            className={`text-animate ${isCopied ? "green-text" : ""}`}
         >
            {isCopied ? "Kopiert" : "Kopieren"}
         </span>
      </button>
      <button onClick={handleGenerate} className="text-animate card mid dark" > Generieren </button>
   </>)
}