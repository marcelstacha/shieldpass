import '../App.css'

import { InformationCircleIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useCallback } from "react"

import Info from '../components/Info';
import QR from '../components/QR';
import Lock from '../components/Lock';
import InputRange from '../components/InputRange';
import CopyGenerateButtons from '../components/CopyGenerateButtons';
import ToggleButton from '../components/ToggleButton';

const lower: string[] = ["abcdefghijklmnopqrstuvwxyz", "abcdefghjkmnpqrtuvwxyz"]
const upper: string[] = [lower[0].toUpperCase(), lower[1].toUpperCase().concat("L")]
const numbers: string[] = ["0123456789", "2346789"]
const special: string[] = ["@#&*=^_~", "#&*=^_~"]

const desktopText: string[] = ["Kleinbuchstaben", "Großbuchstaben", "Zahlen", "Sonderzeichen", "Lookalike"]
const mobileText: string[] = ["abc", "ABC", "123", "?#%", "oO0"]

export default function PasswordPage() {

   const [isLower, setIsLower] = useState<boolean>(true);
   const [isUpper, setIsUpper] = useState<boolean>(true);
   const [isNumber, setIsNumber] = useState<boolean>(true);
   const [isSpecial, setIsSpecial] = useState<boolean>(true);
   const [isLookalike, setIsLookalike] = useState<boolean>(true)

   const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false)
   const [isOpenQR, setIsOpenQR] = useState<boolean>(false)

   const [password, setPassword] = useState<string>("password")
   const [passwordLength, setPasswordLength] = useState<number>(16)
   const [symbolsLength, setSymbolsLength] = useState<number>(70)


   const activeCount: number = Number(isLower) + Number(isUpper) + Number(isNumber) + Number(isSpecial)
   const [isCopied, setIsCopied] = useState<boolean>(false);

   const MAX_LENGTH = 48

   function calculateEntropy() {

      let entropyRating = 0

      const entropy = passwordLength * Math.log(symbolsLength) / Math.log(2);

      if (entropy < 40) {
         entropyRating = 0
      } else if (entropy >= 40 && entropy < 72) {
         entropyRating = 1
      } else if (entropy >= 72 && entropy < 128) {
         entropyRating = 2
      } else if (entropy >= 128 && entropy < 192) {
         entropyRating = 3
      } else if (entropy >= 192 && entropy < 256) {
         entropyRating = 4
      } else if (entropy >= 256) {
         entropyRating = 5
      }
      return entropyRating
   }

   const entropy = calculateEntropy()

   const generate: () => void = useCallback(() => {
      let symbols = "";
      let calculatedSymbolsLength = 0

      if (isLower) {
         symbols += lower[Number(!isLookalike)]
         calculatedSymbolsLength += lower[Number(!isLookalike)].length
      }
      if (isUpper) {
         symbols += upper[Number(!isLookalike)]
         calculatedSymbolsLength += upper[Number(!isLookalike)].length
      }
      if (isNumber) {
         symbols += numbers[Number(!isLookalike)]
         calculatedSymbolsLength += numbers[Number(!isLookalike)].length
      }
      if (isSpecial) {
         symbols += special[Number(!isLookalike)]
         calculatedSymbolsLength += special[Number(!isLookalike)].length
      }


      setSymbolsLength(calculatedSymbolsLength)

      if (isLower || isUpper || isNumber || isSpecial) {
         let generatedPassword = ""

         for (let i = 0; i < passwordLength; i++) {
            const index = Math.floor(Math.random() * calculatedSymbolsLength)
            generatedPassword += symbols.charAt(index)
         }

         setPassword(generatedPassword);
         symbols = "";
      }
   }, [isLookalike, isLower, isNumber, isSpecial, isUpper, passwordLength])

   function handleCopy(): void {
      navigator.clipboard.writeText(password)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
   }

   function handleGenerate(): void {
      let delay: number = 0

      for (let i = 0; i < 13; i++) {
         setTimeout(() => {
            generate();
         }, delay);
         delay += 50;
      }
   }

   function handleQR() {
      setIsOpenInfo(false)
      setIsOpenQR((prev) => !prev)
   }

   function handleInfo() {
      setIsOpenQR(false)
      setIsOpenInfo((prev) => !prev)
   }

   useEffect(() => {
      generate();
   }, [isLower, isUpper, isNumber, isSpecial, isLookalike, passwordLength, generate])

   useEffect(() => {
      handleGenerate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (<>
      <div className="top subheading-container">
         {<QrCodeIcon
            className="info-icon"
            onClick={handleQR}
         />}
         <h2>PasswordGenerator</h2>
         {<InformationCircleIcon
            className="info-icon"
            onClick={handleInfo}
         />}
      </div>
      {isOpenInfo && <Info onClick={handleInfo} />}
      {isOpenQR && <QR password={password} onClick={handleQR} />}
      {!isOpenInfo && !isOpenQR &&
         <div className="card-container">
            <div className="card big password">
               <span>{password}</span>
            </div>

            <div className="calc-container info dark">
               <span>{symbolsLength} <span className="desktop-text">mögliche</span> Zeichen</span>
            </div>
            <div className="length-container info">
               <span className="length">{passwordLength}</span>
            </div>
            <div className="entropy-container info dark">
               <Lock isFilled={true} size={entropy} />
            </div>

            <InputRange
               passwordLength={passwordLength}
               setPasswordLength={setPasswordLength}
               min={8}
               max={MAX_LENGTH}
               step={2}
            />

            <ToggleButton
               onClickHandler={activeCount == 1 ? () => setIsLower(true) : () => setIsLower((prev) => !prev)}
               state={isLower}
               textMobile={mobileText[0]}
               textDesktop={desktopText[0]}
            />
            <ToggleButton
               onClickHandler={activeCount == 1 ? () => setIsUpper(true) : () => setIsUpper((prev) => !prev)}
               state={isUpper}
               textMobile={mobileText[1]}
               textDesktop={desktopText[1]}
            />
            <ToggleButton
               onClickHandler={activeCount == 1 ? () => setIsNumber(true) : () => setIsNumber((prev) => !prev)}
               state={isNumber}
               textMobile={mobileText[2]}
               textDesktop={desktopText[2]}
            />
            <ToggleButton
               onClickHandler={activeCount == 1 ? () => setIsSpecial(true) : () => setIsSpecial((prev) => !prev)}
               state={isSpecial}
               textMobile={mobileText[3]}
               textDesktop={desktopText[3]}
            />
            <ToggleButton
               onClickHandler={() => setIsLookalike((prev) => !prev)}
               state={isLookalike}
               textMobile={mobileText[4]}
               textDesktop={desktopText[4]}
            />

            <CopyGenerateButtons
               handleCopy={handleCopy}
               handleGenerate={handleGenerate}
               isCopied={isCopied}
            />
         </div>}
   </>)
}