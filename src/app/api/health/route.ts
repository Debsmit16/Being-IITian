import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      env: {
        has_database_url: !!process.env.DATABASE_URL,
        has_direct_url: !!process.env.DIRECT_URL,
        has_jwt_secret: !!process.env.JWT_SECRET,
        database_url_prefix: process.env.DATABASE_URL?.substring(0, 20),
      },
      prisma_version: require('@prisma/client').Prisma.prismaVersion,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      status: 'error',
      error: errorMessage,
      env: {
        has_database_url: !!process.env.DATABASE_URL,
        has_direct_url: !!process.env.DIRECT_URL,
        has_jwt_secret: !!process.env.JWT_SECRET,
      },
    }, { status: 500 });
  }
}
