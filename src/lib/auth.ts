// Simple authentication utility for demo purposes
export type UserRole = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Demo users for testing
export const demoUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'student@iitian.com',
    role: 'student',
    avatar: '👨‍🎓'
  },
  {
    id: '2',
    name: 'Priya Mehta',
    email: 'mentor@iitian.com',
    role: 'mentor',
    avatar: '👩‍🏫'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@iitian.com',
    role: 'admin',
    avatar: '👨‍💼'
  }
];

export const login = (email: string, password: string): User | null => {
  // Demo: password is always "password123"
  if (password !== 'password123') return null;
  
  const user = demoUsers.find(u => u.email === email);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
