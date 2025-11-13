import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://boatramplocator.ca'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ontario`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bc`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Fetch all ramps for dynamic pages
  let rampPages: MetadataRoute.Sitemap = []
  try {
    const ramps = await prisma.ramp.findMany({
      where: { approved: true },
      select: { id: true, updatedAt: true },
    })

    rampPages = ramps.map((ramp) => ({
      url: `${baseUrl}/ramp/${ramp.id}`,
      lastModified: ramp.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return [...staticPages, ...rampPages]
}
