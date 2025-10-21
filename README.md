# Being IITian - EdTech Platform# Being IITian - EdTech Platform MVP



A comprehensive educational technology platform for JEE/NEET preparation with mentorship from IIT, NIT, and IISER students.A modern, full-featured educational technology platform for JEE preparation with role-based dashboards for Students, Mentors, and Admins.



## 🚀 Features## 🚀 Quick Start



### Authentication System```bash

- **Student Registration & Login** - Complete 5-step onboarding processcd being-iitian

- **JWT-based Authentication** - Secure HTTP-only cookie sessionsnpm install

- **Role-based Access** - Student, Mentor, and Admin dashboardsnpm run dev

- **Profile Management** - Comprehensive student profiles with academic details```



### Student DashboardVisit **http://localhost:3000**

- **Clean Professional UI** - Modern, light-themed interface

- **Profile Section** - View all registration details (personal, academic, address, parent info)## 🔑 Demo Credentials

- **Learning Stats** - Track courses, completion, study hours

- **Quick Actions** - Easy access to courses, sessions, tests, and doubts| Role | Email | Password |

- **Recent Activity** - Monitor learning progress|------|-------|----------|

| **Student** | student@iitian.com | password123 |

### Backend Infrastructure| **Mentor** | mentor@iitian.com | password123 |

- **Next.js 15.5.6** - App Router with TypeScript| **Admin** | admin@iitian.com | password123 |

- **Prisma ORM** - Type-safe database access

- **Supabase PostgreSQL** - Cloud database with connection pooling## ✨ Key Features

- **Secure Password Hashing** - bcrypt implementation

- **JWT Token Management** - jose library for secure tokens### 🎨 Public Pages

- **Homepage:** Hero section, mission, features, stats, CTA

## 🛠️ Tech Stack- **Courses:** Browse & filter courses by subject/level

- **Course Details:** Syllabus, pricing, enrollment

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS- **About:** Mission & mentorship model

- **Backend**: Next.js API Routes, Prisma ORM- **Outliers:** Exclusive community program

- **Database**: Supabase PostgreSQL

- **Authentication**: JWT (jsonwebtoken, jose), bcryptjs### 👨‍🎓 Student Portal

- **Validation**: Zod schemas- Personalized dashboard with progress tracking

- **Dev Tools**: Turbopack, ESLint, Prisma Studio- My enrolled courses with video player

- Mentor messaging system

## 📦 Installation- Study streak tracker

- Course recommendations

1. **Clone the repository**

```bash### 👨‍🏫 Mentor Portal

git clone <your-repo-url>- Student management & progress monitoring

cd being-iitian- Message inbox & response system

```- Resource upload functionality

- Performance analytics

2. **Install dependencies**

```bash### 👨‍💼 Admin Portal

npm install- Platform-wide analytics dashboard

```- User management (Students/Mentors/Admins)

- Course CRUD operations

3. **Set up environment variables**- Revenue tracking & statistics

Create a `.env` file in the root directory:

```env## 🛠 Tech Stack

# Database (Supabase)

DATABASE_URL="postgresql://postgres.<project-ref>:<password>@<region>.pooler.supabase.com:5432/postgres"- **Framework:** Next.js 14 (App Router) + TypeScript

DIRECT_URL="postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres"- **Styling:** Tailwind CSS

- **Auth:** localStorage demo (ready for NextAuth.js)

# JWT Secret- **Data:** Mock JSON (ready for database)

JWT_SECRET="your-super-secure-jwt-secret-key-here"

```## 📁 Structure



4. **Set up Prisma**```

```bashsrc/

npx prisma generate├── app/              # Pages (Next.js App Router)

npx prisma db push│   ├── about/

```│   ├── courses/

│   ├── dashboard/

5. **Run the development server**│   │   ├── student/

```bash│   │   ├── mentor/

npm run dev│   │   └── admin/

```│   ├── login/

│   └── outliers/

Open [http://localhost:3000](http://localhost:3000) in your browser.├── components/       # Reusable components

├── data/            # Mock data

## 🗄️ Database Schema└── lib/             # Utilities

```

### Core Models

- **User** - Base user authentication (email, password, role, profile data)## 🎯 User Flows

- **StudentProfile** - Academic details, address, parent info, learning preferences

- **MentorProfile** - Institution, specialization, experience, ratings**Student:** Browse → Login → Enroll → Learn → Track Progress  

- **AdminProfile** - Department and permissions**Mentor:** Login → View Students → Respond to Queries → Monitor Progress  

- **Course** - Course details, lectures, pricing**Admin:** Login → Manage Users/Courses → View Analytics

- **Enrollment** - Student course enrollments

- **Progress** - Video watch progress tracking## 🚀 Ready for Production

- **MentorSession** - One-on-one mentoring sessions

- **Payment** - Transaction recordsThis MVP is ready to integrate:

- **Notification** - User notifications- **Database:** PostgreSQL/MongoDB with Prisma/Mongoose

- **Auth:** NextAuth.js, Clerk, or Firebase

## 🔐 API Routes- **Payments:** Razorpay, Stripe

- **Video:** AWS S3, Vimeo, Cloudflare Stream

### Authentication- **Deployment:** Vercel, Netlify

- `POST /api/auth/register` - Register new student

- `POST /api/auth/login` - User login## 📱 Fully Responsive

- `POST /api/auth/logout` - User logout

- `GET /api/auth/me` - Get current authenticated userWorks seamlessly on Desktop, Tablet, and Mobile devices.



## 📁 Project Structure---



```**Built with ❤️ for Being IITian**

being-iitian/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Marketing pages with navbar/footer
│   │   │   └── page.tsx        # Home page
│   │   ├── api/                # API routes
│   │   │   └── auth/           # Authentication endpoints
│   │   ├── dashboard/          # Dashboard layouts (no navbar/footer)
│   │   │   ├── student/        # Student dashboard
│   │   │   ├── mentor/         # Mentor dashboard (TODO)
│   │   │   └── admin/          # Admin dashboard (TODO)
│   │   ├── login/              # Login page
│   │   ├── signup/             # Registration page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── lib/                    # Utilities
│       ├── prisma.ts           # Prisma client
│       ├── jwt.ts              # JWT utilities
│       └── validation.ts       # Password validation
├── prisma/
│   └── schema.prisma           # Database schema
└── public/                     # Static assets
```

## 🧪 Testing

**Test Credentials:**
- Email: `teststudent@example.com`
- Password: `Test@12345`

**Access Prisma Studio:**
```bash
npx prisma studio
```

## 🚀 Deployment

### Environment Setup
Ensure all environment variables are set in your deployment platform:
- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`

### Build
```bash
npm run build
npm start
```

## 📝 Development Notes

### Completed Features ✅
- Full authentication system with JWT
- Student registration (5-step form)
- Student login with role-based redirect
- Professional student dashboard
- Database schema with 11 models
- Secure password hashing
- Profile management
- Supabase connection with pooling

### TODO 📋
- Mentor dashboard
- Admin dashboard
- Course management system
- Video player integration
- Payment gateway integration
- Email verification
- Password reset flow
- Google OAuth
- Mentor discovery and booking
- Live session scheduling
- Practice test engine
- Doubt clearing system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ for JEE/NEET aspirants
