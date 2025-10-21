'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout, type User } from '@/lib/auth';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'student': return '/dashboard/student';
      case 'mentor': return '/dashboard/mentor';
      case 'admin': return '/dashboard/admin';
      default: return '/';
    }
  };

  return (
    <nav className="bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-lg dark:shadow-black/50 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Logo will go here */}
              <div className="relative">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">∞</span>
                <div className="absolute inset-0 blur-lg bg-gradient-to-r from-yellow-400/20 to-gray-400/20 group-hover:from-yellow-400/40 group-hover:to-gray-400/40 transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
                  Being IITian
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 tracking-widest uppercase">Excellence Through Mentorship</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/courses" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all duration-300 font-medium">
              Courses
            </Link>
            <Link href="/about" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all duration-300 font-medium">
              About
            </Link>
            <Link href="/outliers" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all duration-300 font-medium relative group">
              <span>Outliers</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link 
                  href={getDashboardLink()}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all duration-300 font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-gray-800">
                  <span className="text-2xl">{user.avatar}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-600/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-600/30 transition-all duration-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 font-bold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-black/98 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/courses" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-yellow-600 dark:hover:text-yellow-400 rounded transition">
              Courses
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-yellow-600 dark:hover:text-yellow-400 rounded transition">
              About
            </Link>
            <Link href="/outliers" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-yellow-600 dark:hover:text-yellow-400 rounded transition">
              Outliers
            </Link>
            {user ? (
              <>
                <Link href={getDashboardLink()} className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-yellow-600 dark:hover:text-yellow-400 rounded transition">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/10 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-3 py-2 text-yellow-600 dark:text-yellow-400 font-semibold hover:bg-gray-100 dark:hover:bg-white/5 rounded transition">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
