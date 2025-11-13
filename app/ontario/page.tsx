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

export default function OntarioPage() {
  const [ramps, setRamps] = useState<Ramp[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOntarioRamps()
  }, [])

  const fetchOntarioRamps = async () => {
    try {
      const response = await fetch('/api/ramps?province=ontario')
      const data = await response.json()
      setRamps(data.ramps || [])
    } catch (error) {
      console.error('Error fetching Ontario ramps:', error)
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
            Ontario Boat Launches
          </h1>
          <p className="text-xl">
            Explore {ramps.length}+ boat ramps across Ontario's beautiful lakes and rivers
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
                center={[45.4215, -75.6972]} // Ottawa coordinates
                zoom={7}
                height="600px"
              />
            </div>

            {/* SEO Content */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Complete Guide to Ontario Boat Launches
              </h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  Ontario boasts thousands of freshwater lakes and rivers, making it a premier destination
                  for boating enthusiasts. Our comprehensive database includes boat launches across:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li><strong>Lake Ontario</strong> - Access points along the Great Lake shoreline</li>
                  <li><strong>Muskoka Region</strong> - Premium cottage country boat launches</li>
                  <li><strong>Ottawa River</strong> - Public and private access points</li>
                  <li><strong>Lake Simcoe</strong> - Popular fishing and recreation spots</li>
                  <li><strong>Kawartha Lakes</strong> - Scenic waterway access</li>
                  <li><strong>Georgian Bay</strong> - Rocky shore and island access</li>
                </ul>
                <h3 className="text-2xl font-bold mb-4">What You'll Find</h3>
                <p className="text-gray-700 mb-4">
                  Each boat launch listing includes detailed information about parking availability,
                  washroom facilities, launch fees, and accessibility. Many sites offer free public
                  access maintained by Ontario Parks, Conservation Authorities, and local municipalities.
                </p>
                <h3 className="text-2xl font-bold mb-4">Before You Launch</h3>
                <p className="text-gray-700 mb-4">
                  Ensure your boat is properly registered with Transport Canada. Visit our shop to
                  order compliant registration numbers and custom boat decals.
                </p>
              </div>
            </div>

            {/* Ramps Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Ontario Boat Ramps</h2>
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
