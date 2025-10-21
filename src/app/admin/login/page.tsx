'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user.role === 'ADMIN') {
          router.push('/dashboard/admin');
        } else {
          setError('Access denied. Admin credentials required.');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950/30 to-black"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-yellow-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="space-y-6">
          {/* Logo & Title */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <span className="text-7xl text-yellow-400 animate-float">⚡</span>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400/30 to-orange-400/30"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                Admin Portal
              </span>
            </h2>
            <p className="text-gray-400">Manage the platform and users</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-yellow-400/30">
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
                  className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  placeholder="admin@iitian.com"
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
                  className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Signing In...' : 'Sign In to Admin Portal'}
              </button>
            </form>
          </div>

          {/* Back Links */}
          <div className="text-center space-y-3">
            <div className="flex gap-3 justify-center text-sm">
              <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Student Login
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/mentor/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                Mentor Login
              </Link>
            </div>
            <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors group">
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
