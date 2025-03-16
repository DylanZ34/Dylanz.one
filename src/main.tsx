import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from "./components/Footer"
import './index.css'
import LeftPanel from "./components/LeftPanel"
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <LeftPanel
          title="Dylan Z."
          description="Passionate about classical music, composition, physics, quizbowl, and anything else I can model on."
        />
        <App />
        <Footer />
      </div>
    </Router>
  </StrictMode>,
)
