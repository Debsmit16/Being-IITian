'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  price: number;
  duration: number;
  totalLectures: number;
  instructorName: string;
  thumbnailUrl: string | null;
  slug: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses.slice(0, 3)); // Show only first 3 courses on homepage
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'PHYSICS':
        return 'from-blue-500 to-blue-600';
      case 'CHEMISTRY':
        return 'from-green-500 to-green-600';
      case 'MATHEMATICS':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-black text-gray-900 dark:text-white py-20 md:py-32 overflow-hidden transition-colors duration-300">
        {/* Animated background - Dark theme */}
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black opacity-50"></div>
        <div className="absolute inset-0 hidden dark:block" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192, 192, 192, 0.05) 0%, transparent 50%)'
        }}></div>
        
        {/* Light theme gradient */}
        <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-yellow-50 via-white to-gray-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-float">
              <div className="relative">
                <span className="text-9xl">∞</span>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400/30 to-gray-400/30"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-400 bg-clip-text text-transparent">
              Being IITian
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed">
              More than just mastering Science and Math — a transformative journey that shapes mindset, builds resilience, and changes how you approach learning and life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
              >
                Explore Courses
              </Link>
              <Link 
                href="/outliers"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-yellow-400/50 rounded-lg font-bold text-lg hover:bg-white/20 hover:border-yellow-400 transform hover:scale-105 transition-all duration-300"
              >
                Join Outliers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 group backdrop-blur-sm">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-white">Mindset First</h3>
              <p className="text-gray-300 leading-relaxed">
                JEE preparation isn&apos;t just about exams — it&apos;s about developing a resilient mindset that empowers success in life itself.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-400/10 to-transparent border border-gray-400/30 hover:border-gray-400/60 hover:shadow-2xl hover:shadow-gray-400/20 transition-all duration-300 group backdrop-blur-sm">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-xl font-bold mb-3 text-white">Peer Mentorship</h3>
              <p className="text-gray-300 leading-relaxed">
                Seniors from IITs, NITs, IISERs who&apos;ve walked the path guide juniors with real-world experience and practical insights.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 group backdrop-blur-sm">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-white">Beyond Preparation</h3>
              <p className="text-gray-300 leading-relaxed">
                We&apos;re empowering a resilient generation of thinkers and action-takers, shaping leaders for tomorrow&apos;s challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Comprehensive Courses</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                High-quality video lectures covering Physics, Chemistry, and Mathematics for JEE Main and Advanced.
              </p>
              <Link href="/courses" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Browse Courses 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Personal Mentorship</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                One-on-one guidance from mentors who&apos;ve cracked JEE and studied at top institutions across India.
              </p>
              <Link href="/outliers" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Learn More 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎥</div>
              <h3 className="text-2xl font-bold mb-3 text-white">YouTube Content</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Free educational content and strategic advice to help you perform at your best.
              </p>
              <a href="#" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Visit Channel 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Outliers Community</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Join our exclusive community where mentorship knows no limits and success breeds more success.
              </p>
              <Link href="/outliers" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Apply Now 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-400">Master JEE with our expert-designed courses</p>
          </div>

          {loadingCourses ? (
            <div className="text-center text-gray-400">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
              <p className="mt-4">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl">New courses coming soon!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 group"
                  >
                    {/* Course Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br overflow-hidden">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getSubjectColor(course.subject)} flex items-center justify-center`}>
                          <span className="text-6xl">
                            {course.subject === 'PHYSICS' ? '⚛️' : course.subject === 'CHEMISTRY' ? '🧪' : '📐'}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.subject === 'PHYSICS' ? 'bg-blue-500/90' :
                          course.subject === 'CHEMISTRY' ? 'bg-green-500/90' :
                          'bg-purple-500/90'
                        } text-white backdrop-blur-sm`}>
                          {course.subject}
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <span>👨‍🏫 {course.instructorName}</span>
                        <span>📚 {course.totalLectures} lectures</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div>
                          <span className="text-2xl font-bold text-yellow-400">₹{course.price}</span>
                        </div>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 text-white border border-yellow-400/50 rounded-lg font-semibold hover:bg-gray-700 hover:border-yellow-400 transition-all duration-300 group"
                >
                  View All Courses
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black border-y border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">5000+</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Students</div>
            </div>
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-400/20 hover:border-gray-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">50+</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Expert Mentors</div>
            </div>
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">100+</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Courses</div>
            </div>
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-400/20 hover:border-gray-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">98%</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Join thousands of students who are transforming their JEE preparation with Being IITian.
          </p>
          <Link 
            href="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
