'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string | null;
  studentProfile: {
    currentClass: string;
    school: string;
    board: string;
    targetExam: string;
    targetYear: number;
    address: string;
    city: string;
    state: string;
    pincode: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    learningMode: string;
    subjects: string[];
    totalCoursesEnrolled: number;
    coursesCompleted: number;
    totalWatchTime: number;
  };
}

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'STUDENT') {
            setUser(data.user);
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <div className="text-xl text-white">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'profile', icon: '👤', label: 'My Profile' },
    { id: 'courses', icon: '📚', label: 'My Courses' },
    { id: 'progress', icon: '📈', label: 'Progress' },
    { id: 'mentors', icon: '👨‍🏫', label: 'Find Mentors' },
    { id: 'sessions', icon: '🎯', label: 'My Sessions' },
    { id: 'resources', icon: '📖', label: 'Resources' },
    { id: 'tests', icon: '✍️', label: 'Tests' },
    { id: 'doubt', icon: '❓', label: 'Ask Doubts' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm`}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  BI
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Being IITian</h2>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                BI
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600 ml-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} px-3 py-2.5 rounded-lg transition-all text-sm ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'profile' && 'My Profile'}
                {activeTab === 'courses' && 'My Courses'}
                {activeTab === 'progress' && 'Progress'}
                {activeTab === 'mentors' && 'Find Mentors'}
                {activeTab === 'sessions' && 'My Sessions'}
                {activeTab === 'resources' && 'Resources'}
                {activeTab === 'tests' && 'Tests'}
                {activeTab === 'doubt' && 'Ask Doubts'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                  <div className="text-xs text-gray-500">{user.studentProfile.currentClass}</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-1">Welcome back, {user.fullName.split(' ')[0]}!</h2>
                    <p className="text-blue-100">Ready to continue your learning journey?</p>
                  </div>
                  <div className="text-5xl opacity-80">�</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Courses', value: user.studentProfile.totalCoursesEnrolled, icon: '📚', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-100' },
                  { label: 'Completed', value: user.studentProfile.coursesCompleted, icon: '✅', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600', borderColor: 'border-green-100' },
                  { label: 'Study Hours', value: `${Math.floor(user.studentProfile.totalWatchTime / 60)}h`, icon: '⏱️', color: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600', borderColor: 'border-purple-100' },
                  { label: 'Target Exam', value: user.studentProfile.targetExam, icon: '🎯', color: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-600', borderColor: 'border-orange-100' },
                ].map((stat, index) => (
                  <div key={index} className={`bg-white border ${stat.borderColor} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center text-2xl mb-3`}>
                      {stat.icon}
                    </div>
                    <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Continue Learning', icon: '▶️', action: 'courses' },
                      { label: 'Book a Session', icon: '📅', action: 'sessions' },
                      { label: 'Practice Tests', icon: '📝', action: 'tests' },
                      { label: 'Ask a Doubt', icon: '💬', action: 'doubt' },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(item.action)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-100"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">
                        📚
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">Started learning Physics Chapter 5</p>
                        <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm flex-shrink-0">
                        ✅
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">Completed Mathematics Quiz</p>
                        <p className="text-xs text-gray-500 mt-0.5">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm flex-shrink-0">
                        👨‍🏫
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">Attended doubt clearing session</p>
                        <p className="text-xs text-gray-500 mt-0.5">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.fullName}</h2>
                    <p className="text-gray-600 mb-4">{user.email}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm border border-blue-200 font-medium">
                        📚 {user.studentProfile.currentClass}
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm border border-green-200 font-medium">
                        🎯 {user.studentProfile.targetExam}
                      </span>
                      <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm border border-purple-200 font-medium">
                        📅 Target: {user.studentProfile.targetYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">👤</span>Personal Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', value: user.fullName },
                      { label: 'Email', value: user.email },
                      { label: 'Phone', value: user.phone },
                      { label: 'Date of Birth', value: new Date(user.dateOfBirth).toLocaleDateString() },
                      { label: 'Gender', value: user.gender },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">🎓</span>Academic Information
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Class', value: user.studentProfile.currentClass },
                      { label: 'School', value: user.studentProfile.school },
                      { label: 'Board', value: user.studentProfile.board },
                      { label: 'Target Exam', value: user.studentProfile.targetExam },
                      { label: 'Target Year', value: user.studentProfile.targetYear.toString() },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">📍</span>Address Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Address', value: user.studentProfile.address },
                      { label: 'City', value: user.studentProfile.city },
                      { label: 'State', value: user.studentProfile.state },
                      { label: 'Pincode', value: user.studentProfile.pincode },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parent */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">👨‍👩‍👦</span>Parent Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Name', value: user.studentProfile.parentName },
                      { label: 'Phone', value: user.studentProfile.parentPhone },
                      { label: 'Email', value: user.studentProfile.parentEmail },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="text-gray-900 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">⚙️</span>Learning Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 block mb-2 font-medium">Learning Mode</label>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm border border-purple-200 inline-block font-medium">
                      {user.studentProfile.learningMode}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-2 font-medium">Subjects</label>
                    <div className="flex flex-wrap gap-2">
                      {user.studentProfile.subjects.map((subject, index) => (
                        <span key={index} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm border border-blue-200 font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs - Placeholder */}
          {['courses', 'progress', 'mentors', 'sessions', 'resources', 'tests', 'doubt', 'settings'].includes(activeTab) && (
            <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">This feature is under development</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
