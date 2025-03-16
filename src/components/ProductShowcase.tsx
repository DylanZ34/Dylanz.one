"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"

export default function ProductShowcase() {
  const [products] = useState([
    {
      "id": 1,
      "title": "Quizbowl Fun",
      "summary": "Notes and resources for quizbowl",
      "image": "01_quizbowl.jpg",
      "description": "Notes and resources for quizbowl",
      "learnMore": "/quizbowl-fun"
    },
    {
      "id": 2,
      "title": "Learning Planner",
      "summary": "Personalized AI study and training guide.",
      "image": "02_learning_planner.jpg",
      "description": "Creates tailored learning plans, tracks progress, and suggests resources to optimize study time for students and professionals.",
      "learnMore": "/learning-planner"
    },
    {
      "id": 3,
      "title": "Making Music",
      "summary": "My compositions",
      "image": "03_composition.jpg",
      "description": "Collection of my compositions, performances, and other musical endeavors.",
      "learnMore": "/making-music"
    },
    {
      "id": 4,
      "title": "Physics and Astronomy",
      "summary": "Notes and resources for physics",
      "image": "04_physics.jpg",
      "description": "Notes and resources for physics and astronomy",
      "learnMore": "/physics-and-astronomy"
    },
    {
      "id": 5,
      "title": "The Hudge",
      "summary": "An imaginary nation",
      "image": "05_hudge.jpg",
      "description": "An imaginary nation with full set of laws, currency, and a constitution.",
      "learnMore": "/the-hudge"
    },
    {
      "id": 10,
      "title": "Calm Me Down",
      "summary": "AI-guided relaxation and stress relief.",
      "image": "10_calm_me_down.jpg",
      "description": "Provides breathing exercises, meditation guidance, and soothing content to help manage stress and anxiety.",
      "learnMore": "/calm-me-down"
    }
  ])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

