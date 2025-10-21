import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/jwt';

// GET all courses (admin)
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courses = await prisma.course.findMany({
      include: {
        mentor: {
          include: {
            user: {
              select: {
                fullName: true,
                email: true,
              },
            },
          },
        },
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

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      subject,
      level,
      price,
      duration,
      totalLectures,
      instructorName,
      mentorId,
      thumbnailUrl,
      tags,
      isPublished,
    } = body;

    // Validate required fields
    if (!title || !description || !subject || !level || price === undefined || !instructorName) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, subject, level, price, instructorName' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
    });

    if (existingCourse) {
      return NextResponse.json(
        { error: 'A course with this title already exists' },
        { status: 409 }
      );
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        description,
        subject,
        level,
        price: parseFloat(price),
        duration: duration || 0,
        totalLectures: totalLectures || 0,
        instructorName,
        mentorId: mentorId || null,
        thumbnailUrl: thumbnailUrl || null,
        slug,
        tags: tags || [],
        isPublished: isPublished || false,
      },
      include: {
        mentor: {
          include: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Course created successfully',
        course,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
