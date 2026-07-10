import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.tsx"
import LandingPage from "./pages/LandingPage";
import PasswordPage from './pages/PasswordPage.tsx'
import PassphrasePage from './pages/PassphrasePage.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Router>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<LandingPage />} />
               <Route path="/password" element={<PasswordPage />} />
               <Route path="/passphrase" element={<PassphrasePage />} />
            </Route>
         </Routes>
      </Router>
   </StrictMode>,
)
