import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get counts from database
    const [totalUsers, totalStudents, totalMentors, totalCourses] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'MENTOR' } }),
      // Courses don't exist in schema yet, return 0 for now
      Promise.resolve(0),
    ]);

    return NextResponse.json({
      totalUsers,
      totalStudents,
      totalMentors,
      totalCourses,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
