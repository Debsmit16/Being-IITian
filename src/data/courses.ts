export interface Course {
  id: string;
  title: string;
  description: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  level: 'JEE Main' | 'JEE Advanced' | 'Foundation';
  price: number;
  duration: string;
  lessons: number;
  mentor: string;
  thumbnail: string;
  syllabus: string[];
  rating: number;
  students: number;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Mechanics & Waves - JEE Advanced',
    description: 'Master classical mechanics, rotational motion, waves, and oscillations with problem-solving techniques for JEE Advanced.',
    subject: 'Physics',
    level: 'JEE Advanced',
    price: 4999,
    duration: '12 weeks',
    lessons: 48,
    mentor: 'Dr. Amit Kumar (IIT Delhi)',
    thumbnail: '🔬',
    syllabus: [
      'Kinematics and Dynamics',
      'Work, Energy & Power',
      'Rotational Motion',
      'Simple Harmonic Motion',
      'Waves and Sound',
      'Problem Solving Sessions'
    ],
    rating: 4.8,
    students: 1250
  },
  {
    id: '2',
    title: 'Organic Chemistry Mastery',
    description: 'Complete organic chemistry from basics to advanced reactions, mechanisms, and name reactions for JEE.',
    subject: 'Chemistry',
    level: 'JEE Advanced',
    price: 5499,
    duration: '16 weeks',
    lessons: 64,
    mentor: 'Prof. Sneha Reddy (IIT Bombay)',
    thumbnail: '🧪',
    syllabus: [
      'GOC - General Organic Chemistry',
      'Hydrocarbons',
      'Organic Halogen Compounds',
      'Alcohols, Phenols & Ethers',
      'Aldehydes & Ketones',
      'Carboxylic Acids & Derivatives',
      'Name Reactions & Mechanisms'
    ],
    rating: 4.9,
    students: 2100
  },
  {
    id: '3',
    title: 'Calculus & Differential Equations',
    description: 'Deep dive into limits, derivatives, integration, and differential equations with JEE-focused problem solving.',
    subject: 'Mathematics',
    level: 'JEE Advanced',
    price: 4499,
    duration: '14 weeks',
    lessons: 56,
    mentor: 'Dr. Rajesh Verma (IIT Kanpur)',
    thumbnail: '📐',
    syllabus: [
      'Limits and Continuity',
      'Differentiation',
      'Applications of Derivatives',
      'Indefinite Integration',
      'Definite Integration',
      'Differential Equations',
      'Problem Solving Techniques'
    ],
    rating: 4.7,
    students: 1800
  },
  {
    id: '4',
    title: 'Electrochemistry & Chemical Kinetics',
    description: 'Master physical chemistry concepts including electrochemistry, kinetics, and equilibrium for JEE.',
    subject: 'Chemistry',
    level: 'JEE Main',
    price: 3999,
    duration: '10 weeks',
    lessons: 40,
    mentor: 'Dr. Ananya Singh (IIT Madras)',
    thumbnail: '⚗️',
    syllabus: [
      'Chemical Equilibrium',
      'Ionic Equilibrium',
      'Chemical Kinetics',
      'Electrochemistry',
      'Surface Chemistry',
      'Numerical Problem Solving'
    ],
    rating: 4.6,
    students: 980
  },
  {
    id: '5',
    title: 'Electromagnetism & Modern Physics',
    description: 'Complete coverage of electrostatics, magnetism, EM waves, and modern physics for JEE Advanced.',
    subject: 'Physics',
    level: 'JEE Advanced',
    price: 5299,
    duration: '14 weeks',
    lessons: 60,
    mentor: 'Prof. Vikram Chauhan (IIT Roorkee)',
    thumbnail: '⚡',
    syllabus: [
      'Electrostatics',
      'Current Electricity',
      'Magnetic Effects of Current',
      'Electromagnetic Induction',
      'AC Circuits',
      'Photoelectric Effect',
      'Atomic & Nuclear Physics'
    ],
    rating: 4.8,
    students: 1500
  },
  {
    id: '6',
    title: 'Coordinate Geometry & Vectors',
    description: 'Master 2D and 3D geometry, conic sections, vectors, and 3D geometry for JEE.',
    subject: 'Mathematics',
    level: 'JEE Main',
    price: 3799,
    duration: '12 weeks',
    lessons: 45,
    mentor: 'Dr. Neha Gupta (IIT Kharagpur)',
    thumbnail: '📊',
    syllabus: [
      'Straight Lines',
      'Circles',
      'Parabola, Ellipse & Hyperbola',
      'Vectors - 2D & 3D',
      '3D Geometry',
      'Problem Solving Sessions'
    ],
    rating: 4.7,
    students: 1100
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesBySubject = (subject: string): Course[] => {
  return courses.filter(course => course.subject === subject);
};
