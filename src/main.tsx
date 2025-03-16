import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProductShowcase from "./components/ProductShowcase"
import Footer from "./components/Footer"
import './index.css'
import MarkdownArticle from "./components/MarkdownArticle"
import LeftPanel from "./components/LeftPanel"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen bg-black text-white">
      <LeftPanel
        title="Dylan Z."
        description="Passionate about classical music, composition, physics, quizbowl, and anything else I can model on."
      />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-3/4 md:ml-[25%] p-6 md:p-8">
          <Router>
            <Routes>
              <Route path="/" element={<ProductShowcase />} />
              <Route path="/quizbowl-fun" element={<MarkdownArticle markdownFilePath="/quizbowl-fun.md" />} />
              <Route path="/learning-planner" element={<MarkdownArticle markdownFilePath="/learning-planner.md" />} />
              <Route path="/making-music" element={<MarkdownArticle markdownFilePath="/making-music.md" />} />
              <Route path="/physics-and-astronomy" element={<MarkdownArticle markdownFilePath="/physics-and-astronomy.md" />} />
              <Route path="/the-hudge" element={<MarkdownArticle markdownFilePath="/the-hudge.md" />} />
              <Route path="/calm-me-down" element={<MarkdownArticle markdownFilePath="/calm-me-down.md" />} />
            </Routes>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  </StrictMode>,
)
