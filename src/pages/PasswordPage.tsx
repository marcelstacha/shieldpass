import '../App.css'

import { InformationCircleIcon, QrCodeIcon, LockClosedIcon, StopIcon } from "@heroicons/react/24/outline";

import { useState, useEffect } from "react"
import { JSX } from 'react/jsx-runtime';

import Info from '../components/Info';
import QR from '../components/QR';

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
   const [symbolsLength, setSymbolsLength] = useState<number>(0)
   const [fontsize, setFontsize] = useState<number>(64)
   const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

   const lower: string[] = ["abcdefghijklmnopqrstuvwxyz", "abcdefghjkmnpqrtuvwxyz"]
   const upper: string[] = [lower[0].toUpperCase(), lower[1].toUpperCase().concat("L")]
   const numbers: string[] = ["0123456789", "2346789"]
   const special: string[] = ["@#&*=^_~", "#&*=^_~"]

   const desktopText: string[] = ["Kleinbuchstaben", "Großbuchstaben", "Zahlen", "Sonderzeichen", "Lookalike"]
   const mobileText: string[] = ["abc", "ABC", "123", "?#%", "oO0"]

   const lockOutput: JSX.Element[] = []
   const activeCount: number = Number(isLower) + Number(isUpper) + Number(isNumber) + Number(isSpecial)

   const MAX_LENGTH = 48

   let symbols: string = "";
   let pw: string = "";
   let size: number = 0;
   let buttonsText: string[] = [];

   const entropy = calculateEntropy()
   let entropyRating = 0

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

   useEffect(() => {
      generate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLower, isUpper, isNumber, isSpecial, isLookalike, passwordLength])

   useEffect(() => {
      handleGenerate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   function getLockIcons() {
      let fill
      switch (entropyRating) {
         case 1: fill = "#ff3b3b"
            break
         case 5: fill = "var(--on)"
            break
         default: fill = "var(--font)"
            break
      }
      for (let i = 0; i < entropyRating; i++) {
         lockOutput.push(<LockClosedIcon key={i} width="1rem" strokeWidth="2.5px" stroke={fill} />)
      }
      const openIconCount = 5 - entropyRating
      if (openIconCount == 0) return lockOutput

      for (let i = 0; i < openIconCount; i++) {
         lockOutput.push(<StopIcon key={i + 5} width="1rem" strokeWidth="2.5px" stroke={entropyRating == 0 ? "#ff3b3b" : "#666"} />)
      }
      return lockOutput
   }

   function calculateEntropy() {
      return passwordLength * Math.log(symbolsLength) / Math.log(2);
   }

   function generate(): void {
      symbols = "";
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
         pw = getPassword(symbols, calculatedSymbolsLength)
         setPassword(pw);
         symbols = "";
         pw = "";

         if (windowWidth <= 1680) {
            size = 100 * (1 / passwordLength);
         } else {
            size = 128 * (1 / passwordLength);
         }
         setFontsize(size);
      }
   }

   function getPassword(symbols: string, symbolsLength: number) {
      let symbol: string = ""
      let index: number = 0
      pw = ""

      for (let i = 0; i < passwordLength; i++) {
         index = Math.floor(Math.random() * symbolsLength)
         symbol = symbols.charAt(index);
         pw += symbol
      }
      return (pw)
   }

   function handleCopy(): void {
      navigator.clipboard.writeText(password)
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

   if (windowWidth <= 1024) {
      buttonsText = mobileText
   } else {
      buttonsText = desktopText
   }

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
            <div
               className="card big password"
               style={{ fontSize: fontsize + "em" }}
            >
               <span>{password}</span>
            </div>

            <div className="calc-container info dark">
               <span>{symbolsLength} Zeichen</span>
            </div>
            <div className="length-container info">
               <span className="length">{passwordLength}</span>
            </div>
            <div className="entropy-container info dark">
               {getLockIcons()}
            </div>

            <div className="big input dark">
               <input type="range"
                  min="8"
                  max={MAX_LENGTH}
                  step="2"
                  onChange={
                     (e) => {
                        setPasswordLength(parseInt(e.target.value, 10));
                        generate();
                     }
                  }
                  value={passwordLength}
               />
            </div>

            <div
               onClick={activeCount == 1 ? () => setIsLower(true) : () => setIsLower(prev => !prev)}
               className={`card smallest ${isLower ? "on" : "off"}`}>{buttonsText[0]}
            </div>
            <div
               onClick={activeCount == 1 ? () => setIsUpper(true) : () => setIsUpper(prev => !prev)}
               className={`card smallest ${isUpper ? "on" : "off"}`}>{buttonsText[1]}
            </div>
            <div
               onClick={activeCount == 1 ? () => setIsNumber(true) : () => setIsNumber(prev => !prev)}
               className={`card smallest ${isNumber ? "on" : "off"}`}>{buttonsText[2]}
            </div>
            <div
               onClick={activeCount == 1 ? () => setIsSpecial(true) : () => setIsSpecial(prev => !prev)}
               className={`card smallest ${isSpecial ? "on" : "off"}`}>{buttonsText[3]}
            </div>
            <div
               onClick={() => setIsLookalike(prev => !prev)}
               className={`card smallest ${isLookalike ? "on" : "off"}`}>{buttonsText[4]}
            </div>

            <div onClick={handleCopy} className="card mid dark">Kopieren</div>
            <div onClick={handleGenerate} className="card mid dark">Generieren</div>
         </div>}
   </>)
}