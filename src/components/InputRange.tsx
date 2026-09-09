export default function InputRange({ passwordLength, setPasswordLength, min, max, step }: { passwordLength: number, setPasswordLength: (length: number) => void, min: number, max: number, step: number }) {

   return (<>
      <div className="big input dark">
         <span className="input-minmax">{min}</span>
         <label htmlFor="pw-length" className="sr-only">Passwortlänge</label>
         <input type="range"
            className="slider"
            id="pw-length"
            min={min}
            max={max}
            step={step}
            onChange={
               (e) => {
                  setPasswordLength(parseInt(e.target.value, 10));
               }
            }
            value={passwordLength}
         />
         <span className="input-minmax">{max}</span>
      </div>
   </>)
}