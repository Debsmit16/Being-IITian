import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

// POST - Verify payment (Razorpay integration placeholder)
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paymentId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 });
    }

    // Find payment record
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // TODO: Verify Razorpay signature
    // const crypto = require('crypto');
    // const expectedSignature = crypto
    //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //   .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    //   .digest('hex');
    //
    // if (expectedSignature !== razorpaySignature) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'COMPLETED',
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        paidAt: new Date(),
      },
    });

    // Create enrollment for the course
    if (payment.itemType === 'COURSE') {
      await prisma.enrollment.create({
        data: {
          studentId: payment.studentId,
          courseId: payment.itemId,
          status: 'ACTIVE',
          paymentId: payment.id,
        },
      });
    }

    return NextResponse.json({
      message: 'Payment verified successfully (Integration pending)',
      payment: updatedPayment,
      note: 'Razorpay signature verification is pending. This is a placeholder implementation.',
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
