import Link from 'next/link'
import Image from 'next/image'

interface RampCardProps {
  id: string
  name: string
  province: string
  type: string
  fee?: string | null
  parking: boolean
  toilets: boolean
  fourWD: boolean
  photo?: string | null
  address?: string | null
}

export default function RampCard({
  id,
  name,
  province,
  type,
  fee,
  parking,
  toilets,
  fourWD,
  photo,
  address,
}: RampCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-br from-boat-blue-400 to-boat-blue-600">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-6xl">⚓</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        {address && (
          <p className="text-sm text-gray-600 mb-2">{address}</p>
        )}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-boat-blue-100 text-boat-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {province}
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {type}
          </span>
        </div>
        {fee && (
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Fee:</span> {fee}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {parking && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              🅿️ Parking
            </span>
          )}
          {toilets && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              🚻 Toilets
            </span>
          )}
          {fourWD && (
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
              🚙 4WD Recommended
            </span>
          )}
        </div>
        <Link
          href={`/ramp/${id}`}
          className="block w-full bg-boat-blue-600 text-white text-center py-2 rounded-lg hover:bg-boat-blue-700 transition-colors duration-200 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
