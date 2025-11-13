'use client'

interface ProvinceFilterProps {
  selectedProvince: string
  onProvinceChange: (province: string) => void
}

const PROVINCES = [
  { code: 'all', name: 'All Provinces' },
  { code: 'ontario', name: 'Ontario' },
  { code: 'bc', name: 'British Columbia' },
  { code: 'quebec', name: 'Quebec' },
  { code: 'alberta', name: 'Alberta' },
  { code: 'manitoba', name: 'Manitoba' },
  { code: 'saskatchewan', name: 'Saskatchewan' },
  { code: 'nova-scotia', name: 'Nova Scotia' },
  { code: 'new-brunswick', name: 'New Brunswick' },
  { code: 'newfoundland', name: 'Newfoundland' },
]

export default function ProvinceFilter({ selectedProvince, onProvinceChange }: ProvinceFilterProps) {
  return (
    <div className="w-full">
      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Province
      </label>
      <select
        id="province"
        value={selectedProvince}
        onChange={(e) => onProvinceChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-boat-blue-500 focus:border-transparent"
      >
        {PROVINCES.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
  )
}
