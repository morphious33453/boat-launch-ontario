import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Boat Ramp Locator | Find Boat Launches Across Canada',
  description: 'Find boat launches and ramps across Canada. Search by province, filter by amenities, and discover the perfect launch for your next boating adventure.',
  keywords: ['boat ramp', 'boat launch', 'Canada', 'Ontario', 'BC', 'boating', 'fishing', 'marina'],
  authors: [{ name: 'Boat Ramp Locator' }],
  openGraph: {
    title: 'Boat Ramp Locator | Find Boat Launches Across Canada',
    description: 'Find boat launches and ramps across Canada',
    url: 'https://boatramplocator.ca',
    siteName: 'Boat Ramp Locator',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat Ramp Locator | Find Boat Launches Across Canada',
    description: 'Find boat launches and ramps across Canada',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="font-sans">
        <nav className="bg-boat-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl">⚓</span>
                <span className="font-bold text-xl">Boat Ramp Locator</span>
              </Link>
              <div className="flex space-x-6">
                <Link href="/ontario" className="hover:text-boat-blue-200 transition">
                  Ontario
                </Link>
                <Link href="/bc" className="hover:text-boat-blue-200 transition">
                  BC
                </Link>
                <Link href="/shop" className="hover:text-boat-blue-200 transition">
                  Shop
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">About</h3>
                <p className="text-gray-400">
                  Find boat launches and ramps across Canada. Free, open data from government sources.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/ontario" className="hover:text-white">Ontario Ramps</Link></li>
                  <li><Link href="/bc" className="hover:text-white">BC Ramps</Link></li>
                  <li><Link href="/shop" className="hover:text-white">Shop Products</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Data Sources</h3>
                <p className="text-gray-400 text-sm">
                  Data from Ontario.ca, Open Canada, and OpenStreetMap contributors.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Boat Ramp Locator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
