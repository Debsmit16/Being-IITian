'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, type User } from '@/lib/auth';
import { mockMessages } from '@/data/enrollments';

export default function MentorDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'mentor') {
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

  const mockStudents = [
    { id: '1', name: 'Rahul Sharma', progress: 65, lastActive: '2 hours ago', course: 'Mechanics' },
    { id: '2', name: 'Ananya Reddy', progress: 78, lastActive: '5 hours ago', course: 'Organic Chemistry' },
    { id: '3', name: 'Vikram Patel', progress: 42, lastActive: '1 day ago', course: 'Calculus' },
    { id: '4', name: 'Priya Singh', progress: 89, lastActive: '3 hours ago', course: 'Mechanics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mentor Dashboard - {user.name} 👨‍🏫
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Guide your students to success</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockStudents.length}</div>
            <div className="text-gray-600 dark:text-gray-400">Active Students</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">💬</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockMessages.length}</div>
            <div className="text-gray-600 dark:text-gray-400">Pending Queries</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">68.5%</div>
            <div className="text-gray-600 dark:text-gray-400">Avg Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9</div>
            <div className="text-gray-600 dark:text-gray-400">Rating</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Students */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Students</h2>
              <div className="space-y-4">
                {mockStudents.map(student => (
                  <div key={student.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{student.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{student.course}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{student.lastActive}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-semibold">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-yellow-600 dark:bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 transition text-sm font-semibold">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition text-sm font-semibold">
                        Send Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Messages</h2>
              <div className="space-y-4">
                {mockMessages.map(message => (
                  <div key={message.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">{message.to}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{message.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{message.content}</p>
                    <button className="mt-2 text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-semibold">
                      Reply →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
                  📤 Upload Resources
                </button>
                <button className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                  📝 Create Assignment
                </button>
                <button className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition">
                  📅 Schedule Session
                </button>
              </div>
            </div>

            {/* This Week */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">12</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Sessions Conducted</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">+3 from last week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">28</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Doubts Cleared</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">+5 from last week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold">6</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Resources Shared</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Same as last week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Top Performer 🏆</h3>
              <div className="bg-white dark:bg-gray-800/20 backdrop-blur rounded-lg p-4">
                <p className="font-semibold mb-1">Priya Singh</p>
                <p className="text-sm opacity-90">89% progress in Mechanics</p>
                <p className="text-xs opacity-75 mt-2">Consistently improving!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
