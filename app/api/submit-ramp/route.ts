import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, lat, lng, province, type } = body

    if (!name || !lat || !lng || !province || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate coordinates
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid coordinates' },
        { status: 400 }
      )
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { success: false, error: 'Coordinates out of range' },
        { status: 400 }
      )
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        name,
        lat,
        lng,
        province,
        type,
        fee: body.fee || null,
        parking: body.parking || false,
        toilets: body.toilets || false,
        fourWD: body.fourWD || false,
        description: body.description || null,
        address: body.address || null,
        submitterEmail: body.submitterEmail || null,
        submitterName: body.submitterName || null,
        status: 'pending',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Submission received! We will review it shortly.',
      submissionId: submission.id,
    })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
