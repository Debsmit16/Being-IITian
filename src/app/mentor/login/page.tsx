'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';

export default function MentorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = login(email, password);
    if (user && user.role === 'mentor') {
      router.push('/dashboard/mentor');
    } else {
      setError('Invalid credentials or not a mentor account');
    }
  };

  const quickDemoLogin = () => {
    setEmail('mentor@iitian.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="space-y-6">
          {/* Logo & Title */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <span className="text-7xl text-purple-400 animate-float">👨‍🏫</span>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-400/30 to-pink-400/30"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-purple-200 to-pink-400 bg-clip-text text-transparent">
                Mentor Portal
              </span>
            </h2>
            <p className="text-gray-400">Sign in to guide and teach students</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-purple-400/30">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/50 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="mentor@iitian.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 hover:shadow-2xl hover:shadow-purple-400/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Sign In to Mentor Portal
              </button>
            </form>
          </div>

          {/* Demo Access */}
          <div className="bg-gray-900/70 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-gray-700/50">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-purple-400">Try Demo Account</span>
              </p>
            </div>
            <button
              type="button"
              onClick={quickDemoLogin}
              className="w-full px-4 py-3 border border-gray-700 bg-gray-800/30 backdrop-blur-sm rounded-xl hover:bg-gray-800/60 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full flex items-center justify-center text-xl">
                👨‍🏫
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Demo Mentor</div>
                <div className="text-xs text-gray-400">Quick access</div>
              </div>
            </button>
            <p className="text-xs text-center text-gray-500 mt-3">
              Password: <span className="text-purple-400 font-mono">password123</span>
            </p>
          </div>

          {/* Back Links */}
          <div className="text-center space-y-3">
            <div className="flex gap-3 justify-center text-sm">
              <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Student Login
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/admin/login" className="text-orange-400 hover:text-orange-300 transition-colors">
                Admin Login
              </Link>
            </div>
            <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-purple-400 transition-colors group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
