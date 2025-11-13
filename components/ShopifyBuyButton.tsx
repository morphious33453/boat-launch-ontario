'use client'

import { useState } from 'react'
import { ShopifyProduct } from '@/lib/shopify'

interface ShopifyBuyButtonProps {
  product: ShopifyProduct
}

export default function ShopifyBuyButton({ product }: ShopifyBuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleBuyClick = () => {
    setIsLoading(true)

    // In production, this would integrate with Shopify's Buy Button SDK
    // For now, we'll simulate the redirect
    const store = process.env.NEXT_PUBLIC_SHOPIFY_STORE || 'your-store.myshopify.com'
    const buyUrl = `https://${store}/cart/${product.id}:1`

    // Open in new tab
    window.open(buyUrl, '_blank')

    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <button
      onClick={handleBuyClick}
      disabled={isLoading}
      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </span>
      ) : (
        `Buy Now - ${product.price}`
      )}
    </button>
  )
}
