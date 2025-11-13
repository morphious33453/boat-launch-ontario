'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RampCard from '@/components/RampCard'

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
  address?: string | null
}

export default function BCPage() {
  const [ramps, setRamps] = useState<Ramp[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBCRamps()
  }, [])

  const fetchBCRamps = async () => {
    try {
      const response = await fetch('/api/ramps?province=bc')
      const data = await response.json()
      setRamps(data.ramps || [])
    } catch (error) {
      console.error('Error fetching BC ramps:', error)
      setRamps([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-boat-blue-700 to-boat-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            British Columbia Boat Launches
          </h1>
          <p className="text-xl">
            Discover {ramps.length}+ coastal and lake boat ramps across BC
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="h-[600px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Loading ramps...</p>
          </div>
        ) : (
          <>
            {/* Map */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Interactive Map</h2>
              <Map
                ramps={ramps}
                center={[49.2827, -123.1207]} // Vancouver coordinates
                zoom={7}
                height="600px"
              />
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6">
                BC Boat Launch Directory
              </h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  British Columbia offers unparalleled boating opportunities along its vast Pacific
                  coastline and pristine inland lakes. Find boat launches at:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li><strong>Vancouver Island</strong> - Coastal access and protected harbors</li>
                  <li><strong>Okanagan Lakes</strong> - Popular summer recreation destinations</li>
                  <li><strong>Lower Mainland</strong> - Fraser River and coastal access</li>
                  <li><strong>Kootenay Region</strong> - Mountain lake launches</li>
                  <li><strong>Gulf Islands</strong> - Island hopping access points</li>
                  <li><strong>Skeena Region</strong> - Northern wilderness waters</li>
                </ul>
                <h3 className="text-2xl font-bold mb-4">Launch Conditions</h3>
                <p className="text-gray-700 mb-4">
                  BC's diverse geography means launch conditions vary significantly. Coastal launches
                  require tidal awareness, while interior lake ramps may have seasonal water level
                  changes. Always check current conditions before heading out.
                </p>
              </div>
            </div>

            {/* Ramps Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All BC Boat Ramps</h2>
              {ramps.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No boat ramps found. Check back soon as we add more locations!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ramps.map((ramp) => (
                    <RampCard key={ramp.id} {...ramp} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
