"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
interface Product {
  id: number
  title: string
  summary: string
  image: string
  description: string
  learnMore: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const getImage = (imageName: string) => {
    return new URL(`../assets/products/${imageName}`, import.meta.url).href;
  };

  const imagePath = getImage(product.image);

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="h-80 w-full perspective-1000 cursor-pointer" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
          <div className="h-1/2 relative">
            <img src={imagePath || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-400">{product.summary}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-lg overflow-hidden border border-gray-800 rotate-y-180 p-6 flex flex-col items-center justify-center">
          <p className="text-gray-300">{product.description}</p>
          {product.learnMore && (
            <div className="text-blue-500 hover:text-blue-600 w-full text-right">
              <Link to={product.learnMore}>
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

