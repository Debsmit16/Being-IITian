# 🚀 Deployment Guide - Being IITian

## Quick Deploy to Vercel (Recommended - 5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free tier works)

### Steps

1. **Push to GitHub**
   ```bash
   cd being-iitian
   git init
   git add .
   git commit -m "Initial commit - Being IITian MVP"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site will be live at `your-project.vercel.app`

3. **Custom Domain (Optional)**
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Alternative: Deploy to Netlify

1. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `.next`

2. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

## Environment Variables (Future Backend Integration)

When you integrate a backend, add these to Vercel/Netlify:

```env
# Database
DATABASE_URL=your_database_connection_string

# Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.com

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Email Service
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Performance Optimization

Already implemented:
- ✅ Next.js 14 App Router (automatic code splitting)
- ✅ Tailwind CSS (minimal CSS bundle)
- ✅ Image optimization ready
- ✅ Font optimization (Inter font)

## Demo Presentation Tips

1. **Start with Homepage** - Show the professional landing page
2. **Login as Student** - Demonstrate course browsing and enrollment
3. **Switch to Mentor** - Show mentor dashboard and student management
4. **Show Admin Panel** - Display full platform control
5. **Highlight Responsiveness** - Resize browser or use mobile view

## Demo URLs for Testing

After deployment, test these flows:
- `/` - Homepage
- `/courses` - Course catalog
- `/login` - Login page (use demo credentials)
- `/dashboard/student` - Student portal
- `/dashboard/mentor` - Mentor portal
- `/dashboard/admin` - Admin portal
- `/about` - About page
- `/outliers` - Outliers program

## Production Checklist

Before going live with real users:

- [ ] Set up real database (PostgreSQL/MongoDB)
- [ ] Implement proper authentication (NextAuth.js/Clerk)
- [ ] Integrate payment gateway (Razorpay)
- [ ] Add video hosting solution
- [ ] Set up email service (SendGrid/AWS SES)
- [ ] Add analytics (Google Analytics)
- [ ] Configure custom domain
- [ ] Set up SSL certificate (auto with Vercel)
- [ ] Add error monitoring (Sentry)
- [ ] Set up backups
- [ ] Create privacy policy & terms
- [ ] Test all user flows thoroughly

## Support

For deployment issues, contact the development team or refer to:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
