'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, type User, demoUsers } from '@/lib/auth';
import { courses } from '@/data/courses';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  const stats = {
    totalStudents: 5234,
    totalMentors: 52,
    totalCourses: courses.length,
    revenue: 2456000,
    activeUsers: 3421,
    newSignups: 234
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard 👨‍💼
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                <p className="text-xs opacity-75 mt-2">+{stats.newSignups} this month</p>
              </div>
              <div className="text-5xl opacity-80">👨‍🎓</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Mentors</p>
                <p className="text-3xl font-bold">{stats.totalMentors}</p>
                <p className="text-xs opacity-75 mt-2">Active & verified</p>
              </div>
              <div className="text-5xl opacity-80">👨‍🏫</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Courses</p>
                <p className="text-3xl font-bold">{stats.totalCourses}</p>
                <p className="text-xs opacity-75 mt-2">Across all subjects</p>
              </div>
              <div className="text-5xl opacity-80">📚</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Revenue (MTD)</p>
                <p className="text-3xl font-bold">₹{(stats.revenue / 100000).toFixed(1)}L</p>
                <p className="text-xs opacity-75 mt-2">+18% from last month</p>
              </div>
              <div className="text-5xl opacity-80">💰</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Active Users</p>
                <p className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-xs opacity-75 mt-2">Online in last 24h</p>
              </div>
              <div className="text-5xl opacity-80">🟢</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Avg Satisfaction</p>
                <p className="text-3xl font-bold">4.8/5.0</p>
                <p className="text-xs opacity-75 mt-2">Based on 2.5k reviews</p>
              </div>
              <div className="text-5xl opacity-80">⭐</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
              <button className="px-4 py-2 bg-yellow-600 dark:bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 transition text-sm font-semibold">
                + Add User
              </button>
            </div>
            <div className="space-y-3">
              {demoUsers.map(demoUser => (
                <div key={demoUser.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{demoUser.avatar}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{demoUser.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{demoUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded-full capitalize">
                      {demoUser.role}
                    </span>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 text-xs font-semibold">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h2>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold">
                + Create Course
              </button>
            </div>
            <div className="space-y-3">
              {courses.slice(0, 4).map(course => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{course.thumbnail}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{course.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{course.students} students • ₹{course.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-yellow-100 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded text-xs font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-400/40">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold hover:bg-gray-200">
                      Stats
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-yellow-50 dark:bg-yellow-400/10 rounded-xl hover:bg-yellow-100 dark:bg-yellow-400/20 transition text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">View Analytics</p>
            </button>
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition text-center">
              <div className="text-3xl mb-2">💳</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Payments</p>
            </button>
            <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition text-center">
              <div className="text-3xl mb-2">📢</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Announcements</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition text-center">
              <div className="text-3xl mb-2">⚙️</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
