import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

// POST - Create payment order (Razorpay integration placeholder)
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, amount } = body;

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: courseId, amount' },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // TODO: Initialize Razorpay order
    // const Razorpay = require('razorpay');
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const order = await razorpay.orders.create({
    //   amount: amount * 100, // Amount in paise
    //   currency: 'INR',
    //   receipt: `order_${Date.now()}`,
    // });

    // For now, create payment record with PENDING status
    // Get student profile
    const student = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { studentProfile: true },
    });

    if (!student || !student.studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    const payment = await prisma.payment.create({
      data: {
        studentId: student.studentProfile.id,
        amount,
        currency: 'INR',
        status: 'PENDING',
        itemType: 'COURSE',
        itemId: courseId,
        description: `Payment for ${course.title}`,
        // razorpayOrderId: order.id, // Uncomment when Razorpay is integrated
      },
    });

    return NextResponse.json({
      message: 'Payment order created (Integration pending)',
      payment,
      // orderId: order.id, // Uncomment when Razorpay is integrated
      note: 'Razorpay integration is pending. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.',
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
