'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginMethod === 'email' ? email : undefined,
          phone: loginMethod === 'phone' ? phone : undefined,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      // Check if user is a student
      if (data.user.role === 'STUDENT') {
        router.push('/dashboard/student');
      } else {
        setError('Only student accounts can login here. Mentors and admins have separate portals.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    // Google login implementation would go here
    setError('Google login coming soon!');
  };

  const quickDemoLogin = () => {
    setEmail('student@iitian.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192, 192, 192, 0.15) 0%, transparent 50%)'
      }}></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-400/10 rounded-full blur-3xl top-1/3 right-1/3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute w-96 h-96 bg-purple-400/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl w-full space-y-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden md:block space-y-8">
            <div className="text-left">
              <div className="mb-8">
                <div className="relative inline-block">
                  <span className="text-9xl text-yellow-400 animate-float">∞</span>
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400/30 to-gray-400/30"></div>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-400 bg-clip-text text-transparent">
                  Being IITian
                </span>
              </h1>
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Transform your JEE journey with personalized mentorship from IIT, NIT & IISER students.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: '🎯', text: 'Expert Mentorship from Top Institutes' },
                  { icon: '📚', text: '100+ Premium Courses' },
                  { icon: '⚡', text: 'Real-time Progress Tracking' },
                  { icon: '🏆', text: '98% Success Rate' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-gray-400/20 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <span className="group-hover:text-yellow-400 transition-colors">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login */}
          <div className="space-y-6">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <span className="text-7xl text-yellow-400 animate-float">∞</span>
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400/30 to-gray-400/30"></div>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-400 bg-clip-text text-transparent">
                  Being IITian
                </span>
              </h2>
            </div>

            {/* Welcome Header */}
            <div className="text-center mb-2">
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
              <p className="text-gray-400">Sign in to continue your learning journey</p>
            </div>

            {/* Login Options */}
            <div className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-5">
                <button
                  type="button"
                  onClick={() => setLoginMethod('google')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    loginMethod === 'google'
                      ? 'bg-white text-gray-900'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    loginMethod === 'email'
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    loginMethod === 'phone'
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Google Login */}
              {loginMethod === 'google' && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-4 px-6 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                  <p className="text-xs text-center text-gray-500">Fast, secure, and hassle-free</p>
                </div>
              )}

              {/* Email/Phone Login Form */}
              {loginMethod !== 'google' && (
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
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {loginMethod === 'email' ? (
                          <svg className="h-5 w-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                      </div>
                      <input
                        type={loginMethod === 'email' ? 'email' : 'tel'}
                        required
                        value={loginMethod === 'email' ? email : phone}
                        onChange={(e) => loginMethod === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        placeholder={loginMethod === 'email' ? 'your@email.com' : '+91 98765 43210'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-900" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-700 hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign In</span>
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-400">
                      Don't have an account?{' '}
                      <Link href="/signup" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                        Sign up now
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Demo Access */}
            <div className="text-center">
              <button
                type="button"
                onClick={quickDemoLogin}
                className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Try demo account
              </button>
            </div>

            {/* Staff Login Link */}
            <div className="text-center pt-2">
              <div className="flex gap-3 justify-center text-xs">
                <Link href="/mentor/login" className="text-gray-500 hover:text-purple-400 transition-colors">
                  Mentor
                </Link>
                <span className="text-gray-700">•</span>
                <Link href="/admin/login" className="text-gray-500 hover:text-yellow-400 transition-colors">
                  Admin
                </Link>
              </div>
            </div>

        <div className="text-center">
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
    </div>
  );
}
