# Backend Setup Guide for Being IITian

## 🚀 Quick Start

### 1. Supabase Setup

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project credentials

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

3. **Get Database URL**
   - Go to Project Settings → Database
   - Copy the connection string (Transaction Pooler mode)
   - Replace `[YOUR-PASSWORD]` with your database password
   - Use as `DATABASE_URL` (with `?pgbouncer=true`)
   - Use as `DIRECT_URL` (without pooler param)

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

JWT_SECRET=your_random_secret_min_32_chars_long

NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Database Migration

Run Prisma migrations to create database tables:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations (production)
npx prisma migrate dev --name init
```

### 4. Prisma Studio (Optional)

View and manage your database:

```bash
npx prisma studio
```

This will open a GUI at `http://localhost:5555`

## 📁 Project Structure

```
src/
├── app/
│   └── api/
│       └── auth/
│           ├── register/route.ts  # POST /api/auth/register
│           ├── login/route.ts     # POST /api/auth/login
│           ├── logout/route.ts    # POST /api/auth/logout
│           └── me/route.ts        # GET /api/auth/me
├── lib/
│   ├── prisma.ts      # Prisma client
│   ├── supabase.ts    # Supabase clients
│   ├── jwt.ts         # JWT utilities
│   └── validation.ts  # Validation helpers
prisma/
└── schema.prisma      # Database schema
```

## 🔒 Authentication Flow

### Registration
```typescript
POST /api/auth/register
Body: {
  email: string
  password: string
  fullName: string
  phone?: string
  role: 'STUDENT' | 'MENTOR' | 'ADMIN'
  // Student-specific fields
  currentClass?: string
  school?: string
  board?: string
  targetExam?: string
  targetYear?: number
  // ... more fields
}
```

### Login
```typescript
POST /api/auth/login
Body: {
  email: string
  password: string
}
```

### Get Current User
```typescript
GET /api/auth/me
Headers: {
  Cookie: token=<jwt_token>
}
```

### Logout
```typescript
POST /api/auth/logout
```

## 📊 Database Models

### Core Models
- **User** - Base user account
- **StudentProfile** - Student-specific data
- **MentorProfile** - Mentor-specific data
- **AdminProfile** - Admin-specific data
- **Course** - Course information
- **Lecture** - Video lectures
- **Enrollment** - Student course enrollments
- **Progress** - Lecture completion tracking
- **MentorSession** - Mentor-student sessions
- **Payment** - Payment records

## 🔐 Security Features

✅ **Password Hashing** - Using bcrypt
✅ **JWT Authentication** - HTTP-only cookies
✅ **Role-based Access** - STUDENT, MENTOR, ADMIN
✅ **Input Validation** - Email, password, phone
✅ **SQL Injection Protection** - Prisma ORM
✅ **Environment Variables** - Sensitive data protection

## 📦 Supabase Storage Setup

For file uploads (course thumbnails, videos, avatars):

1. Go to Storage in Supabase Dashboard
2. Create buckets:
   - `avatars` (public)
   - `course-thumbnails` (public)
   - `course-videos` (private)
   - `lecture-notes` (private)
   - `attachments` (private)

3. Set bucket policies for access control

## 🧪 Testing the API

Use Thunder Client, Postman, or curl:

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "fullName": "Test User",
    "role": "STUDENT"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

## 🚀 Next Steps

1. ✅ Complete database schema
2. ✅ Authentication APIs
3. 🔄 Course management APIs
4. 🔄 Enrollment APIs
5. 🔄 Payment integration
6. 🔄 File upload functionality
7. 🔄 Email notifications

## 📝 Notes

- All passwords are hashed with bcrypt
- JWT tokens expire in 7 days
- Database uses PostgreSQL via Supabase
- Files stored in Supabase Storage
- API routes use Next.js 14 App Router

## 🆘 Troubleshooting

### Prisma Connection Issues
```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

### JWT Errors
- Ensure JWT_SECRET is at least 32 characters
- Check if cookies are being set correctly

### Supabase Connection
- Verify DATABASE_URL and DIRECT_URL
- Check if IP is whitelisted in Supabase (if required)

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
