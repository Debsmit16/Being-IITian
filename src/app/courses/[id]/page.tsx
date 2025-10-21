'use client';

import { use } from 'react';
import Link from 'next/link';
import { getCourseById } from '@/data/courses';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const course = getCourseById(resolvedParams.id);
  const router = useRouter();

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-yellow-600 dark:text-yellow-400 hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
    } else if (user.role === 'student') {
      router.push('/dashboard/student?enrolled=' + course.id);
    } else {
      alert('Only students can enroll in courses');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/courses" className="text-yellow-600 dark:text-yellow-400 hover:underline mb-4 inline-block">
            ← Back to Courses
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Course Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-gray-600 dark:from-yellow-400 dark:to-gray-500 text-white p-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-8xl">{course.thumbnail}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              {course.title}
            </h1>
            <p className="text-xl text-center opacity-90 mb-6">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur">
                {course.subject}
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur">
                {course.level}
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur">
                ⭐ {course.rating} Rating
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Course Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 w-32">Duration:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 w-32">Lessons:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{course.lessons} video lectures</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 w-32">Instructor:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{course.mentor}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 w-32">Students:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{course.students} enrolled</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 w-32">Price:</span>
                    <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">₹{course.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-400/10 p-6 rounded-xl border border-yellow-200 dark:border-yellow-400/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Complete {course.subject} for {course.level}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Problem-solving techniques and shortcuts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Practice questions and mock tests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Personal mentorship and doubt clearing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Study materials and resources</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Syllabus */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Syllabus</h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="grid md:grid-cols-2 gap-4">
                  {course.syllabus.map((topic, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold mr-3">{index + 1}.</span>
                      <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enroll Button */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <button
                onClick={handleEnroll}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105 transition"
              >
                Enroll Now for ₹{course.price}
              </button>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
                30-day money-back guarantee • Lifetime access • Certificate of completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
