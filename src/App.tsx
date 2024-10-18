import './App.css'

import { useState, useEffect } from "react"

export default function App() {

   const [isLower, setIsLower] = useState(true);
   const [isUpper, setIsUpper] = useState(false);
   const [isNumber, setIsNumber] = useState(false);
   const [isSpecial, setIsSpecial] = useState(false);
   const [password, setPassword] = useState("password")
   const [passwordLength, setPasswordLength] = useState(8)
   const [fontsize, setFontsize] = useState(64)

   const lower = "abcdefghijklmnopqrstuvwxyz"
   const upper = lower.toUpperCase()
   const numbers = "0123456789"
   const special = "!#$%&'()*+,-./:;<=>?@[\\]^_{|}~"

   let symbols = "";
   let pw = "";
   let symbolsLength = 0;
   let size = 0;

   useEffect(() => {

      generate();

   }, [isLower, isUpper, isNumber, isSpecial, passwordLength])

   function generate() {
      console.log("generate")
      symbolsLength = 0
      if (isLower) {
         symbols += lower;
         symbolsLength += lower.length;
      }
      if (isUpper) {
         symbols += upper;
         symbolsLength += upper.length;
      }
      if (isNumber) {
         symbols += numbers;
         symbolsLength += numbers.length;
      }
      if (isSpecial) {
         symbols += special;
         symbolsLength += special.length;
      }

      if (isLower || isUpper || isNumber || isSpecial) {

         pw = getPassword(symbols, symbolsLength)
         setPassword(pw)
         symbols = ""
         pw = ""

         /*
                  if (passwordLength >= 8 && passwordLength < 10) {
                     size = 86;
                  } else if (passwordLength >= 10 && passwordLength < 22) {
                     size = 70;
                  } else if (passwordLength >= 22 && passwordLength < 28) {
                     size = 61;
                  } else if (passwordLength >= 28 && passwordLength < 36) {
                     size = 45;
                  } else if (passwordLength >= 36 && passwordLength < 46) {
                     size = 37;
                  } else if (passwordLength >= 46 && passwordLength < 52) {
                     size = 32;
                  } else if (passwordLength >= 52 && passwordLength < 60) {
                     size = 27;
                  } else if (passwordLength >= 60 && passwordLength <= 64) {
                     size = 24;
                  } else if (passwordLength === 64) {
                     size = 23;
                  }
         */


         //passwordLength
         //size

         size = 1500 * (1 / passwordLength)

         setFontsize(size)


      }

   }

   function getPassword(symbols: string, symbolsLength: number) {
      let symbol = ""
      let index = 0
      pw = ""

      for (let i = 0; i < passwordLength; i++) {
         index = Math.floor(Math.random() * symbolsLength)
         symbol = symbols.charAt(index);
         pw += symbol
      }
      return (pw)
   }

   function copy() {
      navigator.clipboard.writeText(password)
   }

   function handleCopy() {
      copy()
   }

   function handleGenerate() {

      let delay = 0

      for (let i = 0; i < 13; i++) {
         setTimeout(() => {
            generate();
         }, delay);
         delay += 50;
      }
   }

   function handleEasterEgg() {
      console.log("easteregg")
   }

   return (<>

      <h1>Passwort Generator</h1>
      <h2>({passwordLength}-stellig)</h2>
      <div className="card-container">

         <div className="card big password" style={{ fontSize: fontsize + "pt" }}>
            {(!isLower && !isUpper && !isNumber && !isSpecial) ? <span onClick={handleEasterEgg}>🔒</span> : <span>{password}</span>}

         </div>

         <div className="card big input dark">
            <input type="range"
               min="8"
               max="64"
               step="2"
               // eslint-disable-next-line @typescript-eslint/no-unused-expressions
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPasswordLength(parseInt(e.target.value, 10)); generate(); }}
               value={passwordLength}
            />
         </div>
         <div onClick={() => setIsLower(prev => !prev)} className={`card smallest ${isLower ? "green" : "red"}`}>Kleinbuchstaben</div>
         <div onClick={() => setIsUpper(prev => !prev)} className={`card smallest ${isUpper ? "green" : "red"}`}>Großbuchstaben</div>
         <div onClick={() => setIsNumber(prev => !prev)} className={`card smallest ${isNumber ? "green" : "red"}`}>Zahlen</div>
         <div onClick={() => setIsSpecial(prev => !prev)} className={`card smallest ${isSpecial ? "green" : "red"}`}>Sonderzeichen</div>
         <div onClick={handleGenerate} className="card mid dark">Generieren</div>
         <div onClick={handleCopy} className="card mid dark" >Kopieren</div>
      </div >

   </>)
}