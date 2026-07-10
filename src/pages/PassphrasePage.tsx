import '../App.css'

import { useState, useEffect } from "react"

import words from "../words"
import { InformationCircleIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import QR from '../components/QR';

export default function PassphrasePage() {

   const [isUpper, setIsUpper] = useState<boolean>(true);
   const [isDivider, setIsDivider] = useState<boolean>(true);

   const [password, setPassword] = useState<string>("password")
   const [passwordLength, setPasswordLength] = useState<number>(3)
   const [fontsize, setFontsize] = useState<number>(64)
   const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

   const [isOpenQR, setIsOpenQR] = useState<boolean>(false)

   const desktopText: string[] = ["Großbuchstaben", "Trennzeichen"]
   const mobileText: string[] = ["ABC", "#+%="]

   //let symbols: string[] = words;
   let pw: string = "";
   //let symbolsLength: number = 0;
   let size: number = 0;
   let buttonsText: string[] = [];

   const divider: string[] = ["", "-", "+", "%", "=", "x", "_", "#", "*", "$", "@"]

   useEffect(() => {
      generate();
      //console.log("activeCount: " + activeCount)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isUpper, isDivider, passwordLength])

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

   function generate(): void {
      pw = getPassword()
      setPassword(pw)
      pw = ""

      if (windowWidth < 1100) {
         size = 220 * (1 / passwordLength)
      } else {
         size = 12 * (1 / passwordLength)
      }
      setFontsize(size)
   }

   function getPassword() {

      let word: string = ""
      let index: number = 0
      pw = ""

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

   if (windowWidth <= 1024) {
      buttonsText = mobileText
   } else {
      buttonsText = desktopText
   }

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
            style={{ fontSize: fontsize + "em" }}
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
            className={`card smallest phrase ${isUpper ? "on" : "off"}`}> {buttonsText[0]}
         </div>
         < div
            onClick={() => setIsDivider(prev => !prev)}
            className={`card smallest phrase ${isDivider ? "on" : "off"}`}> {buttonsText[1]}
         </div>

         <div onClick={handleCopy} className="card mid dark copy"> Kopieren </div>
         <div onClick={handleGenerate} className="card mid dark" > Generieren </div>
      </div>}
   </>)
}