import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ramp = await prisma.ramp.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!ramp) {
      return NextResponse.json(
        { success: false, error: 'Ramp not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      ramp,
    })
  } catch (error) {
    console.error('Error fetching ramp:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ramp' },
      { status: 500 }
    )
  }
}
