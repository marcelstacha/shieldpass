import '../App.css'

import { useState, useEffect, useCallback } from "react"

import words from "../words"
import { InformationCircleIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import QR from '../components/QR';

const divider: string[] = ["", "-", "+", "%", "=", "x", "_", "#", "*", "$", "@"]

export default function PassphrasePage() {

   const [isUpper, setIsUpper] = useState<boolean>(true);
   const [isDivider, setIsDivider] = useState<boolean>(true);
   const [password, setPassword] = useState<string>("password")
   const [passwordLength, setPasswordLength] = useState<number>(3)
   const [isOpenQR, setIsOpenQR] = useState<boolean>(false)
   const [isCopied, setIsCopied] = useState<boolean>(false);

   const desktopText: string[] = ["Großbuchstaben", "Trennzeichen"]
   //const mobileText: string[] = ["ABC", "#+%="]

   const generate: () => void = useCallback(() => {
      let pw: string = ""
      let word: string = ""
      let index: number = 0

      for (let i = 0; i < passwordLength; i++) {
         const selectedDivider: number = Math.floor(Math.random() * (divider.length - 1)) + 1
         index = Math.floor(Math.random() * words.length)
         word = words[index];
         if (isUpper)
            word = word.charAt(0).toUpperCase() + word.slice(1)
         if (isDivider && (i !== passwordLength - 1)) {
            pw += word + divider[selectedDivider]
         } else {
            pw += word
         }

      }
      setPassword(pw)
   }, [isDivider, isUpper, passwordLength])

   const handleGenerate: () => void = useCallback(() => {
      let delay: number = 0

      for (let i = 0; i < 13; i++) {
         setTimeout(() => {
            generate();
         }, delay);
         delay += 50;
      }
   }, [generate])

   function handleCopy(): void {
      navigator.clipboard.writeText(password)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
   }

   useEffect(() => {
      generate();
   }, [generate])

   useEffect(() => {
      handleGenerate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (<>
      <div className="top subheading-container">
         <QrCodeIcon
            className="info-icon"
            onClick={() => setIsOpenQR((prev) => !prev)}
         />
         <h2>PassPhraseGenerator</h2>

         {<InformationCircleIcon
            className="transparent info-icon"
         />}
      </div>
      {isOpenQR && <QR password={password} onClick={() => setIsOpenQR((prev) => !prev)} />}
      {!isOpenQR && <div className="card-container">
         <div
            className="card big password passphrase"
         >
            <span>{password} </span>
         </div>
         <div className="length-container info full">
            <span className="length">{passwordLength}</span>
         </div>
         < div className="card big input dark" >
            <input type="range"
               min="3"
               max="9"
               step="1"
               onChange={(e) => {
                  setPasswordLength(parseInt(e.target.value, 10));
                  generate();
               }
               }
               value={passwordLength}
            />
         </div>

         < div
            onClick={() => setIsUpper(prev => !prev)}
            className={`card smallest phrase ${isUpper ? "on" : "off"}`}> {desktopText[0]}
         </div>
         < div
            onClick={() => setIsDivider(prev => !prev)}
            className={`card smallest phrase ${isDivider ? "on" : "off"}`}> {desktopText[1]}
         </div>

         <div onClick={handleCopy} className="card mid dark copy"> {isCopied ? "Kopiert" : "Kopieren"} </div>
         <div onClick={handleGenerate} className="card mid dark" > Generieren </div>
      </div>}
   </>)
}