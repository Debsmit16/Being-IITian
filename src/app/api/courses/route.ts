import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all published courses (public endpoint)
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        subject: true,
        level: true,
        price: true,
        duration: true,
        totalLectures: true,
        instructorName: true,
        thumbnailUrl: true,
        slug: true,
        tags: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
