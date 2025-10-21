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

    // Get all users with their profiles
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        createdAt: true,
        emailVerified: true,
        phoneVerified: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      email,
      fullName,
      phone,
      password,
      role,
      dateOfBirth,
      gender,
      // Student specific
      currentClass,
      school,
      board,
      targetExam,
      targetYear,
      // Mentor specific
      institution,
      degree,
      specialization,
      graduationYear,
      jeeRank,
      bio,
      experience,
    } = body;

    // Validate required fields
    if (!email || !fullName || !phone || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: email, fullName, phone, password, role' },
        { status: 400 }
      );
    }

    if (!['STUDENT', 'MENTOR'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be STUDENT or MENTOR' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user based on role
    let newUser;
    if (role === 'STUDENT') {
      newUser = await prisma.user.create({
        data: {
          email,
          fullName,
          phone,
          password: hashedPassword,
          role: 'STUDENT',
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender: gender || null,
          emailVerified: true, // Admin-created users are auto-verified
          phoneVerified: true,
          studentProfile: {
            create: {
              currentClass: currentClass || '',
              school: school || '',
              board: board || '',
              targetExam: targetExam || 'JEE',
              targetYear: targetYear || new Date().getFullYear() + 1,
            },
          },
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });
    } else {
      // MENTOR
      newUser = await prisma.user.create({
        data: {
          email,
          fullName,
          phone,
          password: hashedPassword,
          role: 'MENTOR',
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          gender: gender || null,
          emailVerified: true,
          phoneVerified: true,
          mentorProfile: {
            create: {
              institution: institution || '',
              degree: degree || '',
              specialization: specialization || [],
              graduationYear: graduationYear || new Date().getFullYear(),
              jeeRank: jeeRank || null,
              bio: bio || '',
              experience: experience || '',
            },
          },
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });
    }

    return NextResponse.json(
      {
        message: `${role} created successfully`,
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
