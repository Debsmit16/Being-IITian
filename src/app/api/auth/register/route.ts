import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, validateEmail, validatePassword } from '@/lib/validation';
import { generateToken, setAuthCookie } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      password, 
      fullName,
      phone,
      role = 'STUDENT',
      // Student-specific fields
      dateOfBirth,
      gender,
      currentClass,
      school,
      board,
      targetExam,
      targetYear,
      address,
      city,
      state,
      pincode,
      parentName,
      parentPhone,
      parentEmail,
      learningMode,
      subjects,
      hearAboutUs
    } = body;

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
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
    const hashedPassword = await hashPassword(password);

    // Create user with profile based on role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        role,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender: gender ? gender.toUpperCase().replace(/\s+/g, '_') : null,
        ...(role === 'STUDENT' && {
          studentProfile: {
            create: {
              currentClass,
              school,
              board,
              targetExam,
              targetYear: parseInt(targetYear),
              address,
              city,
              state,
              pincode,
              parentName,
              parentPhone,
              parentEmail,
              learningMode: learningMode ? learningMode.toUpperCase() : null,
              subjects: subjects || [],
              hearAboutUs,
            },
          },
        }),
        ...(role === 'MENTOR' && {
          mentorProfile: {
            create: {
              institution: '',
              degree: '',
              specialization: [],
              graduationYear: new Date().getFullYear(),
            },
          },
        }),
        ...(role === 'ADMIN' && {
          adminProfile: {
            create: {
              permissions: [],
            },
          },
        }),
      },
      include: {
        studentProfile: true,
        mentorProfile: true,
        adminProfile: true,
      },
    });

    // Generate JWT token
    const token = await generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userWithoutPassword,
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
