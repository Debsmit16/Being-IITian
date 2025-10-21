const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...\n');
    
    // Check connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!\n');
    
    // Count users
    const userCount = await prisma.user.count();
    console.log(`👥 Total users in database: ${userCount}\n`);
    
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true
      }
    });
    
    if (users.length > 0) {
      console.log('📋 Registered Users:');
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.fullName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.createdAt}`);
      });
    } else {
      console.log('⚠️  No users found in database');
      console.log('   Try registering a user through the API');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
