import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/validation';

// GET single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Verify admin authentication
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const foundUser = await prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        mentorProfile: true,
        adminProfile: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = foundUser;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get User API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Verify admin authentication
    const user = await getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fullName, phone, dateOfBirth, gender, password, ...profileData } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        mentorProfile: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (fullName) updateData.fullName = fullName;
    if (phone) updateData.phone = phone;
    if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
    if (gender) updateData.gender = gender;
    if (password) updateData.password = await hashPassword(password);

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        dateOfBirth: true,
        gender: true,
        updatedAt: true,
      },
    });

    // Update profile if data provided
    if (existingUser.role === 'STUDENT' && existingUser.studentProfile) {
      const { college, course, year, branch } = profileData;
      if (college || course || year || branch) {
        await prisma.studentProfile.update({
          where: { userId: id },
          data: {
            ...(college && { college }),
            ...(course && { course }),
            ...(year && { year }),
            ...(branch && { branch }),
          },
        });
      }
    } else if (existingUser.role === 'MENTOR' && existingUser.mentorProfile) {
      const { specialization, experience, education, bio } = profileData;
      if (specialization || experience || education || bio) {
        await prisma.mentorProfile.update({
          where: { userId: id },
          data: {
            ...(specialization && { specialization }),
            ...(experience !== undefined && { experience }),
            ...(education && { education }),
            ...(bio && { bio }),
          },
        });
      }
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update User API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Verify admin authentication
    const adminUser = await getUserFromRequest(request);
    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Check if user exists
    const userToDelete = await prisma.user.findUnique({
      where: { id },
    });

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deleting admin users
    if (userToDelete.role === 'ADMIN') {
      return NextResponse.json(
        { error: 'Cannot delete admin users' },
        { status: 403 }
      );
    }

    // Delete user (profiles will be deleted automatically due to cascade)
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete User API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
