
export default function ToggleButton({ onClickHandler, state, textMobile, textDesktop, isPhrase = false }: { onClickHandler: () => void, state: boolean, textMobile: string, textDesktop: string, isPhrase?: boolean }) {

   return (<>
      <button
         onClick={onClickHandler}
         className={`card smallest ${isPhrase ? "phrase" : ""} mobile ${state ? "on" : "off"}`}> {textMobile}
      </button>

      <button
         onClick={onClickHandler}
         className={`card smallest ${isPhrase ? "phrase" : ""} desktop ${state ? "on" : "off"}`}> {textDesktop}
      </button>

   </>)
}
