const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding admin user...');

  // Hash password
  const hashedPassword = await bcrypt.hash('Admin@12345', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@beingiitian.com' },
    update: {},
    create: {
      email: 'admin@beingiitian.com',
      phone: '+919876543210',
      password: hashedPassword,
      fullName: 'Super Admin',
      role: 'ADMIN',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'MALE',
      emailVerified: true,
      phoneVerified: true,
      adminProfile: {
        create: {
          department: 'System Administration',
          permissions: ['ALL', 'MANAGE_USERS', 'MANAGE_COURSES', 'MANAGE_CONTENT', 'VIEW_ANALYTICS'],
        },
      },
    },
    include: {
      adminProfile: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('📧 Email: admin@beingiitian.com');
  console.log('🔑 Password: Admin@12345');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
