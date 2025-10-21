export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledDate: string;
  progress: number;
  lastAccessed: string;
  completedLessons: number;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Mock enrollments for demo student
export const mockEnrollments: Enrollment[] = [
  {
    id: 'e1',
    studentId: '1',
    courseId: '1',
    enrolledDate: '2024-09-15',
    progress: 65,
    lastAccessed: '2024-10-20',
    completedLessons: 31
  },
  {
    id: 'e2',
    studentId: '1',
    courseId: '3',
    enrolledDate: '2024-09-20',
    progress: 42,
    lastAccessed: '2024-10-19',
    completedLessons: 23
  }
];

// Mock messages for demo
export const mockMessages: Message[] = [
  {
    id: 'm1',
    from: 'Priya Mehta',
    to: 'Rahul Sharma',
    subject: 'Question about Rotational Motion',
    content: 'Hi Rahul, I noticed you had a question about the moment of inertia problems. Let\'s discuss this in our next session.',
    timestamp: '2024-10-20T14:30:00',
    read: false
  },
  {
    id: 'm2',
    from: 'Priya Mehta',
    to: 'Rahul Sharma',
    subject: 'Great progress on Mechanics!',
    content: 'Your problem-solving approach is improving significantly. Keep up the good work!',
    timestamp: '2024-10-18T10:15:00',
    read: true
  }
];
