'use client';

import { useState } from 'react';
import Link from 'next/link';
import { courses, type Course } from '@/data/courses';

export default function CoursesPage() {
  const [filter, setFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');

  const filteredCourses = courses.filter(course => {
    const subjectMatch = filter === 'All' || course.subject === filter;
    const levelMatch = levelFilter === 'All' || course.level === levelFilter;
    return subjectMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            High-quality courses designed for JEE success
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Physics', 'Chemistry', 'Mathematics'].map((subject) => (
                <button
                  key={subject}
                  onClick={() => setFilter(subject)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === subject
                      ? 'bg-yellow-500 dark:bg-yellow-600 text-black'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'JEE Main', 'JEE Advanced', 'Foundation'].map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    levelFilter === level
                      ? 'bg-gray-500 dark:bg-gray-400 text-white dark:text-black'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-yellow-400/20 transition transform hover:scale-105 cursor-pointer h-full border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{course.thumbnail}</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded-full">
                      {course.subject}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>⏱️ {course.duration}</span>
                    <span>📚 {course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 font-semibold text-gray-900 dark:text-white">{course.rating}</span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400">({course.students} students)</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{course.price}
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/50 transition transform hover:scale-105">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No courses found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
