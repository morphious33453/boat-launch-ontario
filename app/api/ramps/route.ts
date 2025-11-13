import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const province = searchParams.get('province')
    const type = searchParams.get('type')
    const free = searchParams.get('free')

    // Build query filters
    const where: any = {
      approved: true,
    }

    if (province && province !== 'all') {
      where.province = {
        equals: province,
        mode: 'insensitive',
      }
    }

    if (type && type !== 'all') {
      where.type = type
    }

    if (free === 'true') {
      where.OR = [
        { fee: null },
        { fee: 'Free' },
        { fee: '$0' },
      ]
    }

    const ramps = await prisma.ramp.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        lat: true,
        lng: true,
        province: true,
        type: true,
        fee: true,
        parking: true,
        toilets: true,
        fourWD: true,
        photo: true,
        address: true,
        description: true,
      },
    })

    return NextResponse.json({
      success: true,
      count: ramps.length,
      ramps,
    })
  } catch (error) {
    console.error('Error fetching ramps:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ramps', ramps: [] },
      { status: 500 }
    )
  }
}
