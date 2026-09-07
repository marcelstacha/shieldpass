import '../App.css'

import { useState, useEffect, useCallback } from "react"

import words from "../words"
import { InformationCircleIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import QR from '../components/QR';
import ToggleButton from '../components/ToggleButton';
import CopyGenerateButtons from '../components/CopyGenerateButtons';
import InputRange from '../components/InputRange';

const divider: string[] = ["", "-", "+", "%", "=", "x", "_", "#", "*", "$", "@"]
const desktopText: string[] = ["Großbuchstaben", "Trennzeichen"]
const mobileText: string[] = ["ABC", "#+%="]

export default function PassphrasePage() {

   const [isUpper, setIsUpper] = useState<boolean>(true);
   const [isDivider, setIsDivider] = useState<boolean>(true);
   const [password, setPassword] = useState<string>("password")
   const [passwordLength, setPasswordLength] = useState<number>(3)
   const [isOpenQR, setIsOpenQR] = useState<boolean>(false)
   const [isCopied, setIsCopied] = useState<boolean>(false);

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

         <InputRange
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
            min={3}
            max={9}
            step={1}
         />

         <ToggleButton
            onClickHandler={() => setIsUpper((prev) => !prev)}
            state={isUpper}
            textMobile={mobileText[0]}
            textDesktop={desktopText[0]}
            isPhrase={true}
         />

         <ToggleButton
            onClickHandler={() => setIsDivider((prev) => !prev)}
            state={isDivider}
            textMobile={mobileText[1]}
            textDesktop={desktopText[1]}
            isPhrase={true}
         />

         <CopyGenerateButtons
            handleCopy={handleCopy}
            handleGenerate={handleGenerate}
            isCopied={isCopied}
         />
      </div>}
   </>)
}