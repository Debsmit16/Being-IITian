'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddUserModal from '@/components/admin/AddUserModal';

// Define types
type TabType = 'overview' | 'students' | 'mentors' | 'courses' | 'users';

interface Stats {
  totalStudents: number;
  totalMentors: number;
  totalCourses: number;
  totalUsers: number;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalMentors: 0,
    totalCourses: 0,
    totalUsers: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserType, setModalUserType] = useState<'STUDENT' | 'MENTOR'>('STUDENT');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok || (await response.json()).user?.role !== 'ADMIN') {
        router.push('/admin/login');
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadUsers = async (role?: string) => {
    try {
      const url = role ? `/api/admin/users?role=${role}` : '/api/admin/users';
      console.log('Loading users with URL:', url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('Received users:', data.users.length, 'Role filter:', role);
        console.log('User roles:', data.users.map((u: User) => u.role));
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'students') {
      loadUsers('STUDENT');
    } else if (activeTab === 'mentors') {
      loadUsers('MENTOR');
    }
  }, [activeTab]);

  const openAddModal = (type: 'STUDENT' | 'MENTOR') => {
    setModalUserType(type);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    loadStats();
    if (activeTab === 'students') {
      loadUsers('STUDENT');
    } else if (activeTab === 'mentors') {
      loadUsers('MENTOR');
    } else {
      loadUsers();
    }
  };

  const deleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User deleted successfully');
        handleModalSuccess();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Admin Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            ⚡ Admin Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1">Full Authority Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-semibold">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-semibold">All Users</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-semibold">Students</span>
          </button>

          <button
            onClick={() => setActiveTab('mentors')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'mentors'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold">Mentors</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-semibold">Courses</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={() => {
              fetch('/api/auth/logout', { method: 'POST' });
              router.push('/admin/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-600 mt-2">Monitor and manage your entire platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Students</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Mentors</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalMentors}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Courses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCourses}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => openAddModal('STUDENT')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all group">
                  <div className="text-4xl mb-2">➕</div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-yellow-600">Add Student</p>
                </button>
                <button 
                  onClick={() => openAddModal('MENTOR')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group">
                  <div className="text-4xl mb-2">👨‍🏫</div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">Add Mentor</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
                  <div className="text-4xl mb-2">📚</div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-orange-600">Add Course</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">View Analytics</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">All Users</h2>
                <p className="text-gray-600 mt-2">Manage all platform users (Students, Mentors, Admins)</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => openAddModal('STUDENT')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  + Add Student
                </button>
                <button 
                  onClick={() => openAddModal('MENTOR')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  + Add Mentor
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{user.fullName}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'STUDENT' ? 'bg-green-100 text-green-700' :
                            user.role === 'MENTOR' ? 'bg-purple-100 text-purple-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3">Edit</button>
                          {user.role !== 'ADMIN' && (
                            <button 
                              onClick={() => deleteUser(user.id, user.fullName)}
                              className="text-red-600 hover:text-red-800 font-semibold text-sm">
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
                <p className="text-gray-600 mt-2">View and manage all registered students</p>
              </div>
              <button 
                onClick={() => openAddModal('STUDENT')}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                + Add Student
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Verified</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        <div className="text-6xl mb-4">👨‍🎓</div>
                        <p className="text-gray-600">No students found. Add your first student!</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{user.fullName}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {user.emailVerified && <span className="text-green-600">✓</span>}
                            {user.phoneVerified && <span className="text-blue-600">📱</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3">View</button>
                          <button 
                            onClick={() => deleteUser(user.id, user.fullName)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'mentors' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Mentor Management</h2>
                <p className="text-gray-600 mt-2">Manage mentors and their courses</p>
              </div>
              <button 
                onClick={() => openAddModal('MENTOR')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                + Add Mentor
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Verified</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        <div className="text-6xl mb-4">👨‍🏫</div>
                        <p className="text-gray-600">No mentors found. Add your first mentor!</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{user.fullName}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {user.emailVerified && <span className="text-green-600">✓</span>}
                            {user.phoneVerified && <span className="text-blue-600">📱</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3">View</button>
                          <button 
                            onClick={() => deleteUser(user.id, user.fullName)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Course Management</h2>
                <p className="text-gray-600 mt-2">Create and manage courses with full control</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                + Create Course
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Course Database</h3>
              <p className="text-gray-600">Full course management: descriptions, pricing, syllabus, lectures, and resources</p>
            </div>
          </div>
        )}
      </main>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userType={modalUserType}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
