'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    
    // Academic Information
    currentClass: '',
    school: '',
    board: '',
    targetExam: '',
    targetYear: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Parent/Guardian Information
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    
    // Preferences
    learningMode: '',
    subjects: [] as string[],
    hearAboutUs: '',
  });
  
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const validateStep = (currentStep: number) => {
    setError('');
    
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email');
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.currentClass || !formData.school || !formData.board || !formData.targetExam) {
        setError('Please fill in all academic information');
        return false;
      }
    }
    
    if (currentStep === 3) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        setError('Please fill in all address fields');
        return false;
      }
    }
    
    if (currentStep === 4) {
      if (!formData.parentName || !formData.parentPhone) {
        setError('Please provide parent/guardian information');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      setError('Please accept the terms and conditions');
      return;
    }
    
    if (!validateStep(5)) return;
    
    try {
      setError('');
      
      // Send registration data to backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'STUDENT',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Success - redirect to login or dashboard
      alert('Account created successfully! Please login.');
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  const handleGoogleSignUp = () => {
    setError('Google sign-up coming soon!');
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192, 192, 192, 0.15) 0%, transparent 50%)'
      }}></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="relative inline-block">
              <span className="text-6xl text-yellow-400 animate-float">∞</span>
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400/30 to-gray-400/30"></div>
            </div>
          </Link>
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-400 bg-clip-text text-transparent">
              Join Being IITian
            </span>
          </h2>
          <p className="text-gray-400">Start your journey to IIT/JEE success</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-gray-900/70 backdrop-blur-xl p-4 rounded-2xl border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' 
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 5 && (
                  <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                    step > s ? 'bg-yellow-400' : 'bg-gray-800'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span className={step === 1 ? 'text-yellow-400 font-semibold' : ''}>Personal</span>
            <span className={step === 2 ? 'text-yellow-400 font-semibold' : ''}>Academic</span>
            <span className={step === 3 ? 'text-yellow-400 font-semibold' : ''}>Address</span>
            <span className={step === 4 ? 'text-yellow-400 font-semibold' : ''}>Guardian</span>
            <span className={step === 5 ? 'text-yellow-400 font-semibold' : ''}>Preferences</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                
                {/* Quick Sign Up with Google */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full py-3 px-6 bg-white text-gray-900 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-gray-900 text-gray-400">Or sign up with email</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Date of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Gender <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="At least 8 characters"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Academic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Current Class <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                      <option value="12-pass">12th Pass</option>
                      <option value="dropper">Dropper</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Board <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="board"
                      value={formData.board}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select Board</option>
                      <option value="cbse">CBSE</option>
                      <option value="icse">ICSE</option>
                      <option value="state">State Board</option>
                      <option value="igcse">IGCSE</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    School Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter your school name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Target Exam <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="targetExam"
                      value={formData.targetExam}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select Target Exam</option>
                      <option value="jee-main">JEE Main</option>
                      <option value="jee-advanced">JEE Advanced</option>
                      <option value="both">Both JEE Main & Advanced</option>
                      <option value="neet">NEET</option>
                      <option value="bitsat">BITSAT</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Target Year <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="targetYear"
                      value={formData.targetYear}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address Information */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Address Information</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Street Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      State <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Enter state"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    PIN Code <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter PIN code"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Parent/Guardian Information */}
            {step === 4 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Parent/Guardian Information</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Parent/Guardian Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter parent/guardian name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Parent Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Parent Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="parent@email.com"
                    />
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-300">
                        <span className="font-semibold">Why we need this:</span> Parent/guardian information helps us keep your family informed about your progress and important updates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Preferences */}
            {step === 5 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">Learning Preferences</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Preferred Learning Mode <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['online', 'offline', 'hybrid'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, learningMode: mode }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.learningMode === mode
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {mode === 'online' && '💻'}
                            {mode === 'offline' && '🏫'}
                            {mode === 'hybrid' && '🔄'}
                          </div>
                          <div className={`font-semibold capitalize ${
                            formData.learningMode === mode ? 'text-yellow-400' : 'text-gray-300'
                          }`}>
                            {mode}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Subjects of Interest <span className="text-gray-500">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English'].map((subject) => (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => handleSubjectToggle(subject)}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          formData.subjects.includes(subject)
                            ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                            : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>{subject}</span>
                          {formData.subjects.includes(subject) && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="teacher">Teacher/School</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="pt-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-900"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link href="/terms" className="text-yellow-400 hover:text-yellow-300">
                        Terms and Conditions
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/50 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-2 mt-5">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`${step === 1 ? 'w-full' : 'ml-auto'} px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-700 hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <span>Continue</span>
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-700 hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Create Account</span>
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Already have account */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
