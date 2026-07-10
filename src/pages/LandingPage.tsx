import { Link } from 'react-router-dom'
import '../App.css'

export default function LandingPage() {

   return (<>
      <div className="landing">
         <Link to="/password">
            <div className="card dark landing-card" >
               <span>Password</span>
               <span className="example">mEZ=g&K2YfkX7c+p#f6fx</span>
            </div>
         </Link>

         <Link to="/passphrase">
            <div className="card dark landing-card" >
               <span>Passphrase</span>
               <span className="example">Potato+Pretending+Significance</span>
            </div>
         </Link>
      </div>
   </>)
}