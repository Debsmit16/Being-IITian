import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get full user data
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        studentProfile: true,
        mentorProfile: true,
        adminProfile: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data (excluding password)
    const { password, ...userWithoutPassword } = userData;

    return NextResponse.json(
      { user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
