'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Link from 'next/link'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
}

interface MapProps {
  ramps: Ramp[]
  center?: [number, number]
  zoom?: number
  height?: string
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null
}

export default function Map({ ramps, center = [51.2538, -85.3232], zoom = 5, height = '600px' }: MapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        className="bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />
        {ramps.map((ramp) => (
          <Marker key={ramp.id} position={[ramp.lat, ramp.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{ramp.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Province:</span> {ramp.province}</p>
                  <p><span className="font-semibold">Type:</span> {ramp.type}</p>
                  {ramp.fee && <p><span className="font-semibold">Fee:</span> {ramp.fee}</p>}
                  <div className="flex gap-2 mt-2">
                    {ramp.parking && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">🅿️ Parking</span>}
                    {ramp.toilets && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">🚻 Toilets</span>}
                  </div>
                  <Link
                    href={`/ramp/${ramp.id}`}
                    className="block mt-2 bg-boat-blue-500 text-white px-3 py-1 rounded text-center hover:bg-boat-blue-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
