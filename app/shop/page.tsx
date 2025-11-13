import Image from 'next/image'
import ShopifyBuyButton from '@/components/ShopifyBuyButton'
import { SHOPIFY_PRODUCTS } from '@/lib/shopify'

export const metadata = {
  title: 'Shop Boat Products | Boat Ramp Locator',
  description: 'Get your boat registration numbers, custom decals, and stickers. Marine-grade vinyl products for Canadian boaters.',
}

export default function ShopPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-boat-blue-600 to-boat-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Boat Products & Accessories
          </h1>
          <p className="text-xl">
            Marine-grade vinyl products for Canadian boaters. Meet Transport Canada requirements.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product 1 - Registration Numbers */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-boat-blue-400 to-boat-blue-600 flex items-center justify-center">
              <span className="text-white text-8xl font-bold">ABC 123</span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{SHOPIFY_PRODUCTS.REG_NUMBER.title}</h2>
              <p className="text-gray-600 mb-4">{SHOPIFY_PRODUCTS.REG_NUMBER.description}</p>
              <div className="mb-4">
                <p className="text-3xl font-bold text-boat-blue-600">{SHOPIFY_PRODUCTS.REG_NUMBER.price}</p>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-6 space-y-1">
                <li>3-inch block letters and numbers</li>
                <li>Marine-grade vinyl</li>
                <li>UV and water resistant</li>
                <li>Meets Transport Canada requirements</li>
                <li>Easy application</li>
              </ul>
              <ShopifyBuyButton product={SHOPIFY_PRODUCTS.REG_NUMBER} />
            </div>
          </div>

          {/* Product 2 - Boat Name Decal */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white text-5xl font-bold italic">Sea Serpent</span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{SHOPIFY_PRODUCTS.BOAT_NAME.title}</h2>
              <p className="text-gray-600 mb-4">{SHOPIFY_PRODUCTS.BOAT_NAME.description}</p>
              <div className="mb-4">
                <p className="text-3xl font-bold text-boat-blue-600">{SHOPIFY_PRODUCTS.BOAT_NAME.price}</p>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-6 space-y-1">
                <li>Custom text up to 20 characters</li>
                <li>Multiple font styles available</li>
                <li>Weather-resistant vinyl</li>
                <li>Various sizes and colors</li>
                <li>Professional finish</li>
              </ul>
              <ShopifyBuyButton product={SHOPIFY_PRODUCTS.BOAT_NAME} />
            </div>
          </div>

          {/* Product 3 - Sticker Pack */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <div className="text-white text-6xl space-x-2">
                <span>⚓</span>
                <span>🚤</span>
                <span>🎣</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{SHOPIFY_PRODUCTS.STICKER_PACK.title}</h2>
              <p className="text-gray-600 mb-4">{SHOPIFY_PRODUCTS.STICKER_PACK.description}</p>
              <div className="mb-4">
                <p className="text-3xl font-bold text-boat-blue-600">{SHOPIFY_PRODUCTS.STICKER_PACK.price}</p>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-6 space-y-1">
                <li>Set of 5 unique designs</li>
                <li>Waterproof and UV resistant</li>
                <li>Perfect for coolers and tackle boxes</li>
                <li>3-5 inch sizes</li>
                <li>Great gift for boaters</li>
              </ul>
              <ShopifyBuyButton product={SHOPIFY_PRODUCTS.STICKER_PACK} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-boat-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🇨🇦
              </div>
              <h3 className="text-xl font-bold mb-2">Canadian Compliant</h3>
              <p className="text-gray-600">
                All registration numbers meet Transport Canada vessel identification requirements
              </p>
            </div>
            <div className="text-center">
              <div className="bg-boat-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                💪
              </div>
              <h3 className="text-xl font-bold mb-2">Marine Grade Quality</h3>
              <p className="text-gray-600">
                Premium vinyl designed to withstand harsh marine environments and UV exposure
              </p>
            </div>
            <div className="text-center">
              <div className="bg-boat-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick processing and shipping to get you back on the water faster
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-boat-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-6">
            Not sure which product is right for you? Check out our boat launch locations first!
          </p>
          <a
            href="/"
            className="inline-block bg-white text-boat-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Find a Boat Ramp
          </a>
        </div>
      </section>
    </div>
  )
}
