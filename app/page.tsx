'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SearchBar from '@/components/SearchBar'
import ProvinceFilter from '@/components/ProvinceFilter'
import RampCard from '@/components/RampCard'

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
})

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

export default function Home() {
  const [ramps, setRamps] = useState<Ramp[]>([])
  const [filteredRamps, setFilteredRamps] = useState<Ramp[]>([])
  const [selectedProvince, setSelectedProvince] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRamps()
  }, [])

  useEffect(() => {
    filterRamps()
  }, [ramps, selectedProvince, searchQuery])

  const fetchRamps = async () => {
    try {
      const response = await fetch('/api/ramps')
      const data = await response.json()
      setRamps(data.ramps || [])
      setFilteredRamps(data.ramps || [])
    } catch (error) {
      console.error('Error fetching ramps:', error)
      setRamps([])
      setFilteredRamps([])
    } finally {
      setIsLoading(false)
    }
  }

  const filterRamps = () => {
    let filtered = ramps

    // Filter by province
    if (selectedProvince !== 'all') {
      filtered = filtered.filter(
        (ramp) => ramp.province.toLowerCase() === selectedProvince.toLowerCase()
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (ramp) =>
          ramp.name.toLowerCase().includes(query) ||
          ramp.province.toLowerCase().includes(query) ||
          ramp.address?.toLowerCase().includes(query)
      )
    }

    setFilteredRamps(filtered)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-boat-blue-600 to-boat-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Find Your Perfect Boat Launch</h1>
            <p className="text-xl mb-8">
              Discover over 500+ boat ramps and launches across Canada
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} placeholder="Search by name or location..." />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <ProvinceFilter
                selectedProvince={selectedProvince}
                onProvinceChange={handleProvinceChange}
              />
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">Results</h3>
                <p className="text-2xl font-bold text-boat-blue-600">{filteredRamps.length}</p>
                <p className="text-sm text-gray-600">boat ramps found</p>
              </div>
            </div>
          </div>

          {/* Map and Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="h-[600px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Loading ramps...</p>
              </div>
            ) : (
              <>
                {/* Map */}
                <div className="mb-8">
                  <Map ramps={filteredRamps} center={[51.2538, -85.3232]} zoom={5} height="600px" />
                </div>

                {/* Results Grid */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {searchQuery
                      ? `Search results for "${searchQuery}"`
                      : selectedProvince !== 'all'
                      ? `Boat Ramps in ${selectedProvince}`
                      : 'All Boat Ramps'}
                  </h2>
                  {filteredRamps.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        No boat ramps found. Try adjusting your filters.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredRamps.map((ramp) => (
                        <RampCard key={ramp.id} {...ramp} />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prep Your Boat for Launch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get your boat registration numbers, custom decals, and more
          </p>
          <a
            href="/shop"
            className="inline-block bg-boat-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-boat-blue-700 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  )
}
