'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ShopifyBuyButton from '@/components/ShopifyBuyButton'
import { SHOPIFY_PRODUCTS } from '@/lib/shopify'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

interface Ramp {
  id: string
  name: string
  lat: number
  lng: number
  province: string
  type: string
  fee?: string | null
  parking: boolean
  toilets: boolean
  fourWD: boolean
  photo?: string | null
  description?: string | null
  address?: string | null
}

export default function RampDetailPage() {
  const params = useParams()
  const [ramp, setRamp] = useState<Ramp | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchRamp(params.id as string)
    }
  }, [params.id])

  const fetchRamp = async (id: string) => {
    try {
      const response = await fetch(`/api/ramps/${id}`)
      const data = await response.json()
      setRamp(data.ramp)
    } catch (error) {
      console.error('Error fetching ramp:', error)
      setRamp(null)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!ramp) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ramp Not Found</h1>
          <p className="text-gray-600 mb-8">
            The boat ramp you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-block bg-boat-blue-600 text-white px-6 py-3 rounded-lg hover:bg-boat-blue-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Image Section */}
      <section className="relative h-96 bg-gradient-to-br from-boat-blue-400 to-boat-blue-600">
        {ramp.photo ? (
          <Image src={ramp.photo} alt={ramp.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-9xl">⚓</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{ramp.name}</h1>
            {ramp.address && <p className="text-xl text-white">{ramp.address}</p>}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Ramp Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Province</p>
                  <p className="font-semibold text-lg">{ramp.province}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-lg capitalize">{ramp.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fee</p>
                  <p className="font-semibold text-lg">{ramp.fee || 'Free'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coordinates</p>
                  <p className="font-semibold text-sm">
                    {ramp.lat.toFixed(4)}, {ramp.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className={`flex items-center gap-2 ${ramp.parking ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="text-2xl">🅿️</span>
                  <span className="font-medium">Parking</span>
                </div>
                <div className={`flex items-center gap-2 ${ramp.toilets ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="text-2xl">🚻</span>
                  <span className="font-medium">Toilets</span>
                </div>
                <div className={`flex items-center gap-2 ${ramp.fourWD ? 'text-orange-600' : 'text-gray-400'}`}>
                  <span className="text-2xl">🚙</span>
                  <span className="font-medium">4WD</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {ramp.description && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{ramp.description}</p>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <Map ramps={[ramp]} center={[ramp.lat, ramp.lng]} zoom={13} height="400px" />
              <div className="mt-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${ramp.lat},${ramp.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-boat-blue-600 text-white px-4 py-2 rounded-lg hover:bg-boat-blue-700 transition"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Shop */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Prep Your Boat</h2>
              <p className="text-gray-600 mb-6">
                Get your boat ready for launch with our marine-grade products
              </p>

              {/* Product Cards */}
              <div className="space-y-6">
                {/* Registration Numbers */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">{SHOPIFY_PRODUCTS.REG_NUMBER.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{SHOPIFY_PRODUCTS.REG_NUMBER.description}</p>
                  <p className="text-2xl font-bold text-boat-blue-600 mb-3">
                    {SHOPIFY_PRODUCTS.REG_NUMBER.price}
                  </p>
                  <ShopifyBuyButton product={SHOPIFY_PRODUCTS.REG_NUMBER} />
                </div>

                {/* Boat Name Decal */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">{SHOPIFY_PRODUCTS.BOAT_NAME.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{SHOPIFY_PRODUCTS.BOAT_NAME.description}</p>
                  <p className="text-2xl font-bold text-boat-blue-600 mb-3">
                    {SHOPIFY_PRODUCTS.BOAT_NAME.price}
                  </p>
                  <ShopifyBuyButton product={SHOPIFY_PRODUCTS.BOAT_NAME} />
                </div>

                {/* Sticker Pack */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">{SHOPIFY_PRODUCTS.STICKER_PACK.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{SHOPIFY_PRODUCTS.STICKER_PACK.description}</p>
                  <p className="text-2xl font-bold text-boat-blue-600 mb-3">
                    {SHOPIFY_PRODUCTS.STICKER_PACK.price}
                  </p>
                  <ShopifyBuyButton product={SHOPIFY_PRODUCTS.STICKER_PACK} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
