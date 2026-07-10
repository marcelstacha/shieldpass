import { useMemo } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

import '../App.css'

export default function Layout() {

   const location = useLocation();
   const { pathname } = location;

   const passwordPath = "/password"
   const passphrasePath = "/passphrase"

   const date: number = useMemo(() => {
      return new Date().getFullYear()
   }, [])

   return (<>
      <nav className="navbar">
         <ul>
            <li className={pathname == passwordPath ? "active" : ""}>
               <NavLink to={passwordPath}>PasswordGenerator</NavLink>
            </li>
            <li className={pathname == passphrasePath ? "active" : ""}>
               <NavLink to={passphrasePath}>PassphraseGenerator</NavLink>
            </li>
         </ul>
      </nav>

      <header className="heading">
         <img className="shield" src="shield.svg"></img>
         <h1>Shieldpass 3.0 </h1>
      </header>

      <main>
         <div className="wrapper">
            <Outlet />
         </div>
      </main>

      <footer>
         <p className="copyright">Marcel Stacha &copy;{date}</p>
      </footer>
   </>)
}