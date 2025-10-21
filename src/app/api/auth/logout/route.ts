import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Clear auth cookie
    await clearAuthCookie();

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
